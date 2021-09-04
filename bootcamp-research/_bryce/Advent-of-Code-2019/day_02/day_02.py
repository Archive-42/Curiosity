instructions_orig = [
    1, 12, 2, 3,
    1, 1, 2, 3,
    1, 3, 4, 3,
    1, 5, 0, 3,
    2, 6, 1, 19,
    1, 19, 5, 23,
    2, 10, 23, 27,
    2, 27, 13, 31,
    1, 10, 31, 35,
    1, 35, 9, 39,
    2, 39, 13, 43,
    1, 43, 5, 47,
    1, 47, 6, 51,
    2, 6, 51, 55,
    1, 5, 55, 59,
    2, 9, 59, 63,
    2, 6, 63, 67,
    1, 13, 67, 71,
    1, 9, 71, 75,
    2, 13, 75, 79,
    1, 79, 10, 83,
    2, 83, 9, 87,
    1, 5, 87, 91,
    2, 91, 6, 95,
    2, 13, 95, 99,
    1, 99, 5, 103,
    1, 103, 2, 107,
    1, 107, 10, 0,
    99,
    2, 0, 14, 0]


cur_pos = 0
instructions = instructions_orig.copy()
while instructions[cur_pos] != 99:
    method = instructions[cur_pos]
    pos_1 = instructions[cur_pos + 1]
    pos_2 = instructions[cur_pos + 2]
    pos_3 = instructions[cur_pos + 3]
    if method == 1:
        instructions[pos_3] = instructions[pos_1] + instructions[pos_2]
    elif method == 2:
        instructions[pos_3] = instructions[pos_1] * instructions[pos_2]
    cur_pos += 4

print(instructions)

for noun in range(100):
    for verb in range(100):
        instructions = instructions_orig.copy()
        instructions[1] = noun
        instructions[2] = verb

        cur_pos = 0
        while instructions[cur_pos] != 99:
            method = instructions[cur_pos]
            pos_1 = instructions[cur_pos + 1]
            pos_2 = instructions[cur_pos + 2]
            pos_3 = instructions[cur_pos + 3]
            if method == 1:
                instructions[pos_3] = instructions[pos_1] + instructions[pos_2]
            elif method == 2:
                instructions[pos_3] = instructions[pos_1] * instructions[pos_2]
            cur_pos += 4

        if instructions[0] == 19690720:
            print(noun)
            print(verb)
            print(100 * noun + verb)
            print(instructions)
            break
