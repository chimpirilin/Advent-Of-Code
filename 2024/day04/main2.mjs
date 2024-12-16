import { readFileSync } from 'fs';

// const grid = readFileSync('sample_input.txt', 'utf-8').split('\n');
const grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const MAS = 'MAS'

// left right diagonal
function isMasDiagonalLR(i, j) {
    const diagonal = [grid[i][j], grid[i+1][j+1], grid[i+2][j+2]].join('')
    const diagonalBackwards = [grid[i+2][j+2], grid[i+1][j+1], grid[i][j]].join('')
    return diagonal === MAS || diagonalBackwards === MAS
}

// right left diagonal
function isMasDiagonalRL(i, j) {
    const diagonal = [grid[i][j], grid[i+1][j-1], grid[i+2][j-2]].join('')
    const diagonalBackwards = [grid[i+2][j-2], grid[i+1][j-1], grid[i][j]].join('')

    return diagonal === MAS || diagonalBackwards === MAS
}

let ans = 0;
const nrows = grid.length
const ncolumns = grid[0].length

for(let i = 0; i + 2 < nrows; i++) {
    for(let j = 0; j + 2 < ncolumns; j++) {
        if(isMasDiagonalLR(i, j) && isMasDiagonalRL(i, j+2)) ans++;
    }
}

console.log(ans)
