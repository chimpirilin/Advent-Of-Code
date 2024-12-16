import { readFileSync } from 'fs';

// let grid = readFileSync('sample_input.txt', 'utf-8').split('\n')
let grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = grid.length
const m = grid[0].length

const visited = Array.from({ length: n }, () => Array(m).fill(false));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function dfs(x, y) {
    visited[x][y] = true
    let area = 1, perimeter = 0
    for(let i = 0; i < 4; i++) {
        const newX = x + directions[i][0]
        const newY = y + directions[i][1]
        if(newX >= 0 && newX < n && newY >= 0 && newY < m && !visited[newX][newY] && grid[x][y] === grid[newX][newY]) {
            const [returnedArea, returnedPerimeter]= dfs(newX, newY)
            perimeter += returnedPerimeter
            area += returnedArea
        }
        if(newX >= 0 && newX < n && newY >= 0 && newY < m) {
            if(grid[newX][newY] !== grid[x][y]) perimeter++
        }else perimeter++
    }

    return [area, perimeter]
}

let ans = 0
for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(visited[i][j]) continue
        const [area, perimeter] = dfs(i, j)
        ans += area * perimeter
    }
}

console.log(ans)