f = open("input.txt", "r")

def getPriority(item):
    if ord(item) <= 90:
        return ord(item) - ord('A') + 27
    else:
        return ord(item) - ord('a') + 1

sumOfPriorities = 0
cnt = 0
group = []
for lineString in f:
    cnt += 1
    lineString = lineString.splitlines()[0]
    group.append(lineString)
    if(cnt % 3 == 0):
        badge = set(group[0]).intersection(group[1]).intersection(group[2]).pop()
        group.clear()
        priority = getPriority(badge)
        sumOfPriorities += priority
print(sumOfPriorities)