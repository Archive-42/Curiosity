def find_smallest(arr):
    smallest = arr[0]  # Store smallest value
    smallest_index = 0  # Store index of smallest value
    for i in range(1, len(arr)):  # Loop through entire array
        if arr[i] < smallest:  # If new item is less than current smallest
            smallest = arr[i]  # Update smallest
            smallest_index = i  # Update smallest index
    return smallest_index  # Return smallest index


def selection_sort(arr):
    newArr = []  # Create empty array for our new list
    for i in range(len(arr)):  # Loop through entire array
        smallest = find_smallest(arr)  # Find the smallest number in the array
        newArr.append(
            arr.pop(smallest))  # Pop from original list and add to new list
    return newArr  # Return our new, sorted list


# What is this time complexity? I believe O(n^2)
print(selection_sort([6, 3, 1, 0, 9, 10, 1, -5, 4]))
