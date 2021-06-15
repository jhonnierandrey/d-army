from cs50 import get_float

dollars = 0

while dollars <= 0:
    dollars = get_float("Change owed: ")

cents = round(dollars * 100)

coins = 0
change = 25 * coins

while cents >= 25:
    coins += 1
    cents -= 25

while cents >= 10:
    coins += 1
    cents -= 10

while cents >= 5:
    coins += 1
    cents -= 5

while cents >= 1:
    coins += 1
    cents -= 1

print(coins)