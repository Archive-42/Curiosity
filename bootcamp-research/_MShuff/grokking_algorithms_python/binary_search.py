def binary_search(list, item):
    count = 0
    low = 0
    high = len(list) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = list[mid]
        print(f'guess: {guess}')
        if guess == item:
            return f'index: {mid}, steps: {count}, guess: {guess}'
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
        count += 1
    return f'None, took {count} steps'


my_list = [1, 3, 5, 7, 9]

print(binary_search(my_list, 3))
print(binary_search(my_list, -1))
