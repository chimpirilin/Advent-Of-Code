LOSE = 0
DRAW = 3
WIN = 6
ROCK = 'X'
PAPER = 'Y'
SCISSOR = 'Z'

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

def shapeToChoose(alice, ending):
    match ending:
        case 'X':
            match alice:
                case 'A':
                    return SCISSOR
                case 'B':
                    return ROCK
                case 'C':
                    return PAPER

        case 'Y':
            match alice:
                case 'A':
                    return ROCK
                case 'B':
                    return PAPER
                case 'C':
                    return SCISSOR
        case 'Z':
            match alice:
                case 'A':
                    return PAPER
                case 'B':
                    return SCISSOR
                case 'C':
                    return ROCK

f = open("input.txt", "r")

totalScore = 0
for lineString in f:
    opponent, ending = lineString.split()
    shape = shapeToChoose(opponent, ending)
    result = outcome(opponent, shape) + shapeScore(shape)
    totalScore += result
print(totalScore)