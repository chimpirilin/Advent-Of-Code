f = open("input.txt", "r")

dataStream = f.readline()

markerPos = 0
for i in range(13, len(dataStream)):
    last14Set = set()
    for j in range(14):
        last14Set.add(dataStream[i-j])
    if len(last14Set) == 14:
        markerPos = i + 1
        break
print(markerPos)