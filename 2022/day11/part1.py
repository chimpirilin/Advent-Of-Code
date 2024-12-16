from functools import reduce

input = open("input.txt", "r").readlines()

PART_2 = True
NUMBER_OF_MONKEYS = 8
NUMBER_OF_ROUNDS = 10000 if PART_2 else 20
monkeyItems = [[] for i in range(NUMBER_OF_MONKEYS)]
monkeyOperation = ['' for i in range(NUMBER_OF_MONKEYS)]
throwTo = [[0,0] for i in range(NUMBER_OF_MONKEYS)]
divisibleBy = [0 for i in range(NUMBER_OF_MONKEYS)]
inspections = [0 for i in range(NUMBER_OF_MONKEYS)]

i = 0
while i < len(input):
    line1 = input[i].splitlines()[0] # get rid of '/n' at the end
    l = line1.split()[1][0]
    monkeyNumber = int(''.join(l))
    line2 = input[i+1].splitlines()[0] # get rid of '/n' at the end
    l = line2.split()[2:]
    l = [list(x) for x in l]
    l[-1].append(',')
    for x in l:
        x.pop()
        item = ''.join(x)
        monkeyItems[monkeyNumber].append(item)
    line3 = input[i+2].splitlines()[0] # get rid of '/n' at the end
    monkeyOperation[monkeyNumber] = ''.join(line3.split()[3:])
    line4 = input[i+3].splitlines()[0] # get rid of '/n' at the end
    divisibleBy[monkeyNumber] = int(line4.split()[3])
    line5 = input[i+4].splitlines()[0] # get rid of '/n' at the end
    throwTo[monkeyNumber][0] = int(line5.split()[5])
    line6 = input[i+5].splitlines()[0] # get rid of '/n' at the end
    throwTo[monkeyNumber][1] = int(line6.split()[5])
    i += 7

modulo = reduce(lambda a, b: a*b, divisibleBy)

for i in range(NUMBER_OF_ROUNDS):
    for j in range(NUMBER_OF_MONKEYS):
        for x in monkeyItems[j]:
            operation = monkeyOperation[j]
            newWorry = eval(operation.replace('old', x))
            newWorry = newWorry % modulo if PART_2 else newWorry // 3
            toMonkey = 0
            if newWorry % divisibleBy[j] == 0:
                toMonkey = throwTo[j][0]
            else:
                toMonkey = throwTo[j][1]
            monkeyItems[toMonkey].append(str(newWorry))
            inspections[j] += 1
        monkeyItems[j].clear()
inspections.sort()
monkeyBusiness = inspections[-1] * inspections[-2]
print(monkeyBusiness)


