from math import inf
input = open("input.txt", "r").readlines()

NUMBER_OF_VALVES = 60
mapping = {}
adjacencyList = [[] for i in range(NUMBER_OF_VALVES+1)]
valveRate = [0 for i in range(NUMBER_OF_VALVES+1)]
firstPassResult = 0
firstPassMask = 0
findOptimalBitmask = False

memo = {}

cnt  = 0
cnt2 = 0



def solve(valve: int, timeLeft: int, openedValves: int, currentResult: int) -> int:
    global cnt, firstPassMask, firstPassResult, findOptimalBitmask
    cnt += 1
    # if (cnt & (cnt-1)) == 0:
    #     print(cnt, cnt2)
    if timeLeft <= 0:
        return 0
    state = (valve, timeLeft, openedValves)
    print(state, bin(openedValves).replace('0b', ''), currentResult)
    if state in memo:
        # cnt2 += 1
        return memo[state]
    bestResult = 0
    # print(valve)
    isValveOpen = False if (openedValves & (1 <<  valve)) == 0 else True
    # print(isValveOpen)
    for adjacentValve in adjacencyList[valve]:
        result1 = solve(adjacentValve, timeLeft-1, openedValves, currentResult)
        result2 = 0
        if not isValveOpen and valveRate[valve] > 0:
            openedValves |= 1 << valve
            result2 = valveRate[valve]*(timeLeft-1)
            tmp = result2
            currentResult += result2
            if currentResult == firstPassResult:
                firstPassMask = openedValves
            result2 += solve(adjacentValve, timeLeft-2, openedValves, currentResult)
            currentResult -= tmp
            
            # if currentResult != inf:
            #     print(currentResult, openedValves)
            openedValves &= ~(1 << valve)
        bestResult = max(bestResult,result1, result2)
    memo[state] = bestResult
    return bestResult


cnt  = 0

def createID(key):
    global cnt
    if key not in mapping:
        mapping[key] = cnt
        cnt += 1

for stringLine in input:
    stringLine = stringLine.splitlines()[0].split()

    parseRate = lambda s: int(s[s.find('=')+1:-1])

    currentValve = stringLine[1]
    createID(currentValve)
    currentValveID = mapping[currentValve]
    valveRate[currentValveID] = parseRate(stringLine[4])

    for valve in stringLine[9:]:
        valveID = 0
        if valve[-1] ==',':
            valve = valve[0:-1]
        createID(valve)
        valveID = mapping[valve]
        adjacencyList[currentValveID].append(valveID)

result = solve(mapping['AA'], 30, 0, 0)
firstPassResult = result
# memo = {}
# solve(mapping['AA'], 26, 0, 0)
# print(firstPassMask, bin(firstPassMask).replace('0b', ''), result)
# result += solve(mapping['AA'], 26, firstPassMask, inf)
print(result)
