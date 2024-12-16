input = open("input.txt", "r").readlines()

ROW = 10

nonValidPositions = set()
beaconsOnROW = set()
coordinates = []

def addPositions(sx, sy, manhattan):
    left = manhattan - abs(ROW-sy)
    if left < 0:
        return
    l = sx - left
    r = sx + left
    for i in range(l, r+1):
        if i not in beaconsOnROW:
            nonValidPositions.add(i)

for stringLine in input:
    
    stringLine = stringLine.splitlines()[0].split()
    stringLine[-1] = stringLine[-1] + ',' # on purpose to make parsing shorter

    parse = lambda s: int(s[2:-1])

    sx, sy = parse(stringLine[2]),  parse(stringLine[3])
    bx, by = parse(stringLine[8]),  parse(stringLine[9])
    coordinates.append([sx, sy, bx, by])
    if by == ROW:
        beaconsOnROW.add(bx)

for sx, sy, bx, by in coordinates:
    manhattan = abs(sx - bx) + abs(sy - by)
    addPositions(sx, sy, manhattan)
print(len(nonValidPositions))