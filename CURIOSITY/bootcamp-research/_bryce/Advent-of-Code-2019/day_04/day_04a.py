def dup_adj(num):
    str_num = str(num)
    chars = [char for char in str_num]
    for i in range(len(chars) - 1):
        if chars[i] == chars[i + 1]:
            return True
    return False


def always_inc(num):
    str_num = str(num)
    chars = [char for char in str_num]
    for i in range(len(chars) - 1):
        if int(chars[i]) > int(chars[i + 1]):
            return False
    return True


possible = 0
for password in range(284639, 748760):
    if dup_adj(password) and always_inc(password):
        possible += 1
print(possible)
