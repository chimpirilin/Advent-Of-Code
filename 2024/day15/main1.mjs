import { readFileSync } from 'fs'

// let input = readFileSync('sample_input.txt', 'utf-8').split('\n')
let input = readFileSync('puzzle_input.txt', 'utf-8').split('\n')
let [grid, moves] = input.reduce((groups, line) => {
    if (line.trim() === '') {
      groups.push([])
    } else {
      groups[groups.length - 1].push(line)
    }
    return groups;
  }, [[]])

grid = grid.map(line => line.split(''))

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

console.log(grid.map(line => line.join('')))

for(const line of moves) {
    for(const curMove of line) {
        switch(curMove) {
            case '>':
                move(RIGHT)
                break;
            case '<':
                move(LEFT)
                break;
            case '^':
                move(UP)
                break;
            case 'v':
                move(DOWN)
                break;
        }
    }
}

let ans = 0
for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
        if(grid[i][j] !== 'O') continue
        ans+=i*100+j
    }
}

// console.log(grid.map(line => line.join('')))
console.log(ans)