from math import inf
from queue import Queue

input = open("input.txt", "r").readlines()

grid, steps = [], []
soureceX, soureceY = 0, 0
startX, startY = 0, 0
m, n = 0, 0
dirx, diry = [-1, 0, 1, 0], [0, 1, 0, -1]

def validPosition(pos):
    x, y = pos[0], pos[1]
    return x >= 0 and x < m and y >= 0 and y < n

def validStep(u, v):
    heightU = ord(grid[u[0]][u[1]])
    heightV = ord(grid[v[0]][v[1]]) 
    return heightU - heightV >= -1

def bfs():
    queue = Queue()
    queue.put((soureceX, soureceY))
    steps[soureceX][soureceY] = 0
    while not queue.empty():
        u = queue.get()
        ux, uy = u[0], u[1]
        for i in range(4):
            vx, vy = ux + dirx[i], uy + diry[i]
            v = (vx, vy)
            if validPosition(v) and validStep(v, u) and steps[vx][vy] == inf:
                steps[vx][vy] = steps[ux][uy] + 1
                queue.put(v)

for stringLine in input:
     stringLine = stringLine.splitlines()[0] # get rid of '/n' at the end
     grid.append(list(stringLine))

m, n = len(grid), len(grid[0])

for i in range(m):
    steps.append([inf for j in range(n)])
    for j in range(n):
        if grid[i][j] == 'S':
            startX, startY = i, j
            grid[i][j] = 'a'
        elif grid[i][j] == 'E':
            soureceX, soureceY = i, j
            grid[i][j] = 'z'
bfs()
bestTrail = inf
for i in range(m):
    for j in range(n):
        if grid[i][j] == 'a':
            bestTrail = min(bestTrail, steps[i][j])
print(steps[startX][startY]) # part one
print(bestTrail) # part two