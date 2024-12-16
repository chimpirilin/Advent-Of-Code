input = open("input.txt", "r").readlines()

NUMBER_OF_VALVES = 60
mapping = {}
adjacencyList = [[] for i in range(NUMBER_OF_VALVES+1)]
valveRate = [0 for i in range(NUMBER_OF_VALVES+1)]
firsPassMask = 0
memo = {}

def reconstruct(valve: int, timeLeft: int, openValves: int) -> int:
    global firsPassMask
    if timeLeft <= 0:
        return 0
    state = (valve, timeLeft, openValves)
    isValveOpen = False if (openValves & (1 <<  valve)) == 0 else True
    for adjacentValve in adjacencyList[valve]:
        newState = (adjacentValve, timeLeft-1, openValves)
        if newState in memo and memo[state] == memo[newState]:
            reconstruct(adjacentValve, timeLeft-1, openValves)
        elif not isValveOpen and valveRate[valve] > 0:
            openValves |= 1 << valve
            newState = (adjacentValve, timeLeft-2, openValves)
            if newState in memo and memo[state] == memo[newState]+valveRate[valve]*(timeLeft-1):
                firsPassMask |= 1 << valve
                reconstruct(adjacentValve, timeLeft-2, openValves)
                break

def solve(valve: int, timeLeft: int, openValves: int) -> int:
    if timeLeft <= 0:
        return 0
    state = (valve, timeLeft, openValves)
    if state in memo:
        return memo[state]
    bestResult = 0
    isValveOpen = False if (openValves & (1 <<  valve)) == 0 else True
    for adjacentValve in adjacencyList[valve]:
        result1 = solve(adjacentValve, timeLeft-1, openValves)
        result2 = 0
        if not isValveOpen and valveRate[valve] > 0:
            openValves |= 1 << valve
            result2 = valveRate[valve]*(timeLeft-1)
            result2 += solve(adjacentValve, timeLeft-2, openValves)
            openValves &= ~(1 << valve)
        bestResult = max(bestResult,result1, result2)
    memo[state] = bestResult
    return bestResult

def createID(key):
    global cnt
    if key not in mapping:
        mapping[key] = cnt
        cnt += 1
cnt=0
for stringLine in input:
    stringLine = stringLine.splitlines()[0].split()

    parseRate = lambda s: int(s[s.find('=')+1:-1])

    currentValve = stringLine[1]
    createID(currentValve)
    currentValveID = mapping[currentValve]
    valveRate[currentValveID] = parseRate(stringLine[4])

    for valve in stringLine[9:]:
        if valve[-1] ==',':
            valve = valve[0:-1]
        createID(valve)
        valveID = mapping[valve]
        adjacencyList[currentValveID].append(valveID)
result = solve(mapping['AA'], 26, 0)
reconstruct(mapping['AA'], 26, 0)
result += solve(mapping['AA'], 26, firsPassMask)
print(result)