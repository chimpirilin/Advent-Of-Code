f = open("input.txt", "r")

currentCalories = 0
maxCalories = 0
elfCalories = []
for lineString in f:
    if(lineString == '\n'):
        elfCalories.append(currentCalories)
        currentCalories = 0
    else:
        #print(lineString.splitlines()[0])
        currentCalories += int(lineString.splitlines()[0])

elfCalories.sort(reverse=True)
for i in range(3):
    maxCalories += elfCalories[i]
print(maxCalories)