# print('Hello world')

# Arithmetic
# ~~~~~~~~~~~~~~~~~~
# x = 25  # integer
# y = 5  # float
# print(x, y)  # 25 5
# print(x + y)  # 30
# print(x - y)  # 20
# print(x * y)  # 125
# print(x / y)  # 5
# print(x // y)  # 5
# print(x % y)  # 0
# print(x ** 2)
# print(y ** 2)


# Input / Output
# ~~~~~~~~~~~~~~~~~~
# name = input('What is your name?: ')  # or input('blabla\') <- line break
# print(name)
# print('Hi,' + name + '.')
# print('Hi, %s, %s' % (name, name))  # s is for string
# print('Hi, {0}, {1}.'.format(name, name))
# print(f'Hi, {name}.')

# Duck typing
# ~~~~~~~~~~~~~~~~~~
# a = False
# a = None
# a = 5
# a = 'Box'
# try:
#     print(len(a))
# except:
#     print(f'{a} has no length')

# Arithmetic with Strings
# ~~~~~~~~~~~~~~~~~~
# a = 'a'
# b = 'b'
# an = 'an'
# print(b + an)
# print(b + a*7)
# print(b + an*2 + a)
# print('$1' + ',000'*3)

# Assignment operators
# ~~~~~~~~~~~~~~~~~~
# i = 1
# i = i + 1
# i **= 2
# i //= 10
# i += 3
# i *= 10**20
# i **= 10*20
# print(i)
# print(float(i))

# Equality
# ~~~~~~~~~~~~~~~~~~
# a = 1
# b = 1.0
# c = '1'
# print(a == b)
# print(a == c)
# print(b == c)
# if(a == c):
#     print('match')
# elif (a == b):
#     print(f'{a} matches {b}')
# else:
#     print('not a match')

# Meaning of truth
# ~~~~~~~~~~~~~~~~~~
# def test(value):
#     if (value):
#         print(f'{value} is true')
#     else:
#         print(f'{value} is false')

# # Truthy
# a = 1
# b = 1.0
# c = '1'
# d = [a, b, c]
# e = {'hi': 'hello'}
# f = test

# # Falsey
# g = ''
# h = 0
# i = None
# j = []
# k = {}
# test(f)

# Identity vs. Equality
# ~~~~~~~~~~~~~~~~~~
# a = 1
# b = 1.0
# c = '1'

# # True
# print(a == b)
# print(a == 1 and isinstance(a, int))
# print([[], 2, 3] is [[], 2, 3])


# # false
# print(a is b)  # compares reference/identity in memory
# print(a is c)
# print(b is c)
# print([] is [])
# print(b == 1 and isinstance(b, int))

# Functions
# ~~~~~~~~~~~~~~~~~~

# def xor(left, right):
#     return left != right

# def xor(left, right): return left != right


# def print_power_of(base, exp=1):
#     i = 1
#     while i <= exp:
#         print(base**i)
#         i += 1


# def greetingMaker(salutation):
#     def greeting(name):
#         return f'{salutation} {name}'
#     return greeting


# print(xor(True, True))
# print(xor(True, False))
# print(xor(False, True))
# print(xor(False, False))

# print(print_power_of(2, 5))
# print_power_of(2, 5)
# print_power_of(exp=5, base=2)
# print(print_power_of(2, exp=5, base=2)) # Error because you have more arguments than parameters.
# print(print_power_of(2)) # Error because you have less arguments than parameters.

# hello = greetingMaker('Hello')
# hiya = greetingMaker('Hiya')

# print(hello('Monika'))
# print(hiya('Raja'))
