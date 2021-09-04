# Lists
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
supplies = ['crayons', 'pencils', 'paper', 'Kleenex', 'eraser']
print(supplies)

# supplies.append('markers')
# print(supplies)

# supplies.remove('crayons')
# print(supplies)

# supplies.sort()
# print(supplies)

supplies.sort(key=str.lower)
print(supplies)

# -------

# colors = ['red', 'blue', 'green', 'pink']
# # print(colors)

# alphabetical = sorted(colors, reverse=True)
# print(colors)
# print(alphabetical)

# reverseColors = reversed(colors)
# print(list(reverseColors))

# -------

# scores = [150, 210, 188, 76]
# print(scores)
# print(sum(scores))
# print(max(scores))
# print(min(scores))
# print(sum(scores) / len(scores))
# print(sorted(scores, reverse=True))

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# RANGES

# nums = range(10)
# print(list(nums))

# counting = range(1, 11)
# print(list(counting))

# fives = range(0, 51, 5)
# print(list(fives))

# items = ['a', 'b', 'c']
# for i in range(len(items)):
#     print(i, items[i])

# -------------------------

# PROCESSING LISTS

# all() - looking for any item that is false
# title1 = ['Mr', 'Mrs', 'Ms']
# title2 = ['Mr', 'Mrs', 'Ms', '']
# title3 = []
# title4 = ['', '', '', '']

# print(all(title1))
# print(all(title2))
# print(all(title3))
# print(all(title4))

# any() - looking for any item to be true
# feedback1 = ['', '', '', '']
# feedback2 = ['So much fun!', '', '', '']
# feedback3 = []

# print(any(feedback1), feedback1)
# print(any(feedback2), feedback2)
# print(any(feedback3), feedback3)

# ---------------

# MAP()
# scores = [90, 86, 45, 67, 78, 98, 23, 45, 87, 98]

# def isA(num):
#     return num >= 90

# # print(list(filter(isA, scores)))

# def getGrade(num):
#     if (num >= 90):
#         return 'A'
#     elif (num < 90 and num >= 80):
#         return 'B'
#     elif (num < 80 and num >= 70):
#         return 'C'
#     elif (num < 70 and num >= 60):
#         return 'D'
#     else:
#         return 'D'

# grades = list(map(getGrade, scores))
# # print(grades)
# # print('ZIPPED GRADES AND SCORES')

# print(list(zip(scores, grades)))

# test = ['a']
# print('yes' if len(test) == 1 else 'no')  # TERNARY
