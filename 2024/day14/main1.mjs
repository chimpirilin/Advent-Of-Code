
import { readFileSync } from 'fs';

// let input = readFileSync('sample_input.txt', 'utf-8').split('\n')
let input = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = 103
const m = 101

const SECONDS = 100

let quadrant = [0, 0, 0, 0]

function determineQuadrant(x, y) {
    const xCenter = (n-1)/2
    const yCenter = (m-1)/2

    if(x === xCenter || y === yCenter) return -1
    if(x < xCenter && y < yCenter) return 0
    if(x < xCenter && y > yCenter) return 1
    if(x > xCenter && y < yCenter) return 2
    if(x > xCenter && y > yCenter) return 3
}

for(const line of input) {
    let [y, x, vy, vx] = line.match(/-?\d+/g).map(Number)
    x+=vx*SECONDS
    x=(x%n+n)%n // wrap around
    y+=vy*SECONDS
    y=(y%m+m)%m // wrap around
    const q = determineQuadrant(x, y)
    if(q !== -1) quadrant[q]++
}

let ans = 1

for(const q of quadrant) ans*=q

console.log(ans)