import { readFileSync } from 'fs';

// let grid = readFileSync('sample_input.txt', 'utf-8').split('\n');
const grid = readFileSync('puzzle_input.txt', 'utf-8').split('\n')

const n = grid.length;
const m = grid[0].length;

const antennaToPosition = new Map();

for(let i = 0; i < n; i++) grid[i] = grid[i].split('');

for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(grid[i][j] !== '.') {
            const curPos = antennaToPosition.get(grid[i][j]);
            if(!curPos) {
                // for some weird reason doing antennaToPosition.set(grid[i][j], [i, j]);
                // was not creating an array with two elements, but create two new entries in the map
                // adding an empty array and then push does the job
                antennaToPosition.set(grid[i][j], []);
                antennaToPosition.get(grid[i][j]).push([i, j]);
            }else curPos.push([i, j]);
        }
    }
}

// We now only need the positions
const antennasPositions = [...antennaToPosition].map(el => el[1]);

let ans = 0;

const insideGrid = (pos) => pos[0] >= 0 && pos[0] < n && pos[1] >= 0 && pos[1] < m;
const alreadyAntinode = (pos) => grid[pos[0]][pos[1]] === '#';

for(const positions of antennasPositions) {
    // iterate over pairs of antennas
    for(let i = 0; i < positions.length; i++) {
        for(let j = i+1; j < positions.length; j++) {
            let pos1 = positions[i], pos2 = positions[j];
            let verticalDir = 1, horizontalDir = -1;
            if(pos1[0] < pos2[0]) {
                verticalDir = -1;
            }
            if(pos1[1] > pos2[1]) {
                horizontalDir = 1;
            }

            // manhattan distance
            const verticalDisplacement = Math.abs(pos1[0]-pos2[0]);
            const horizontalDisplacement = Math.abs(pos1[1]-pos2[1]);

            for(let i = 0; true; i++) {
                const antinodePos1 = [pos1[0]+verticalDisplacement*verticalDir*i, pos1[1]+horizontalDisplacement*horizontalDir*i];
                if(!insideGrid(antinodePos1)) break;
                if(!alreadyAntinode(antinodePos1)) {
                    grid[antinodePos1[0]][antinodePos1[1]] = '#'
                    ans++;
                }
            }
            
            // multiply by -1 because the the other antinode will have an opposite displacement
            // if antinode1 goes up and left, antinode2 goes down and right
            verticalDir*=-1, horizontalDir*=-1;
            
            for(let i = 0; true; i++) {
                const antinodePos2 = [pos2[0]+verticalDisplacement*verticalDir*i, pos2[1]+horizontalDisplacement*horizontalDir*i];
                if(!insideGrid(antinodePos2)) break;
                if(!alreadyAntinode(antinodePos2)) {
                    grid[antinodePos2[0]][antinodePos2[1]] = '#'
                    ans++;
                }
            }
        }
    }
}

console.log(ans)