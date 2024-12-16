import { readFileSync } from 'fs';

// let grid = readFileSync('sample_input.txt', 'utf-8').split('\n')
let grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = grid.length
const m = grid[0].length

const visited = Array.from({ length: n }, () => Array(m).fill(false));
const visitedEdges = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(4).fill(false)));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function isInside(x, y) {
    return x >= 0 && x < n && y >= 0 && y < m
}

const TOP_EDGE = 0
const BOTTOM_EDGE = 1
const LEFT_EDGE = 2
const RIGHT_EDGE = 3

/*
given a cell, returns an array of 4 booleans, each representing if the edge in that direction is present

Here's my defintionf for the edge direction
              TOP_EDGE
         -----------------
         |               |
LEFT_EDGE|               | RIGHT_EDGE
         |               |
         |               |
         -----------------
            BOTTOM_EDGE


*/
function directionsOfCellEdges(x, y) {
    const directions = Array(4).fill(false)
    if(x === 0 || grid[x - 1][y] !== grid[x][y]) directions[TOP_EDGE] = true
    if(x === n - 1 || grid[x + 1][y] !== grid[x][y]) directions[BOTTOM_EDGE] = true
    if(y === 0 || grid[x][y - 1] !== grid[x][y]) directions[LEFT_EDGE] = true
    if(y === m - 1 || grid[x][y + 1] !== grid[x][y]) directions[RIGHT_EDGE] = true
    return directions
}

// now that identified that the cell is an edge of the polygon, mark the edge so that we don't visit it again
function visitEdge(x, y, direction) {
    if(visitedEdges[x][y][direction]) return 0 

    const plant = grid[x][y]
    visitedEdges[x][y][direction] = true

    switch(direction) {
        case LEFT_EDGE:
            // try go up
            for(let newX = x-1; true; newX--) {
                if(isInside(newX, y) && grid[newX][y] === plant && !visitedEdges[newX][y][direction] && (!isInside(newX, y-1) || grid[newX][y-1] !== plant)) {
                    visitedEdges[newX][y][direction] = true
                }else break
            }

            // try go down
            for(let newX = x+1; true; newX++) {
                if(isInside(newX, y) && grid[newX][y] === plant && !visitedEdges[newX][y][direction] && (!isInside(newX, y-1) || grid[newX][y-1] !== plant)) {
                    visitedEdges[newX][y][direction] = true
                }else break
            }
            break
        case RIGHT_EDGE:
            // try go up
            for(let newX = x-1; true; newX--) {
                if(isInside(newX, y) && grid[newX][y] === plant && !visitedEdges[newX][y][direction] && (!isInside(newX, y+1) || grid[newX][y+1] !== plant)) {
                    visitedEdges[newX][y][direction] = true
                }else break
            }

            // try go down
            for(let newX = x+1; true; newX++) {
                if(isInside(newX, y) && grid[newX][y] === plant && !visitedEdges[newX][y][direction] && (!isInside(newX, y+1) || grid[newX][y+1] !== plant)) {
                    visitedEdges[newX][y][direction] = true
                }else break
            }
            break
        case TOP_EDGE:
            // try go right
            for(let newY = y+1; true; newY++) {
                if(isInside(x, newY) && grid[x][newY] === plant && !visitedEdges[x][newY][direction] && (!isInside(x-1, newY) || grid[x-1][newY] !== plant)) {
                    visitedEdges[x][newY][direction] = true
                }else break
            }

            // try go left
            for(let newY = y-1; true; newY--) {
                if(isInside(x, newY) && grid[x][newY] === plant && !visitedEdges[x][newY][direction] && (!isInside(x-1, newY) || grid[x-1][newY] !== plant)) {
                    visitedEdges[x][newY][direction] = true
                }else break
            }
            break
        case BOTTOM_EDGE:
            // try go right
            for(let newY = y+1; true; newY++) {
                if(isInside(x, newY) && grid[x][newY] === plant && !visitedEdges[x][newY][direction] && (!isInside(x+1, newY) || grid[x+1][newY] !== plant)) {
                    visitedEdges[x][newY][direction] = true
                }else break
            }

            // try go left
            for(let newY = y-1; true; newY--) {
                if(isInside(x, newY) && grid[x][newY] === plant && !visitedEdges[x][newY][direction] && (!isInside(x+1, newY) || grid[x+1][newY] !== plant)) {
                    visitedEdges[x][newY][direction] = true
                }else break
            }
            break
    }

    return 1
}

function dfs(x, y) {
    visited[x][y] = true
    const directionsE = directionsOfCellEdges(x, y)

    let area = 1, edges = 0
    const plant = grid[x][y]

    for(let i = 0; i < 4; i++) {
        if(directionsE[i]) {
            edges += visitEdge(x, y, i)
        }
    }

    for(let i = 0; i < 4; i++) {
        const newX = x + directions[i][0]
        const newY = y + directions[i][1]
        if(isInside(newX, newY) && !visited[newX][newY] && grid[newX][newY] === plant) {
            const [returnedArea, returnedEdges]= dfs(newX, newY)
            edges += returnedEdges
            area += returnedArea
        }
    }

    return [area, edges]
}

let ans = 0
for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(visited[i][j]) continue
        const [area, edges] = dfs(i, j)
        ans += area * edges
    }
}

console.log(ans)