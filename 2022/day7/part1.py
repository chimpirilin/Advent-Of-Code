folderItems = {'/' : []}
sizeOfFolders = {'/': 0}
folders = set()
parent = dict()
hasChild = set()
visited = set()
input = open("input.txt", "r").readlines()

onLs = False
directory = []

total = 0

def getFullDirectory():
    first = True
    res= ''
    for x in directory:
        if first == False:
            res += '-'
        res += x
        first = False
    # print(directory)
    # print(res)
    return res

def propagateToParent(folder):
    visited.add(folder)
    if folder == '/':
        return
    par = parent[folder]
    sizeOfFolders[par] += sizeOfFolders[folder]
    propagateToParent(par)

for stringLine in input:
    stringLine = stringLine.splitlines()[0]
    commands = stringLine.split()
    if commands[0] == '$':
        if commands[1] == 'cd':
            if commands[2] == '..':
                directory.pop()
            else:
                currentFolder = '/'
                if len(directory) != 0:
                    currentFolder = getFullDirectory()
                    thisFolder = currentFolder+'-'+commands[2]
                    parent[thisFolder] = currentFolder
                    hasChild.add(currentFolder)
                    currentFolder = thisFolder
                directory.append(commands[2])
                folders.add(currentFolder)

    elif commands[0] == 'dir':
        currentFolder = getFullDirectory()
        thisFolder = currentFolder+'-'+commands[1]
        if currentFolder not in folderItems:
            folderItems[currentFolder] = []
        folderItems[currentFolder].append(thisFolder)
        if thisFolder not in sizeOfFolders:
            sizeOfFolders[thisFolder] = 0
    else:
        currentFolder = getFullDirectory()
        if currentFolder not in sizeOfFolders:
            sizeOfFolders[currentFolder] = 0 
        sizeOfFolders[currentFolder] += int(commands[0])
        total += int(commands[0])

#print(folders)
print(parent)

for folder in folders:
    if folder not in hasChild:
        propagateToParent(folder)
ans = sum([x for x in sizeOfFolders.values() if x <= 100000])
print(ans)
print(total, sizeOfFolders['/'])