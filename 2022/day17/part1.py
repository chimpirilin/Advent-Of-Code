input = open("input.txt", "r").readlines()
input = input[0]

ROW = 10**6
COL = 9

grid = [['.' for j in range(COL)] for i in range(ROW)]
grid[0] = ['#' for i in range(COL)]
for i in range(ROW):
    grid[i][0] = '#'
    grid[i][COL-1] = '#'

class Coordinate():
    def __init__(self, x, y) -> None:
        self.x = x
        self.y = y

class Shape():
    position = []
    sizeOfPosition = 0
    currentShape = ''
    def printShape(self):
        posl = [(pos.x, pos.y) for pos in self.position]
        print(f"{self.currentShape} : {posl}")
    def highestEdge(self):
        return max([pos.x for pos in self.position])
    def isDone(self, grid):
        for pos in self.position:
            x, y = pos.x, pos.y
            if grid[x-1][y] == '#':
                return True
        return False
    def moveDown(self):
        for i in range(self.sizeOfPosition):
            self.position[i].x -= 1
    def moveRight(self, grid):
        for pos in self.position:
            x, y = pos.x, pos.y
            if grid[x][y-1] == '#':
                return
        for i in range(self.sizeOfPosition):
            self.position[i].y -= 1
    def moveLeft(self, grid):
        for pos in self.position:
            x, y = pos.x, pos.y
            if grid[x][y+1] == '#':
                return
        for i in range(self.sizeOfPosition):
            self.position[i].y += 1

class CrossShape(Shape):
    def __init__(self, bottomEdgeX):
        self.position = [ Coordinate(bottomEdgeX+1, 5), Coordinate(bottomEdgeX+1, 4), Coordinate(bottomEdgeX+1, 3),
                        Coordinate(bottomEdgeX, 4), Coordinate(bottomEdgeX+2, 4) ]
        self.sizeOfPosition = len(self.position)
        self.currentShape = 'Cross'

class SquareShape(Shape):
    def __init__(self, bottomEdgeX):
        self.position = [Coordinate(bottomEdgeX, 5), Coordinate(bottomEdgeX, 4), Coordinate(bottomEdgeX+1, 5), 
                        Coordinate(bottomEdgeX+1, 4)]
        self.sizeOfPosition = len(self.position)
        self.currentShape = 'Square'

class LShape(Shape):
    def __init__(self, bottomEdgeX):
        self.position = [Coordinate(bottomEdgeX, 5), Coordinate(bottomEdgeX, 4), Coordinate(bottomEdgeX, 3), 
                        Coordinate(bottomEdgeX+1, 3), Coordinate(bottomEdgeX+2, 3)]
        self.sizeOfPosition = len(self.position)
        self.currentShape = 'L'

class VerticalBar(Shape):
    def __init__(self, bottomEdgeX):
        self.position = [Coordinate(bottomEdgeX, 5), Coordinate(bottomEdgeX+1, 5), Coordinate(bottomEdgeX+2, 5), 
                        Coordinate(bottomEdgeX+3, 5)]
        self.sizeOfPosition = len(self.position)
        self.currentShape = 'Vertical Bar'

class HorizontalBar(Shape):
    def __init__(self, bottomEdgeX):
        self.position = [Coordinate(bottomEdgeX, 5), Coordinate(bottomEdgeX, 4), Coordinate(bottomEdgeX, 3), 
                        Coordinate(bottomEdgeX, 2)]
        self.sizeOfPosition = len(self.position)
        self.currentShape = 'Horizontal Bar'

stoppedRocks = 0
shapeID = 0
inputIdx = 0
inputLen = len(input) 
highest = 0
hashes = {}
numberOfHashes = 0

def newHash(direPos):
    hash = 1
    # print(direPos)
    if highest >= 10:
        for i in range(highest, highest-10, -1):
            rowHash = 0
            for j in range(1,8):
                if grid[i][j] == '#':
                    rowHash += 2**(j)
            hash *= rowHash
    else:
        return
    hashTuple = (direPos,hash)
    if hashTuple in hashes:
        # print('bingo!!!')
        print(hashTuple, hashes[hashTuple], stoppedRocks, highest)
    hashes[(direPos,hash)] = (stoppedRocks, highest)

def printGrid(pos):
    tmpGrid = [x[:] for x in grid[0:highest+10]]
    # for i in pos:
    #     tmpGrid[i.x][i.y] = '@'
    for i in range(len(tmpGrid)):
        tmpGrid[i].reverse()
    tmpGrid.reverse()
    cnt = len(tmpGrid)-1
    for x in tmpGrid:
        padding = 1 if (cnt // 10) == 0 else 0
        space = padding*' '
        print(cnt, space,''.join(x))
        # print(space,''.join(x))
        cnt -=1 
    bottomcnt = [ str(i) for i in range(COL)]
    print('   ',''.join(bottomcnt))



while stoppedRocks < 1532:
    shapeObject = None
    match shapeID:
        case 0:
            shapeObject = HorizontalBar(highest+4)
        case 1:
            shapeObject = CrossShape(highest+4)
        case 2:
            shapeObject = LShape(highest+4)
        case 3:
            shapeObject = VerticalBar(highest+4)
        case 4:
            shapeObject = SquareShape(highest+4)
    # if (stoppedRocks & (stoppedRocks-1)) == 0:
    #     print(stoppedRocks, highest)
    #     printGrid(shapeObject.position)
    shapeID = (shapeID + 1) % 5

    while True:
        direction = input[inputIdx]
        inputIdx = (inputIdx+1)%inputLen

        if direction == '<':
            shapeObject.moveLeft(grid)
        else:
            shapeObject.moveRight(grid)
        # print(direction)
        # printGrid(shapeObject.position)
        if shapeObject.isDone(grid):
            stoppedRocks += 1
            for pos in shapeObject.position:
                grid[pos.x][pos.y] = '#'
            if highest < shapeObject.highestEdge():
                highest = shapeObject.highestEdge()
                newHash(inputIdx)
            # printGrid(shapeObject.position)
            break
        shapeObject.moveDown()
printGrid(pos)
print(highest)
