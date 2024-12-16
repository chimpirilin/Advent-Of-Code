import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split(' ').map(Number)
const input = readFileSync('puzzle_input.txt', 'utf-8').split(' ').map(Number)

let stones, newStones  = [...input]

let BLINKS = 25

// do what you're told, constraints are small
for(let i = 0; i < BLINKS; i++) {
    stones = [...newStones]
    newStones = []
    for(const stone of stones) {
        const digitCount = Math.floor(Math.log10(stone) + 1)
        if(stone === 0) {
            newStones.push(1)
        }else if (digitCount % 2 === 0){
            const half = digitCount / 2
            const halfStone = Math.floor(stone / Math.pow(10, half))
            const otherHalfStone = stone % Math.pow(10, half)
            newStones.push(halfStone)
            newStones.push(otherHalfStone)
        }else {
            newStones.push(stone*2024)
        }
    }
}

console.log(newStones.length)