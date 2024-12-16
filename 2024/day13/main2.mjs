/*
    Spent hours trying to find a solution using diophantine equations, but it involved a lot of work
    I even thought about integer linear programming
    Turned out there is always a unique integer solution for the system of equations which was not obvious
    from the problem statement -_-
    So what it seemd to be a PITA ended up being trivial *sight*
*/

import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split('\n').filter(line => line !== '')
const input = readFileSync('puzzle_input.txt', 'utf-8').split('\n').filter(line => line !== '')


let x1, x2, y1, y2, targetx, targety
const A  = 3
const B = 1
const bsFactor = 10000000000000

// we solve for a and b
// ax1+bx2 = targetx
// ay1+by2 = targety
// highschool elimination method to solve 2x2 system of equations
function solve() {
    const x1Copy = x1
    x1*=y1, x2*=y1, targetx*=y1
    y1*=x1Copy, y2*=x1Copy, targety*=x1Copy
    const ys = x2-y2
    const targets = targetx-targety
    if(targets%ys !== 0) return 0 // no integer solution
    const b = targets/ys
    const res = (targetx-b*x2)
    if(res%x1 !== 0) return 0 // no integer solution
    const a = res/x1
    return a*A+b*B
}

let ans = 0
for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if(line === '') {
        continue
    }
    const numbers = line.match(/\d+/g).map(Number)
    if(i%3 === 0) {
        [x1, y1] = numbers
    }
    if(i%3 === 1) {
        [x2, y2] = numbers
    }
    if(i%3 === 2) {
        [targetx, targety] = numbers.map(el => el+bsFactor)   
        ans+=solve()
    }
}

console.log(ans)