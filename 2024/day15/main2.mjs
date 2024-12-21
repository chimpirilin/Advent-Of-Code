import { readFileSync } from 'fs'

// let input = readFileSync('sample_input.txt', 'utf-8').split('\n')
let input = readFileSync('puzzle_input.txt', 'utf-8').split('\n')
let [initialGrid, moves] = input.reduce((groups, line) => {
    if (line.trim() === '') {
      groups.push([])
    } else {
      groups[groups.length - 1].push(line)
    }
    return groups;
  }, [[]])


let grid = []

for(let i = 0; i < initialGrid.length; i++) {
    grid.push([])
    for(const cell of initialGrid[i]) {
        switch(cell) {
            case '#':
                grid[i].push('#')
                grid[i].push('#')
                break
            case 'O':
                grid[i].push('[')
                grid[i].push(']')
                break
            case '.':
                grid[i].push('.')
                grid[i].push('.')
                break
            case '@':
                grid[i].push('@')
                grid[i].push('.')
                break
        }
    }
}

function determineInitialPosition() {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === '@') {
                return [i, j]
            }
        }
    }
}

let [robotX, robotY] = determineInitialPosition()

const UP = [-1, 0]
const DOWN = [1, 0]
const LEFT = [0, -1]
const RIGHT = [0, 1]

function canMoveVertical(x, y, dir) {
    const nextCell = grid[x + dir][y]
    if(nextCell === '.') return true
    if(nextCell === '#') return false
    if(nextCell === '['){
        return canMoveVertical(x+dir, y, dir) && canMoveVertical(x+dir, y+1 , dir) 
    }else {
        return canMoveVertical(x+dir, y, dir) && canMoveVertical(x+dir, y-1 , dir) 
    }
}

// once we know we can move, we move whenever we encounter a free cell (.)
function moveVertical(x, y, dir) {
    const nextCell = grid[x + dir][y]
    if(nextCell === '.') {
        // move if you encounter a free cell
        ;[grid[x][y], grid[x+dir][y]] = [grid[x+dir][y], grid[x][y]]
        return
    }
    if(nextCell === '['){
        moveVertical(x+dir, y, dir) //[
        moveVertical(x+dir, y+1 , dir) //]
    }else {
        moveVertical(x+dir, y, dir) //]
        moveVertical(x+dir, y-1 , dir) //[
    }
    // above/below cell was an obstacle, by the time we reach here
    // above/below cell moved, so now above/below cell is free
    // so move!
    ;[grid[x][y], grid[x+dir][y]] = [grid[x+dir][y], grid[x][y]]
}

// This is the same move function used in part 1
// is good enough to move without an obstacle
// and to move with an obstacle in the horizontal direction
// can't handle vertical movement for part 2, hence we wrote 
// moveVertical function
function move([dirX, dirY]) {
    let done = false
    let canMove = true
    let curX = robotX, curY = robotY
    while(!done) {
        curX += dirX
        curY += dirY
        const cell = grid[curX][curY]
        if(cell === '#') {
            canMove = false
            done = true
        }else if(cell === '.') {
            canMove = true
            done = true
        }
    }

    // iterate backwards now
    dirX *= -1
    dirY *= -1

    // curX and curY should be at a . position if canMove is true
    let prevX = robotX, prevY = robotY
    if(canMove) {
        do {
            prevX = curX
            prevY = curY
            curX += dirX
            curY += dirY
            
            ;[grid[curX][curY], grid[prevX][prevY]] = [grid[prevX][prevY], grid[curX][curY]]
            
        }while(!(curX === robotX && curY === robotY));
    }

    robotX = prevX
    robotY = prevY
}

// console.log(grid.map(line => line.join('')))

for(const line of moves) {
    for(const curMove of line) {
        let nextCell, canMove
        switch(curMove) {
            case '>':
                // console.log('move >:')
                move(RIGHT)
                break
            case '<':
                // console.log('move <:')
                move(LEFT)
                break
            case '^':
                // console.log('move ^:')
                nextCell = grid[robotX-1][robotY]
                if(nextCell === '[') {
                    canMove = canMoveVertical(robotX-1, robotY, -1) && canMoveVertical(robotX-1, robotY+1, -1)
                    if(!canMove) break
                    moveVertical(robotX-1, robotY, -1)
                    moveVertical(robotX-1, robotY+1, -1)
                }else if(nextCell === ']') {
                    canMove = canMoveVertical(robotX-1, robotY, -1) && canMoveVertical(robotX-1, robotY-1, -1)
                    if(!canMove) break
                    moveVertical(robotX-1, robotY, -1)
                    moveVertical(robotX-1, robotY-1, -1)
                }
                nextCell = grid[robotX-1][robotY]
                if(nextCell === '.') {
                    ;[grid[robotX][robotY], grid[robotX-1][robotY]] = [grid[robotX-1][robotY], grid[robotX][robotY]]
                    robotX--
                }
                break
            case 'v':
                // console.log('move v:')
                nextCell = grid[robotX+1][robotY]
                if(nextCell === '[') {
                    canMove = canMoveVertical(robotX+1, robotY, 1) && canMoveVertical(robotX+1, robotY+1, 1)
                    if(!canMove) break
                    moveVertical(robotX+1, robotY, 1)
                    moveVertical(robotX+1, robotY+1, 1)
                }else if(nextCell === ']') {
                    canMove = canMoveVertical(robotX+1, robotY, 1) && canMoveVertical(robotX+1, robotY-1, 1)
                    if(!canMove) break
                    moveVertical(robotX+1, robotY, 1)
                    moveVertical(robotX+1, robotY-1, 1)
                }
                nextCell = grid[robotX+1][robotY]
                if(nextCell === '.') {
                    ;[grid[robotX][robotY], grid[robotX+1][robotY]] = [grid[robotX+1][robotY], grid[robotX][robotY]]
                    robotX++
                }
                break
        }
        // console.log(grid.map(line => line.join('')))
    }
}

let ans = 0
for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
        if(grid[i][j] !== '[') continue
        ans+=i*100+j
    }
}

console.log(ans)