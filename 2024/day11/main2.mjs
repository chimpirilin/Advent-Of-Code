import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split(' ').map(Number)
const input = readFileSync('puzzle_input.txt', 'utf-8').split(' ').map(Number)
// console.log(input)

let BLINKS = 75
const memoTable = new Map()

// custom key for Map since js does not support tuple as key
function toKey(stone, blink) {
    return `${stone},${blink}`;
}


// dynamic programming solution, easy to get recurrence from problem definition
// easy to see that there are overlapping subproblems
// solve for independently each stone, then combine the results
function solve(stone, blink) {
    if(memoTable.has(toKey(stone, blink))) {
        return memoTable.get(toKey(stone, blink))
    }
    let result = 0
    if(blink === BLINKS) {
        return 1
    }
    const digitCount = Math.floor(Math.log10(stone) + 1)
    if(stone === 0) {
        result = solve(1, blink+1)
    }else if (digitCount % 2 === 0){
        const half = digitCount / 2
        const halfStone = Math.floor(stone / Math.pow(10, half))
        const otherHalfStone = stone % Math.pow(10, half)
        result = solve(halfStone, blink+1) + solve(otherHalfStone, blink+1)
    }else {
        result = solve(stone*2024, blink+1)
    }

    memoTable.set(toKey(stone, blink), result)
    return result
}

let ans = 0
for (const stone of input) {
    ans += solve(stone, 0)
}

console.log(ans)