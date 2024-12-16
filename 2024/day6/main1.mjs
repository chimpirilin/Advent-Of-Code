import { readFileSync } from 'fs';

// let grid = readFileSync('sample_input.txt', 'utf-8').split('\n');
const grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = grid.length
const m = grid[0].length

for(let i = 0; i < n; i++) grid[i] = grid[i].split('')
// console.log(grid)

const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
let x, y;
let direction = UP;

function step() {
    grid[x][y] = 'X';
    switch (direction) {
        case UP:
            if(x === 0) return false;
            if(grid[x-1][y] === '#') {
                direction = RIGHT
            }else {
                x--;
            }
            return true;
        case DOWN:
            if(x === n-1) return false;
            if(grid[x+1][y] === '#') {
                direction = LEFT
            }else {
                x++;
            }
            return true;
        case LEFT:
            if(y === 0) return false;
            if(grid[x][y-1] === '#') {
                direction = UP
            }else {
                y--;
            }
            return true;
        case RIGHT:
            if(y === m-1) return false;
            if(grid[x][y+1] === '#') {
                direction = DOWN
            }else {
                y++;
            }
            return true;
        default:
            break;
    }
}

function determineInitialPos() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if(grid[i][j] === '^') return [i, j]
        }
    }
}

[x, y] = determineInitialPos()

while(step()) {}
let ans = 0;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if(grid[i][j] === 'X') ans++;
    }
}

console.log(ans)

