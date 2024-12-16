import { readFileSync } from 'fs';

const inputContent = readFileSync('puzzle_input.txt', 'utf-8');

// regex FTW!
const regexResult = inputContent.match(/mul\(\d+,\d+\)/g)

let answer = 0
regexResult.forEach(mul => {
    const multipliers = mul.match(/\d+/g)
    console.assert(multipliers.length === 2)
    const [num1, num2] = [Number(multipliers[0]), Number(multipliers[1])]
    answer += num1*num2
})

console.log(answer)