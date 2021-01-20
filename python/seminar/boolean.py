x = int(input("x: "))
y = int(input("y: "))

if x > 0 and y > 0:
    print("both positive")
elif x > 0 or y > 0:
    print("one positive")
else:
    print("neither positive")
