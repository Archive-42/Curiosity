# lst = [1, '2', 'three', True, None]

# Old way of mapping a list.
# new_list = []
# for l in lst:
#   new_list.append(l)
# [value, for-loop]

# new_lst = [l for l in lst]
# print(new_lst)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# lst = ['jerry', 'MARY', 'carrIE', 'larry']

# new_lst = [l.title() for l in lst]

# print(new_lst)
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Filter

# lst = [1, 12, 23, 34, 45, 56, 67, 21, 33, 40]

# new_lst = []
# for in lst:
#   if 1 % 3 == 0:
#     new_lst.append(1)

# new_lst = [l for l in lst if l % 3 == 0]
# print(new_lst)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#

# letters = ['a', 'b', 'c']
# nums = [1, 2]

# new_lst = []
# for n in nums:
#     for l in letters:
#         new_lst.append((n, l))

# new_lst = [(n, l) for n in nums for l in letters]
# print(new_lst)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

keys = ['age', 'name', 'height']
values = [32, 'Corina', 1.4]

# d = dict(zip(keys, values))

# d = {keys[i].title(): values[i] for i in range(len(keys))}

d = {key: value for (key, value) in zip(keys, values)}
print(d)
