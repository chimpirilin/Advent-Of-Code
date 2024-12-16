import { readFileSync } from "fs";

const grid = readFileSync("puzzle_input.txt", "utf-8").split("\n");

const n = grid.length;
const m = grid[0].length;

for (let i = 0; i < n; i++) grid[i] = grid[i].split("");

let visited;
const forbidden = new Array(n + 10).fill(null).map(() => Array(m + 10).fill(0));

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
let x, y, x2, y2;
let direction = UP;
let direction2 = UP;
let ans = 0;

// check if we can find a loop
// returns 2 when a loop is found
function step2() {
  switch (direction2) {
    case UP:
      if (x2 === 0) return 0;
      if (visited[x2][y2][direction2]) {
        return 2;
      }
      visited[x2][y2][direction2] = 1;
      if (grid[x2 - 1][y2] === "#") {
        direction2 = RIGHT;
      } else {
        x2--;
      }
      return 1;
    case DOWN:
      if (x2 === n - 1) return 0;
      if (visited[x2][y2][direction2]) {
        return 2;
      }
      visited[x2][y2][direction2] = 1;
      if (grid[x2 + 1][y2] === "#") {
        direction2 = LEFT;
      } else {
        x2++;
      }
      return 1;
    case LEFT:
      if (y2 === 0) return 0;
      if (visited[x2][y2][direction2]) {
        return 2;
      }
      visited[x2][y2][direction2] = 1;
      if (grid[x2][y2 - 1] === "#") {
        direction2 = UP;
      } else {
        y2--;
      }
      return 1;
    case RIGHT:
      if (y2 === m - 1) return 0;
      if (visited[x2][y2][direction2]) {
        return 2;
      }
      visited[x2][y2][direction2] = 1;
      if (grid[x2][y2 + 1] === "#") {
        direction2 = DOWN;
      } else {
        y2++;
      }
      return 1;
    default:
      break;
  }
}

// brute force
// each time we visit a cell, we put an obstruction and check if we can find a loop
// do some casework for the directions
function step() {
  visited = new Array(n + 10)
    .fill(null)
    .map(() => new Array(m + 10).fill(null).map(() => [0, 0, 0, 0]));

  // so let's forbid putting obstruction in the current path since it blocks the path
  forbidden[x][y] = 1; 

  switch (direction) {
    case UP:
      if (x === 0) return false;
      if (grid[x - 1][y] === "#") {
        direction = RIGHT;
        direction2 = RIGHT;
      } else if (!forbidden[x - 1][y]) {
        grid[x - 1][y] = "#";
        let foundLoop;
        while ((foundLoop = step2()) === 1) {}
        if (foundLoop === 2) ans++;
        grid[x - 1][y] = ".";
        x--;
        x2 = x;
        y2 = y;
        direction2 = direction;
      } else {
        x--;
        x2 = x;
        y2 = y;
        direction2 = direction;
      }
      return true;
    case DOWN:
      if (x === n - 1) return false;
      if (grid[x + 1][y] === "#") {
        direction = LEFT;
        direction2 = LEFT;
      } else if (!forbidden[x + 1][y]) {
        grid[x + 1][y] = "#";
        let foundLoop;
        while ((foundLoop = step2()) === 1) {}
        if (foundLoop === 2) ans++;
        grid[x + 1][y] = ".";
        x++;
        x2 = x;
        y2 = y;
        direction2 = direction;
      } else {
        x++;
        x2 = x;
        y2 = y;
        direction2 = direction;
      }
      return true;
    case LEFT:
      if (y === 0) return false;
      if (grid[x][y - 1] === "#") {
        direction = UP;
        direction2 = UP;
      } else if (!forbidden[x][y - 1]) {
        grid[x][y - 1] = "#";
        let foundLoop;
        while ((foundLoop = step2()) === 1) {}
        if (foundLoop === 2) {
          ans++;
        }
        grid[x][y - 1] = ".";
        y--;
        y2 = y;
        x2 = x;
        direction2 = direction;
      } else {
        y--;
        y2 = y;
        x2 = x;
        direction2 = direction;
      }
      return true;
    case RIGHT:
      if (y === m - 1) return false;

      if (grid[x][y + 1] === "#") {
        direction = DOWN;
        direction2 = DOWN;
      } else if (!forbidden[x][y + 1]) {
        grid[x][y + 1] = "#";
        let foundLoop;
        while ((foundLoop = step2()) === 1) {}
        if (foundLoop === 2) ans++;
        grid[x][y + 1] = ".";
        y++;
        y2 = y;
        x2 = x;
        direction2 = direction;
      } else {
        direction2 = direction;
        y++;
        y2 = y;
        x2 = x;
      }
      return true;
    default:
      break;
  }
}

function determineInitialPos() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "^") return [i, j];
    }
  }
}

[x, y] = determineInitialPos();
x2 = x;
y2 = y;

while (step()) {}
console.log(ans);
