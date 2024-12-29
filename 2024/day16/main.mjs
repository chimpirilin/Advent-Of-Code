import { readFileSync } from 'fs'

// const grid = readFileSync('sample_input.txt', 'utf-8').split('\n');
const grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

for(let i = 0; i < grid.length; i++) grid[i] = grid[i].split('')

const n = grid.length
const m = grid[0].length

const startX = grid.findIndex(row => row.includes('S'))
const startY = grid[startX].indexOf('S')

const endX = grid.findIndex(row => row.includes('E'))
const endY = grid[endX].indexOf('E')

const UP = [-1, 0]
const DOWN = [1, 0]
const LEFT = [0, -1]
const RIGHT = [0, 1]

const directions = [UP, DOWN, LEFT, RIGHT]

const dist = Array.from({ length: n }, () => 
    Array.from({ length: m }, () => 
        Array(4).fill(Infinity)
    )
)

/*
    This problem can be solved with Dijkstra, plus the direction extra state
    so dist[3][0][1] means that we are in cell (3, 0) going down
*/

// Wish JS had a built-in priority queue
let pseudoQueue = [[[startX, startY], 3]]

dist[startX][startY][3] = 0

// start Dijkstra
while(pseudoQueue.length) {
    let minDist = Infinity
    let minIndex = 0

    // with a priority queue, we could get the minimum in O(1)
    for (let i = 0; i < pseudoQueue.length; i++) {
        const [[qx, qy], qdir] = pseudoQueue[i]
        if (dist[qx][qy][qdir] < minDist) {
            minDist = dist[qx][qy][qdir]
            minIndex = i
        }
    }

    const [[x, y], dir] = pseudoQueue.splice(minIndex, 1)[0]

    for(let i = 0; i < 4; i++) {
        const [dx, dy] = directions[i]
        let newX = x + dx
        let newY = y + dy

        // out of bounds check
        if(newX < 0 || newX >= n || newY < 0 || newY >= m ) continue
        // wall check
        if(grid[newX][newY] === '#') continue

        // no sense in going back, example: if we are going right, we can't go left
        if(dx === 0 && directions[dir][0] === 0 && dy !== directions[dir][1]) continue
        // no sense in going back, example: if we are going down, we can't go up
        if(dy === 0 && directions[dir][1] === 0 && dx !== directions[dir][0]) continue

        // step forward
        if(dx === directions[dir][0] && dy === directions[dir][1]) {
            if(dist[newX][newY][i] > dist[x][y][dir] + 1) {
                dist[newX][newY][i] = dist[x][y][dir] + 1
                pseudoQueue.push([[newX, newY], i])
            }
        }else { // turn
            if(dist[x][y][dir] + 1000 < dist[x][y][i]) {
                dist[x][y][i] = dist[x][y][dir] + 1000
                pseudoQueue.push([[x, y], i])
            }
        }        
    }
}

const ans1 = Math.min(...dist[endX][endY])
console.log(ans1)

/*
    wanted to do some cool ascii but this just sucks XD

    ***********
    *         *
    *  part2  *
    *         *
    ***********

    We solve part2 by doing a reverse BFS, that is we start from the end.
    At each step, we process a cell and check if its neighbors can reach it
    at an optimal cost, by cheking the distance array computed in part1 plus
    the cost of stepping/turning.
*/

// given coordinates, return the index of the direction
// where 0 -> UP, 1 -> DOWN, 2 -> LEFT, 3 -> RIGHT
function getDirIndex(dir) {
    if(dir[0] === -1 && dir[1] === 0) return 0
    if(dir[0] === 1 && dir[1] === 0) return 1
    if(dir[0] === 0 && dir[1] === -1) return 2
    if(dir[0] === 0 && dir[1] === 1) return 3
}

grid[endX][endY] = 'O'
pseudoQueue = []

// try to find adjacents cells to the end cell that are part of
// an optimal answer
for(let i = 0; i < 4; i++) {
    const [dx, dy] = directions[i]
    let newX = endX + dx
    let newY = endY + dy

    if(newX < 0 || newX >= n || newY < 0 || newY >= m ) continue
    if(grid[newX][newY] === '#') continue

    const [newDx, newDy] = [directions[i][0]*-1, directions[i][1]*-1]
    const dirIdx = getDirIndex([newDx, newDy])
    if(dist[newX][newY][dirIdx] + 1 === ans1) {
        pseudoQueue.push([[newX, newY], dirIdx])
    }
}

// 0 -> UP, 1 -> DOWN, 2 -> LEFT, 3 -> RIGHT
// if you are going UP or DOWN, you can only turn LEFT or RIGHT
// similarly, if you are going LEFT or RIGHT, you can only turn UP or DOWN
const allowedTurns = [[2, 3], [2, 3], [0, 1], [0, 1]]

while(pseudoQueue.length) {
    const [[x, y], dir] = pseudoQueue.shift()
    grid[x][y] = 'O'
    
    // you turned 90 degrees
    for(const turnDir of allowedTurns[dir]) {
        if(dist[x][y][turnDir] + 1000 === dist[x][y][dir]) {
            pseudoQueue.push([[x, y], turnDir])
        }
    }

    // you stepped into cell x, y so go backwards
    const [dx, dy] = directions[dir]
    let newX = x - dx
    let newY = y - dy
   
    if(newX < 0 || newX >= n || newY < 0 || newY >= m ) continue
    if(grid[newX][newY] === '#') continue
    if(grid[newX][newY] === 'O') continue

    if(dist[newX][newY][dir] + 1 === dist[x][y][dir]) {
        pseudoQueue.push([[newX, newY], dir])
    }
}

let ans2 = 0
for(const row of grid) {
    ans2 += row.filter(el => el === 'O').length
}

console.log(ans2)


