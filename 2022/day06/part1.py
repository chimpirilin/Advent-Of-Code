f = open("input.txt", "r")

dataStream = f.readline()

markerPos = 0
for i in range(3, len(dataStream)):
    lastFourSet = {dataStream[i], dataStream[i-1],  dataStream[i-2],  dataStream[i-3]}
    if len(lastFourSet) == 4:
        markerPos = i + 1
        break
print(markerPos)