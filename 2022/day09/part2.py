input = open("input.txt", "r").readlines()

PART_2 = False
TAM = 10 if PART_2 else 2
DIM = 1000

visited = [[0 for y in range(DIM)] for x in range(DIM)]
visited[DIM//2][DIM//2] = 1
positions = [[DIM//2, DIM//2] for i in range(DIM)]

def headUp(idx):
    return positions[idx][0] < positions[idx+1][0]

def headRight(idx):
    return positions[idx][1] > positions[idx+1][1]

def move(idx):
    hx, hy = positions[idx][0], positions[idx][1]
    tx, ty = positions[idx+1][0], positions[idx+1][1]
    if tx == hx and ty + 2 == hy: # needs to move right
        ty += 1   
    if tx == hx and ty - 2 == hy: # needs to move left
        ty -= 1
    if ty == hy and tx - 2 == hx: # needs to move up
        tx -= 1
    if ty == hy and tx + 2 == hx: # needs to move down
        tx += 1
    if abs(tx-hx) == 2 or abs(ty-hy) == 2:
        if headUp(idx):
            if headRight(idx):
                tx, ty = tx - 1, ty +1
            else:
                tx, ty = tx - 1, ty - 1
        elif headRight(idx):
            tx, ty = tx + 1, ty + 1
        else:
            tx, ty = tx + 1, ty - 1
    positions[idx][0], positions[idx][1] = hx, hy
    positions[idx+1][0], positions[idx+1][1] = tx, ty
    visited[positions[TAM-1][0]][positions[TAM-1][1]] = 1

for stringLine in input:
    stringLine = stringLine.splitlines()[0] # get rid of '/n' at the end
    dir, step = stringLine.split()
    step = int(step)
    for i in range(step):
        match dir:
            case 'R':
                positions[0][1] += 1
            case 'L':
                positions[0][1] -= 1
            case 'U':
                positions[0][0] -= 1
            case 'D':
                positions[0][0] += 1
        for j in range(TAM-1):
            move(j)
print(sum([sum(i) for i in visited]))