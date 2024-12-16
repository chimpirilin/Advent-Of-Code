import { readFileSync } from 'fs'

const fileContent = readFileSync('input.txt', 'utf-8')

const parsedInput = fileContent.split('\n').map(row => row.match(/-?\d+/g).map(Number));
let ar1 = []
let ar2 = []

for (const [x, y] of parsedInput) {
    ar1.push(x)
    ar2.push(y)
}

ar1.sort()
ar2.sort()
let ans = 0

for(let i = 0; i < ar1.length; i++) ans+=Math.abs(ar1[i]-ar2[i])

// part1
console.log(ans)

const m = new Map()

for(let i = 0; i < ar1.length; i++){
    const val = m.get(ar2[i])
    if(val) m.set(ar2[i], val+1)
    else m.set(ar2[i], 1)
}
ans = 0
for(let i = 0; i < ar1.length; i++){
    const val = m.get(ar1[i])
    if(val) ans+= ar1[i]*val
}

// part2
console.log(ans)
