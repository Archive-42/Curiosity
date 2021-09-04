# **Chapter 1 | The way of the program**

> The single most important skill for a computer scientist is **problem solving**.

## **1.1 What is a program?**
- A **program** is simply just a sequence of instructions that indicates how to perform a specific computation.
  - **Computations** can be mathematical, or symbolic such as search and replacing text, or even graphical such as processing an image.
  - Some basic instructions that appear in almost all languages:
    - Inputs, Outputs, Math, Conditionals, Repetitions.
> Remember every program is just breaking down a complex task into individual steps -- that's it!

## **1.2 Running Python**
- To run Python on your machine you can first start out with an in browser interpreter such as:
  - [PythonAnywhere](https://www.pythonanywhere.com/)
  - [Repl.it](https://repl.it/)
- You can also install an Interpreter directly onto your machine to excecute your code via the terminal or in an IDE like VSCode.

## **1.3 The first program**
- Python print statement:
  ```
  print('Hello, World!')
  ```

## **1.4 Arithmetic operators**
- Python contains the basic math operators: +, -, *, /, % (modulus)
- ** is used for exponentiation.
- // is used for floor division.
- &, | Bitwise AND and OR
- ^ Bitwise XOR (exclusive OR)
- ~ Bitwise NOT
- << Bitwise left shift
- '>>' Bitwise right shift
> Python does NOT include increment/decrement operators (i++, i--)

## **1.5 Values and types**
- You can check the type of a value in Python like so:
```
type(2) # 'int' (integer)
type(12.0) # 'float' (floating-point number)
type('Cat') # 'str' (string)
```
> '#' Hashes are used to denote comments in Python
## **1.6 Formal and natural languages**
- **Natural Languages** : Languages humans speak.
- **Formal Languages** : Languages designed by people for specific applications.
> Programming languages are formal languages that have been designed to
express computations.
  - Formal languages have strict syntax rules.
  - Syntax rules are built via tokens and structure.
    - **Tokens** are the basic building blocks of a language, i.e. words, numbers, or even chemical elements.
    - **Structure** relates to the way these tokens are combined.
    ```
    i.e. 3 + /3 is illegal because you cannot have these two operators right next to eachother.

    i.e. This is @ well-structured Engli$h sentence with invalid t*kens in it. This sentence all valid
    tokens has, but invalid structure with. (Yeah this hurt my brain too)
    ```
  - **Parsing** : Process of figuring out the strucutre of a formal language.
  - Differences between Natural and Figurative: **Ambiguity**, **Redundancy**, and **Literalness**.
  >  The difference between formal and natural language is like the difference
    between poetry and prose
## **1.7 Debugging**
  - **Bugs** : Programming errors.
  - **Debugging**: Process of tracking down bugs.
  > Programming, and especially debugging, sometimes brings out strong emotions. If you
  are struggling with a difficult bug, you might feel angry, despondent, or embarrassed.
## **1.8 Glossary Extra Terms**
- **high-level language**: A programming language like Python that is designed to be easy for
humans to read and write.
- **low-level language**: A programming language that is designed to be easy for a computer
to run; also called “machine language” or “assembly language”.
- **portability**: A property of a program that can run on more than one kind of computer
## **1.9 Exercises**
1. In a print statement, what happens if you leave out one of the parentheses, or both?
```
Syntax Error: Unexpected EOL (End of Line)
Syntax Error: No parenthesis to call Print function
```
2. If you are trying to print a string, what happens if you leave out one of the quotation marks,
or both?
```
Syntax Error: Unexpected EOL (End of Line)
Name Error: Leaving out the quotes makes your string into a variable name, in this case it will returned undefined.
```
3. You can use a minus sign to make a negative number like -2. What happens if you put a plus
sign before a number? What about 2++2?
```
It will execute normally.
```
4. In math notation, leading zeros are ok, as in 09. What happens if you try this in Python?
What about 011?
```
Python does not allow leading zeroes, a Syntax Error will occur.
```
5. What happens if you have two values with no operator between them?
```
Syntax Error: Invalid Syntax
```
6. How many seconds are there in 42 minutes 42 seconds?
```
print(42 * 60 + 42) # 2562
```
7. How many miles are there in 10 kilometers? Hint: there are 1.61 kilometers in a mile.
```
print(10 * 1.61) # 16.1 miles
```
8. If you run a 10 kilometer race in 42 minutes 42 seconds, what is your average pace (time per
mile in minutes and seconds)? What is your average speed in miles per hour?
```
print(16.1 / 2562) # mps 0.006
print(16.1 / (2562 / 60)) # mpm 0.38
print(16.1 / (37.8 / 60)) # mph 25.55
```
