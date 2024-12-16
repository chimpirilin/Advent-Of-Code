f = open("input.txt", "r")

def isOverlapping(t1, t2):
    return t1[0] <= t2[0] and t2[0] <= t1[1]

overlappingPairs = 0
for lineString in f:
    lineString = lineString.splitlines()[0]
    res = lineString.split(',')
    parsed =  [int(y) for x in lineString.split(',') for y in x.split('-')]
    l = [[parsed[0], parsed[1]], [parsed[2], parsed[3]]]
    # We could sort the list by ascending first value and descending second value
    # got lazy and wrote ugly if/else
    if l[0][0] > l[1][0]:
        l[0], l[1] = l[1], l[0]
    elif l[0][0] == l[1][0] and l[0][1] < l[1][1]:
        l[0], l[1] = l[1], l[0]
    if isOverlapping(l[0], l[1]):
        overlappingPairs += 1
print(overlappingPairs)