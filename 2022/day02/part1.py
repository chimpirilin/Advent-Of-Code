LOSE = 0
DRAW = 3
WIN = 6

def outcome(alice, bob):
    match alice:
        case 'A':
            match bob:
                case 'X':
                    return DRAW
                case 'Y':
                    return WIN
                case 'Z':
                    return LOSE
                case other:
                    return 0
        case 'B':
            match bob:
                case 'X':
                    return LOSE
                case 'Y':
                    return DRAW
                case 'Z':
                    return WIN
                case other:
                    return 0
        case 'C':
            match bob:
                case 'X':
                    return WIN
                case 'Y':
                    return LOSE
                case 'Z':
                    return DRAW
                case other:
                    return 0

def shapeScore(bob):
    match bob:
        case 'X':
            return 1
        case 'Y':
            return 2
        case 'Z':
            return 3
        case other:
            return 0


f = open("input.txt", "r")

totalScore = 0
for lineString in f:
    opponent, myself = lineString.split()
    result = outcome(opponent, myself) + shapeScore(myself)
    totalScore += result
print(totalScore)