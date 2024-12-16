
import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split('\n').filter(line => line !== '')
const input = readFileSync('puzzle_input.txt', 'utf-8').split('\n').filter(line => line !== '')
// console.log(input)

let x1, x2, y1, y2, targetx, targety
const A  = 3
const B = 1

// just bruteforce it, limit is small
function solve() {
    const LIMIT = 100
    for (let a = 0; a <= LIMIT; a++) {
        const res1 = targetx - a*x1
        let b1 = -1
        if(res1%x2 === 0) b1 = res1/x2

        const res2 = targety - a*y1
        let b2 = -1
        if(res2%y2 === 0) b2 = res2/y2

        if(b1 === b2 && b1 !== -1) {
            const cost =  a*A + b1*B
            return cost
        }
    }

    return 0
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
        [targetx, targety] = numbers
        ans+=solve()
    }
}

console.log(ans)