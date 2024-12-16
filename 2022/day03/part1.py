f = open("input.txt", "r")

def getPriority(item):
    if ord(item) <= 90:
        return ord(item) - ord('A') + 27
    else:
        return ord(item) - ord('a') + 1

sumOfPriorities = 0
for lineString in f:
    lineString = lineString.splitlines()[0]
    comparmentCapacity = len(lineString) // 2
    compartment1 = lineString[0:comparmentCapacity]
    compartment2 = lineString[comparmentCapacity:]
    mistakenItem = set(compartment1).intersection(compartment2).pop()
    priority = getPriority(mistakenItem)
    sumOfPriorities += priority
print(sumOfPriorities)