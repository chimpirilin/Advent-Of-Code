input = open("input.txt", "r").readlines()

grid = []
nRow = 0
nCol = 0

def isVisible(i, j):
    visible = False
    visible = all(grid[i][y] < grid[i][j] for y in range(j)) or visible
    visible = all(grid[i][y] < grid[i][j] for y in range(j+1, nCol)) or visible
    visible = all(grid[x][j] < grid[i][j] for x in range(i)) or visible
    visible = all(grid[x][j] < grid[i][j] for x in range(i+1, nRow)) or visible
    return visible

def score(i, j):
    res = 1
    curScore = 0
    full = True
    # left
    for y in range(j-1, -1, -1):
        if grid[i][j] > grid[i][y]:
            curScore += 1
        else:
            full = False
            break
    if not full:
        curScore += 1
    res *= curScore

    # right
    curScore = 0
    full = True
    for y in range(j+1, nCol):
        if grid[i][j] > grid[i][y]:
            curScore += 1
        else:
            full = False
            break
    if not full:
        curScore += 1
    res *= curScore

    # down
    curScore = 0
    full = True
    for x in range(i+1, nRow):
        if grid[i][j] > grid[x][j]:
            curScore += 1
        else:
            full = False
            break
    if not full:
        curScore += 1
    res *= curScore
    # up
    curScore = 0
    full = True
    for x in range(i-1, -1, -1):
        if grid[i][j] > grid[x][j]:
            curScore += 1
        else:
            full = False
            break
    if not full:
        curScore += 1
    res *= curScore
    return res

for stringLine in input:
    stringLine = stringLine.splitlines()[0]
    values = [int(x) for x in stringLine]
    grid.append(values)
visibleTrees = 0
scenicScore = 0
nRow = len(grid)
nCol = len(grid[0])
for i in range(len(grid)):
    for j in range(len(grid[0])):
        if isVisible(i, j):
            visibleTrees += 1
        scenicScore = max(scenicScore, score(i, j))
print(visibleTrees)
print(scenicScore)