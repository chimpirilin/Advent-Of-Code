import { readFileSync } from 'fs';

const inputContent = readFileSync('input.txt', 'utf-8');

const parsedInput = inputContent.split('\n').map(x => x.split(' ').map(y=>Number(y)))

let ans = 0
parsedInput.forEach((ar) => {
    let safe1 = true
    let safe2 = true
    for(let i = 0; i < ar.length - 1; i++) {
        const dif = ar[i] - ar[i+1]
        if(dif < 1 || dif > 3) {
            safe1 = false
            break
        }
    }

    for(let i = 1; i < ar.length; i++) {
        const dif = ar[i] - ar[i-1]
        if(dif < 1 || dif > 3) {
            safe2 = false
            break
        }
    }

    if(safe1 || safe2) ans++
})

console.log(ans)