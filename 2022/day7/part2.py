TOTAL_SPACE = 70000000
NEEDED_SPACE = 30000000
ROOT = '/'

folderItems = {ROOT : []}
sizeOfFolders = {ROOT: 0}
folders = set()
parent = dict()
children = dict()
treeLevel = {0: [ROOT]}
highestTreeLevel = 0
directory = []

input = open("input.txt", "r").readlines()

def dfs(folder, level):
    if level+1 not in treeLevel:
        treeLevel[level+1] = []
    for x in children[folder]:
        treeLevel[level+1].append(x)
        if x in children:
            dfs(x, level+1)

def getFullDirectory():
    first = True
    res= ''
    for x in directory:
        if first == False:
            res += '-'
        res += x
        first = False
    return res

for stringLine in input:
    stringLine = stringLine.splitlines()[0]
    commands = stringLine.split()
    if commands[0] == '$':
        if commands[1] == 'cd':
            if commands[2] == '..':
                directory.pop()
            else:
                currentFolder = ROOT
                if len(directory) != 0:
                    currentFolder = getFullDirectory()
                    thisFolder = currentFolder+'-'+commands[2]
                    parent[thisFolder] = currentFolder
                    if currentFolder not in children:
                        children[currentFolder] = []
                    children[currentFolder].append(thisFolder)
                    currentFolder = thisFolder
                directory.append(commands[2])
                folders.add(currentFolder)

    elif commands[0] == 'dir':
        currentFolder = getFullDirectory()
        thisFolder = currentFolder+'-'+commands[1]
        folderItems[currentFolder] = []
        folderItems[currentFolder].append(thisFolder)
        sizeOfFolders[thisFolder] = 0
    else:
        currentFolder = getFullDirectory()
        sizeOfFolders[currentFolder] += int(commands[0])

dfs(ROOT, 0)
highestTreeLevel = max(treeLevel.keys())
for level in range(highestTreeLevel, 0, -1):
    for x in treeLevel[level]:
        par  = parent[x]
        sizeOfFolders[par] += sizeOfFolders[x]

listOfSizes = sorted([x for x in sizeOfFolders.values()])

usedSpace = sizeOfFolders[ROOT]

for x in listOfSizes:
    newSpace = usedSpace - x
    if TOTAL_SPACE - newSpace >= NEEDED_SPACE:
        print(x)
        break