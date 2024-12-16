import { readFileSync } from 'fs';

function isDecreasing(ar) {
    for(let i = 0; i < ar.length - 1; i++) {
        const dif = ar[i] - ar[i+1]
        if(dif < 1 || dif > 3) {
            return false
        }
    }
    return true
}

function isIncreasing(ar) {
    for(let i = 1; i < ar.length; i++) {
        const dif = ar[i] - ar[i-1]
        if(dif < 1 || dif > 3) {
            return false
        }
    }
    return true
}

const inputContent = readFileSync('input.txt', 'utf-8');

const parsedInput = inputContent.split('\n').map(x => x.split(' ').map(y=>Number(y)))

let ans = 0
for(let i = 0; i<parsedInput.length;i++) {
    let ar = parsedInput[i]
    let badIndex1 = -1
    if(isDecreasing(ar)||isIncreasing(ar)) {
        ans++
        continue
    }
    // decreasing
    for(let i = 0; i < ar.length - 1; i++) {
        const dif = ar[i] - ar[i+1]
        if(dif < 1 || dif > 3) {
            badIndex1 = i
            break
        }
    }

    if(badIndex1 !== -1) {
        const arCp1 = [...ar]
        const arCp2 = [...ar]
        arCp1.splice(badIndex1, 1)
        arCp2.splice(badIndex1+1, 1)
        if(isDecreasing(arCp1)||isDecreasing(arCp2)) {
            ans++
            continue
        }
    }
    
    let badIndex2 = -1
    // increasing
    for(let i = 1; i < ar.length; i++) {
        const dif = ar[i] - ar[i-1]
        if(dif < 1 || dif > 3) {
            badIndex2 = i
            break
        }
    }

    if(badIndex2 !== -1) {
        const arCp1 = [...ar]
        const arCp2 = [...ar]
        arCp1.splice(badIndex2, 1)
        arCp2.splice(badIndex2-1, 1)
        if(isIncreasing(arCp1)||isIncreasing(arCp2)) {
            ans++
        }
    }

}

console.log(ans)