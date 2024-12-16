input = open("input.txt", "r").readlines()

GRID_SIZE = 1000
PART_2 = False
startx, starty = 0, 500

grid = [['.' for j in range(GRID_SIZE)] for i in range(GRID_SIZE)]
abyssX = 0

for stringLine in input:
    stringLine = stringLine.splitlines()[0]
    stringLine = stringLine.split('->')
    firstPoint = True
    lastx, lasty = 0, 0
    for yx in stringLine:
        y, x = [int(val) for val in yx.split(',')]
        abyssX = max(abyssX, x)
        if not firstPoint:
            assert(x == lastx or y == lasty)
            for i in range(min(x, lastx), max(x, lastx) + 1):
                grid[i][y] = '#'
            for i in range(min(y, lasty), max(y, lasty) + 1):
                grid[x][i] = '#'
            lastx, lasty = x, y
        firstPoint = False
        lastx, lasty = x, y

intoTheAbyss = False
restingUnits = 0
if PART_2:
    grid[abyssX+2] = ['#' for i in range(GRID_SIZE)]

while not intoTheAbyss:
    sandx, sandy = startx, starty
    onRest = False
    while not onRest:
        if grid[sandx + 1][sandy] != '#':
            sandx += 1
        elif grid[sandx + 1][sandy-1] != '#':
            sandx +=1 
            sandy -= 1
        elif grid[sandx + 1][sandy+1] != '#':
            sandx +=1 
            sandy += 1
        else:
            grid[sandx][sandy] = '#'
            restingUnits += 1
            if PART_2 and sandx == startx and sandy == starty:
                intoTheAbyss = True
            onRest = True
        if not PART_2 and sandx > abyssX:
            intoTheAbyss = True
            onRest = True
print(restingUnits)
    