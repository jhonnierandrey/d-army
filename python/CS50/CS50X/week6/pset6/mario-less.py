from cs50 import get_int

height = 0

while height < 1 or height > 8:
    height = get_int("Height: ")

i = 1

for j in reversed(range(height)):
    print(" " * j, end="")
    print("#" * i)
    i += 1