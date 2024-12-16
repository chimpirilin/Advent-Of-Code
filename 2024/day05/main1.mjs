import { readFileSync } from 'fs';

// const input = readFileSync('sample_input.txt', 'utf-8').split('\n');
const input = readFileSync('puzzle_input.txt', 'utf-8').split('\n');

const SIZE = 100;
const reach = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));

const pagesToPrint = []
let good = 0
let bad = 0

for(const line of input) {
    if(line === '') continue
    if(line.includes('|')) {
        const [page1, page2] = line.split('|').map(el => Number(el));
        reach[page1][page2] = 1
    }else {
        pagesToPrint.push(line.split(',').map(el => Number(el)))
    }
}
let ans = 0;
for(const pages of pagesToPrint) {
    let valid = true;
    for(let i = 0; i < pages.length; i++) {
        for(let j = i+1; j < pages.length; j++) {
            if(!reach[pages[i]][pages[j]]) {
                valid = false;
                break;
            }
        }
        if(!valid) break;
    }
    if(valid) {
        good++
        const middleIndex = (pages.length-1)/2;
        ans += pages[middleIndex];
    }
}

console.log(ans)