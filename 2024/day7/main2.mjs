import { readFileSync } from "fs"
import { BaseN } from "js-combinatorics"

// const input = readFileSync('sample_input.txt', 'utf-8').split('\n')
const input = readFileSync("puzzle_input.txt", "utf-8").split("\n")

let ans = 0
for (const equation of input) {
  const numbers = equation.match(/\d+/g)
  const target = numbers.shift()
  const n = numbers.length
  // generate all the words from an alphabet aka permutation with repetitions
  const permutationWithRepetitions = new BaseN("+*|", n - 1)
  for (const permutation of permutationWithRepetitions) {
    let evalString = "";
    for (let i = 0; true; i++) {
      evalString += numbers[i]
      if (i === n - 1) break
      evalString += permutation[i]
    }

    let prev = "+" // we always add the first number
    let curAns = ""
    while (evalString.length) {
      let curVal = evalString.match(/(\d+)|[*+\|]/)
      evalString = evalString.substring(curVal[0].length)
      if (curVal[0] === "+" || curVal[0] === "*" || curVal[0] === "|") {
        prev = curVal[0]
        continue
      }
      switch (prev) {
        case "+":
          curAns = `${Number(curAns) + Number(curVal[0])}`
          break;
        case "*":
          curAns = `${Number(curAns) * Number(curVal[0])}`
          break;
        case "|":
          curAns += curVal[0]
          break
      }
    }

    if (curAns === target) {
      ans += Number(target)
      break
    }
  }
}

console.log(ans)