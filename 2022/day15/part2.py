input = open("input.txt", "r").readlines()

MAX_COORDINATE = 4000000
MIN_COORDINATE = 0

intervals = [[] for i in range(MAX_COORDINATE+1)]

for stringLine in input:
    stringLine = stringLine.splitlines()[0].split()
    # , on purpose to make parsing a one-liner
    stringLine[-1] = stringLine[-1] + ','

    parse = lambda s: int(s[2:-1])

    sx, sy = parse(stringLine[2]),  parse(stringLine[3])
    bx, by = parse(stringLine[8]),  parse(stringLine[9])
    manhattan = abs(sx - bx) + abs(sy - by)
    # print(sx, sy, bx, by, manhattan)
    for i in range(manhattan+1):
        cury = sy-i
        if cury < MIN_COORDINATE or cury > MAX_COORDINATE:
            break
        left = manhattan - abs(cury-sy)
        l = max(MIN_COORDINATE, sx - left)
        r = min(MAX_COORDINATE, sx + left)
        intervals[cury].append((l, r))
    for i in range(1,manhattan+1):
        cury = sy+i
        if cury < MIN_COORDINATE or cury > MAX_COORDINATE:
            break
        left = manhattan - abs(cury-sy)
        l = max(MIN_COORDINATE, sx - left)
        r = min(MAX_COORDINATE, sx + left)
        intervals[cury].append((l, r))
found = False
for i in range(len(intervals)):
    intervals[i].sort()
    n = len(intervals[i])
    if n == 0:
        continue
    curl, curr = intervals[i][0]
    # We'll try to merge intervals, if we can't 
    # then we found the only possible position
    for l,r in intervals[i]:
        if l >= curl and l <=  curr + 1:
            curr = max(curr, r)
        else:
            print(MAX_COORDINATE*(l - 1) + i)
            found = True
            break
    if found:
        break