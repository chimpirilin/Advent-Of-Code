import { readFileSync } from 'fs';

// const input = readFileSync('sample_input1.txt', 'utf-8') // 352
// const input = readFileSync('sample_input2.txt', 'utf-8') // 117
const input = readFileSync('puzzle_input.txt', 'utf-8')

const expanded = []
const processed = []

for (let i = 0, curId = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        processed.push(false)
        for(let j = 0; j < input[i]; j++) {
            expanded.push(curId)
        }
        curId++
    } else {
        for(let j = 0; j < input[i]; j++) {
            expanded.push(-1) // -1 represents a space
        }
    }
}

const n = expanded.length

let blockStart = n, blockEnd
let spaceStart, spaceEnd

// The idea is to identify the leftmost block, then find the rightmost space, then move the block to the rightmost space
// I'm pretty sure there must a cleaner way to do it than this abomination
while(1) {
    blockEnd = blockStart-1
    spaceEnd = -1
    spaceStart = 0

    let done = false
    while(expanded[blockEnd] === -1) {
        blockEnd--
    }

    blockStart = blockEnd
    
    while(expanded[blockEnd] === expanded[blockStart]) {
        blockStart--
        if(blockStart < 0) {
            done = true
            break
        }
    }

    if(done) break

    blockStart++

    if(processed[expanded[blockEnd]]) {
        continue
    }

    const blockSize = blockEnd - blockStart + 1

    processed[expanded[blockEnd]] = true
    while(1) {
        spaceStart = spaceEnd+1
        while(expanded[spaceStart] !== -1) {
            spaceStart++
            if(spaceStart >= n) {
                done = true
                break
            }
        }

        if(spaceStart >= blockStart) break

        spaceEnd = spaceStart
        while(expanded[spaceEnd] === -1) {
            spaceEnd++
            if(spaceEnd >= n) {
                break
            }
        }

        if(done) break

        spaceEnd--

        if(spaceStart === 18 && spaceEnd === 18) debugger

        const spaceSize = spaceEnd - spaceStart + 1
        // console.log(`attempting to move block ${expanded[blockEnd]} of size ${blockSize} to space ${spaceStart} to ${spaceEnd} with size ${spaceSize}`)
        if(spaceSize >= blockSize) {
            for(let i = spaceStart, j = blockEnd, iterations = 0; iterations < blockSize; i++, j--, iterations++) {
                [expanded[i], expanded[j]] = [expanded[j], expanded[i]]
            }
            break;
        }else spaceStart++
    }

    if(done) break
}


let ans = 0;
for(let i = 0; i < n; i++) {
    if(expanded[i] !== -1 && expanded[i] !== 0) {
        ans += i*expanded[i]
    }
}

console.log(ans)

// console.log(expanded.map(el => el === -1 ? '.' : el.toString()).join(''))