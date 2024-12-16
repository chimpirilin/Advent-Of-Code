f = open("input.txt", "r")

currentCalories = 0
maxCalories = 0
for lineString in f:
    if(lineString == '\n'):
        maxCalories = max(maxCalories, currentCalories)
        currentCalories = 0
    else:
        #print(lineString.splitlines()[0])
        currentCalories += int(lineString.splitlines()[0])
print(maxCalories)