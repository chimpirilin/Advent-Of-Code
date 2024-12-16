import { readFileSync } from 'fs';


// const inputContent = 'do'+ readFileSync('sample_input2.txt', 'utf-8') + "don't";

const inputContent = 'do()'+readFileSync('puzzle_input.txt', 'utf-8') + "don't()";

function getAllMatches(regex) {
    const matches = [];
    let match;
  
    while ((match = regex.exec(inputContent)) !== null) {
      matches.push(match);
    }
  
    return matches;
}

// regex FTW!
const mulRegex = /mul\(\d+,\d+\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don\'t\(\)/g;

// get all positions
const mulMatches = getAllMatches(mulRegex)
const doMatches = getAllMatches(doRegex)
const dontMatches = getAllMatches(dontRegex)

const timeline = []

// insert positions into timeline
doMatches.forEach(el => timeline.push([el.index, 'do']))
dontMatches.forEach(el => timeline.push([el.index, 'dont']))

// sort them by index, now we have an actual timeline
timeline.sort((a, b) => a[0] - b[0])

let answer = 0
mulMatches.forEach(mul => {

    let idx = 0;
    // find the leftmost position of do/dont that is greater than the current mul position
    // we could binary search but linear search should be fast enough for the given input
    while(idx < timeline.length) {
        if(timeline[idx][0] > mul.index) {
            idx--;
            break;
        }
        idx++;
    }

    // inside do block, so add to answer
    if(timeline[idx][1] === 'do') {
        const multipliers = mul[0].match(/\d+/g)
        console.assert(multipliers.length === 2)
        const [num1, num2] = [multipliers[0], multipliers[1]]
        answer += num1*num2
    }
    // ignore dont block
})

console.log(answer)