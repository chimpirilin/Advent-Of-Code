import { readFileSync } from 'fs';

// let grid = readFileSync('sample_input.txt', 'utf-8').split('\n').map(ar => ar.split('')).map(ar => ar.map(el => parseInt(el)))
let grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n').map(x => x.split('')).map(x => x.map(y => parseInt(y)))

const n = grid.length
const m = grid[0].length

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const trailheads = new Set()

// js does not have a way to use arrays as keys in a map, so we have to stringify them
function tupleToKey(tuple) {
    return JSON.stringify(tuple)
}

// can be drastically sped up with memoization, given the size of the inputs, 
// this unoptimized solution should be fine
function findTrail(i, j, pi, pj, targetHeight) {
    if(i < 0 || i >= n || j < 0 || j >= m || grid[i][j] !== targetHeight) return
    if(targetHeight === 9) {
        trailheads.add(tupleToKey([i, j]))
        return
    }

    for(let d of directions) {
        if(i+d[0] < 0 || i+d[0] >= n || j+d[1] < 0 || j+d[1] >= m) continue
        if(i+d[0] === pi && j+d[1] === pj) continue
        findTrail(i+d[0], j+d[1], i, j, targetHeight+1)
    }
}

let ans = 0
for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(grid[i][j] === 0) {
            findTrail(i, j, -1, -1, 0)
            ans += trailheads.size
            trailheads.clear()
        }
    }
}

console.log(ans)
