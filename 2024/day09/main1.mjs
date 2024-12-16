import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8')
const input = readFileSync('puzzle_input.txt', 'utf-8')

const expanded = []

for (let i = 0, curId = 0; i < input.length; i++) {
  if (i % 2 === 0) {
    for(let j = 0; j < input[i]; j++) {
        expanded.push(curId)
    }
    curId++;
  } else {
    for(let j = 0; j < input[i]; j++) {
        expanded.push(-1)
    }
  }
}

const n = expanded.length
// two pointers technique
let leftPointer = 0, rightPointer = n-1
while(rightPointer > leftPointer) {
    while(expanded[rightPointer] === -1) {
        rightPointer--
    }
    if(expanded[leftPointer] === -1) {
        [expanded[leftPointer], expanded[rightPointer]] = [expanded[rightPointer], expanded[leftPointer]]
    }
    leftPointer++
}


let ans = 0
for(let i = 0; i < n; i++) {
    if(expanded[i] !== -1 && expanded[i] !== 0) {
        ans += i*expanded[i]
    }
}

console.log(ans)