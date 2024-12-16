
import { readFileSync } from 'fs';

// let input = readFileSync('sample_input.txt', 'utf-8').split('\n')
let input = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = 103
const m = 101

const SECONDS = n*m

let grid = new Array(n).fill(0).map(() => new Array(m).fill('.'))

let robots = []

for(const line of input) {
    let [y, x, vy, vx] = line.match(/-?\d+/g).map(Number)
    robots.push([x, y, vx, vy])
}

let found = false

for(let i = 1; i <= SECONDS; i++) {
    for(const robot of robots) {
        robot[0]=((robot[0]+robot[2])%n+n)%n
        robot[1]=((robot[1]+robot[3])%m+m)%m
    }
    
    for(const robot of robots) {
        grid[robot[0]][robot[1]] = '#'
    }
    // look for pattern
    //   #
    //  ###
    // #####
    for(let ii = 0; ii < n-3; ii++) {
        for(let jj = 1; jj < m-3; jj++) {
            if(grid[ii][jj] === '#' && 
                grid[ii+1][jj] === '#' && grid[ii+1][jj-1] === '#' && grid[ii+1][jj+1] === '#' &&
                grid[ii+2][jj] === '#' && grid[ii+2][jj-1] === '#'&& grid[ii+2][jj-2] === '#' && grid[ii+2][jj+1] === '#'&& grid[ii+2][jj+2] === '#') {
                console.log(grid.map(row => row.join('')).join('\n'))
                console.log(`found at second  ${i}`)
                found = true
                break
            }
        }
        if(found) break
    }
    if(found) break

    for(const robot of robots) {
        grid[robot[0]][robot[1]] = ' '
    }
}