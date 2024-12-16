input = open("input.txt", "r").readlines()

ithCycle = [0 for i in range(500)]
ithCycle[0], ithCycle[1] = 1, 1
idx = 0

for stringLine in input:
    stringLine = stringLine.splitlines()[0] # get rid of '/n' at the end
    stringLine = stringLine.split()
    idx += 1
    if stringLine[0] != 'noop':
        addx = int(stringLine[1])
        idx += 1
        ithCycle[idx] = ithCycle[idx-1]
        ithCycle[idx+1] = ithCycle[idx] + addx
    else:
        ithCycle[idx+1] = ithCycle[idx]

signalStrengthsSum = 0
for i in range(0, 6):
    signalStrengthsSum += ithCycle[20+i*40]*(20+i*40)
print(signalStrengthsSum)
#Part 2
screen = [['.' for j in range(40)] for i in range(6)]
for x in range(240):
    i, j = x // 40, x % 40
    screen[i][j] = '#' if abs(ithCycle[x+1] - j) <= 1 else '.'
for i in range(6):
    print(''.join(screen[i]))