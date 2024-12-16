input = open("input.txt", "r").readlines()

DIM = 1000

grid = [[0 for y in range(1000)] for x in range(1000)]
visited = [[0 for y in range(DIM)] for x in range(DIM)]
visited[DIM//2][DIM//2] = 
x, y, tx, ty, hx, hy = DIM//2, DIM//2, DIM//2, DIM//2, DIM//2, DIM//2
def headUp():
    return hx < tx
def headRight():
    return hy > ty

def moveTail():
    global x, y, tx, ty, hx, hy
    # print(hx, hy, tx, ty)
    if abs(tx-hx) <= 1 and abs(ty-hy) <= 1:
        return
    # needs to move right
    if tx == hx and ty + 2 == hy:
        # print('good1')
        ty += 1   
    # needs to move left
    if tx == hx and ty - 2 == hy:
        # print('good2')
        ty -= 1
    # needs to move up
    if ty == hy and tx - 2 == hx:
        # print('good3')
        ty -= 1
    # needs to move down
    if ty == hy and tx + 2 == hx:
        # print('good4')
        ty += 1
    if abs(tx-hx) == 2 or abs(ty-hy) == 2:
        # print('wtf')
        if headUp():
            if headRight():
                tx -= 1
                ty += 1
            else:
                tx -= 1
                ty -= 1
        else:
            if headRight():
                tx += 1
                ty += 1
            else:
                tx += 1
                ty -= 1
    visited[tx][ty] = 1

for stringLine in input:
    stringLine = stringLine.splitlines()[0]
    dir, step = stringLine.split()
    step = int(step)
    for xx in range(step):
        # print(dir, step, xx)
        match dir:
            case 'R':
                hy += 1
            case 'L':
                hy -= 1
            case 'U':
                hx -= 1
            case 'D':
                hx += 1
        moveTail()
visitedPos = sum([sum(xx) for xx in visited])
# for xx in visited:
#     print(xx)
print(visitedPos)