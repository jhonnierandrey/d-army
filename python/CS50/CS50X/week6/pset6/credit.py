# Implement a program that determines whether a provided credit card number is valid according to Luhn’s algorithm.

from cs50 import get_int

card_number = 0

while card_number <= 0:
    card_number = get_int("Number: ")

modified_card = card_number
sum_result = 0
count = 0
divisor = 10

# gettig odd numbers 
while modified_card > 0:
    last_digit = modified_card % 10
    sum_result = sum_result + last_digit
    modified_card = modified_card // 100

# getting even numbers 
modified_card = card_number // 10
while modified_card > 0:
    last_digit = modified_card % 10
    times_two = last_digit * 2
    sum_result = sum_result + (times_two % 10) + (times_two // 10)
    modified_card = modified_card // 100

# getting the number length
modified_card = card_number
while modified_card != 0:
    modified_card = modified_card // 10
    count += 1

# getting divisor 
for i in range(count - 2):
    divisor = divisor * 10

first_digit = card_number // divisor
first_two_digits = card_number // (divisor // 10)

# getting card name
if int(sum_result) % 10 == 0:
    if first_digit == 4 and (count == 13 or count == 16):
        print("VISA")
    elif (first_two_digits == 34 or first_two_digits == 37) and count == 15:
        print("AMEX")
    elif (50 < first_two_digits and first_two_digits < 56) and count == 16:
        print("MASTERCARD")
    else:
        print("INVALID")
else:
    print("INVALID")