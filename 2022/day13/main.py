input = open("input.txt", "r").readlines()

IN_DISORDER = 0
IN_ORDER = 1
UNDECIDED = -1
DIVIDER_PACKET_1, DIVIDER_PACKET_2 = [[2]], [[6]]

packets = [DIVIDER_PACKET_1, DIVIDER_PACKET_2]

def isNumber(l):
    return not isinstance(l, list)

def compare(l1, l2):
    order = UNDECIDED
    tam = len(l1)
    if len(l2) < len(l1):
        order = IN_DISORDER
        tam = len(l2)
    elif len(l2) > len(l1):
        order = IN_ORDER
    for i in range(tam):
        newl1, newl2 = l1[i], l2[i]
        if isNumber(newl1) and isNumber(newl2):
            if newl2 < newl1:
                return IN_DISORDER
            elif newl2 > newl1:
                return IN_ORDER
        else:
            if isNumber(newl1):
                newl1 = [newl1]
            if isNumber(newl2):
                newl2 = [newl2]
            result = compare(newl1, newl2)
            if result == IN_ORDER or result == IN_DISORDER:
                order = result
                break
    return order

def insertionSort():
    i = 1
    while i < len(packets):
        j = i
        while j > 0 and compare(packets[j-1], packets[j]) == IN_DISORDER:
            packets[j], packets[j-1] = packets[j-1], packets[j]
            j -= 1
        i += 1

i = 0
indices = 0

while i < len(input):
    l1 = eval(input[i].splitlines()[0])
    l2 = eval(input[i+1].splitlines()[0])
    packets.append(l1)
    packets.append(l2)
    i += 3
    if compare(l1, l2) == IN_ORDER:
        indices += i // 3
print(indices)
insertionSort()
decoderKey = 1
for i in range(len(packets)):
    if packets[i] == DIVIDER_PACKET_1:
        decoderKey *= i+1
    elif packets[i] == DIVIDER_PACKET_2:
        decoderKey *= i+1
print(decoderKey)