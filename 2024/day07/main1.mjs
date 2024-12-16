
import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split('\n')
const input = readFileSync('puzzle_input.txt', 'utf-8').split('\n')
// console.log(input)

let ans = 0;

for(const equation of input) {
    const [target, ...numbers] = equation.match(/\d+/g).map(str => Number(str))

    const limit = 2 ** (numbers.length-1)

    let found = false

    // classic enumration of all possible combinations using bit manipulation
    for(let i = 0; i < limit; i++) {
        let currentAns = numbers[0];
        for(let j = 1; j < numbers.length; j++) {
            if((i&(1 << (j-1))) > 0) {
                currentAns += numbers[j]
            }else {
                currentAns *= numbers[j]
            }
        }
        // console.log(currentAns);
        if(currentAns === target) {
            found = true
            ans+=currentAns
            break
        }
    }
}

console.log(ans)