import { readFileSync } from 'fs';

// const grid = readFileSync('sample_input.txt', 'utf-8').split('\n');
const grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const XMAS = 'XMAS'

function isXmasHorizontal(i, j) {
    const horizontal = [grid[i][j], grid[i][j+1], grid[i][j+2], grid[i][j+3]].join('')
    const horizontalBackwards = [grid[i][j+3],  grid[i][j+2], grid[i][j+1], grid[i][j]].join('')
    return horizontal === XMAS || horizontalBackwards === XMAS
}

function isXmasVertical(i, j) {
    const vertical = [grid[i][j], grid[i+1][j], grid[i+2][j], grid[i+3][j]].join('')
    const verticalBackwards = [grid[i+3][j], grid[i+2][j], grid[i+1][j], grid[i][j]].join('')

    return vertical === XMAS || verticalBackwards === XMAS
}

// left right diagonal
function isXmasDiagonalLR(i, j) {
    const diagonal = [grid[i][j], grid[i+1][j+1], grid[i+2][j+2], grid[i+3][j+3]].join('')
    const diagonalBackwards = [grid[i+3][j+3], grid[i+2][j+2], grid[i+1][j+1], grid[i][j]].join('')

    return diagonal === XMAS || diagonalBackwards === XMAS
}

// right left diagonal
function isXmasDiagonalRL(i, j) {
    const diagonal = [grid[i][j], grid[i+1][j-1], grid[i+2][j-2], grid[i+3][j-3]].join('')
    const diagonalBackwards = [grid[i+3][j-3], grid[i+2][j-2], grid[i+1][j-1], grid[i][j]].join('')

    return diagonal === XMAS || diagonalBackwards === XMAS
}

let ans = 0;
const nrows = grid.length
const ncolumns = grid[0].length

for(let i = 0; i < nrows; i++) {
    for(let j = 0; j + 3 < ncolumns; j++) {
        if(isXmasHorizontal(i, j)) {
            ans++;
        }
    }
}

for(let j = 0; j < ncolumns; j++) {
    for(let i = 0; i + 3 < nrows; i++) {
        if(isXmasVertical(i, j)) ans++
    }
}

for(let i = 0; i + 3 < nrows; i++) {
    for(let j = 0; j + 3 < ncolumns; j++) {
        if(isXmasDiagonalLR(i, j)) ans++

    }
}

for(let i = 0; i + 3 < nrows; i++) {
    for(let j = ncolumns-1; j - 3 >= 0; j--) {
        if(isXmasDiagonalRL(i, j)) ans++
    }
}

console.log(ans)
