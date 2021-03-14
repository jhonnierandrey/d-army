# variables
age_sample = 20
price = 19.99
first_name = 'Batman'
is_online = True

# inputs from user
name = input('What is your name? ')
print('Hello ' + name)

birth_year = input('Enter your birth year: ')
age = 2021 - int(birth_year)
print(age)

# build int functions

# int()
# float()
# bool()
# str()

# simple calculator

first_number = input('First: ')
second_number = input('Second: ')
print('Sum ' + str(float(first_number) + float(second_number)))

# strings

course = 'Python'

print(course.upper())
print(course.lower())
print(course.find('y'))
print(course.replace('o', '0'))

print('Python' in course)

# arithmetic operations

x = 10
x += 3
print(x)

# operator prededence

x = (10 + 3) * 2
print(x)

# comparison operators
x = 3 != 2
print(x)

# logical operators
price = 5
print(price > 10 and price < 30)
print(price > 10 or price < 30)
print(not price > 10)

# if statements
temperature = 5

if temperature > 30:
    print("It's a hot day")
    print("Drink plenty of water")
elif temperature > 20:
    print("It's a nice day.")
elif temperature > 10:
    print("It's a bit cold.")
else:
    print("It's cold")
print('Done')

# weight exercise
weight = float(input('Weight: '))
measure = input("(K)g or (L)bs: ")

if measure == 'l' or measure == 'L':
    print("Weight in Kg: " + str(weight * 0.45))
elif measure == 'k' or measure == 'K':
    print("Weight in Lbs: " + str(weight / 0.45))

# while loops
i = 1 
while i <= 5:
    print(i * '*')
    i += 1

# lists 
names = ["Jhon", "Bob", "Mosh", "Sam", "Mary"]
names[0] = "Jon"

# print(names[-2])
print(names[0:3])

# list methods
numbers = [ 1, 2, 3, 4, 5]
numbers.append(6)
numbers.insert(0, "one")
numbers.remove(3)
# numbers.clear()

print(len(numbers))

# for loops
numbers = [ 1, 2, 3, 4, 5]
for item in numbers:
    print(item)


# the range() function
numbers = range(5, 10)

print(numbers)
for number in numbers:
    print(number)

#tuples - unmutable 

numbers = (1, 2, 3)
numbers[0] = 5