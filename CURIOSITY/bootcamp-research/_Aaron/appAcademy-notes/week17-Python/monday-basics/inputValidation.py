# Input Validation
# - prompt
# - handle empty string
# - make it a number
# - handle exceptions
# - require valid input

# age = input('whats your age?: ')
# print(f'Cool! You had {age} birthdays.') if (int(age) < 60 or type(age) == str) else print(
#     'YOURE FULL OF SHIT!')

# age = 1
# while age:
#     age = input('whats your age?: ')
#     if age:
#         try:
#             age = int(float(age))
#             print(f'Cool! You had {age} birthdays!') if (
#                 age > 0 and age < 120) else print('YOURE FULL OF SHIT')
#         except:
#             print('Please enter a number')
