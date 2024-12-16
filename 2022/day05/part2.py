f = open("input.txt", "r")

nastyInput = []
stacks = []

def uglyParsing():
    stackIndex = 0
    for i in range(len(nastyInput[0])):
        newStack = True
        rowWithValues = False
        for j in range(len(nastyInput)):
            asciiNumber = ord(nastyInput[j][i])
            if asciiNumber >= 65 and asciiNumber <= 90:
                if newStack:
                    stacks.append([])
                    newStack = False
                stacks[stackIndex].append(nastyInput[j][i])
                rowWithValues = True
        if rowWithValues == True:
            stackIndex += 1
    for x in stacks:
        x.reverse()

readProcedure = False
for lineString in f:
    lineString = lineString.splitlines()[0]
    if not readProcedure:
        if len(lineString.strip()) == 0:
            uglyParsing()
            readProcedure = True
        else:
            nastyInput.append(lineString)
    else:
        instruction = lineString.split()
        quantity = int(instruction[1])
        source = int(instruction[3]) - 1
        target = int(instruction[5]) - 1
        tempList = []
        for i in range(quantity):
            tempList.append(stacks[source].pop())
        tempList.reverse()
        for x in tempList:
            stacks[target].append(x)
ans = ''.join([x[-1] for x in stacks])
print(ans)