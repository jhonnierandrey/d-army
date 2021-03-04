#include <stdio.h>
#include <cs50.h>

int main(void)
{
    // getting valid cc number from user
    long cardNumber;
    do
    {
        cardNumber = get_long("Number: ");
    }
    while (cardNumber <= 0);

    long modifiedCard = cardNumber;
    int sumResult, count = 0;
    long divisor = 10;

    // getting odd numbers
    while (modifiedCard > 0)
    {
        int lastDigit = modifiedCard % 10;
        sumResult = sumResult + lastDigit;
        modifiedCard = modifiedCard / 100;
    }

    // getting even numbers 
    modifiedCard = cardNumber / 10;
    while (modifiedCard > 0)
    {
        int lastDigit = modifiedCard % 10;
        int timesTwo = lastDigit * 2;
        sumResult = sumResult + (timesTwo % 10) + (timesTwo / 10);
        modifiedCard = modifiedCard / 100;
    }

    // getting the number length
    modifiedCard = cardNumber;
    while (modifiedCard != 0)
    {
        modifiedCard = modifiedCard / 10;
        count++;
    }

    // getting divisor
    for (int i = 0; i < count - 2; i++)
    {
       divisor = divisor * 10;
    }
    
    int firstDigit = cardNumber / divisor;
    int firstTwoDigits = cardNumber / (divisor / 10);

    // getting card name
    if (sumResult % 10 == 0)
    {   
        if(firstDigit == 4 && (count == 13 || count == 16))
        {
            printf("VISA");
        }
        else if ((firstTwoDigits == 34 || firstTwoDigits == 37) && count == 15)
        {
            printf("AMEX");
        }
        else if ((50 < firstTwoDigits && firstTwoDigits < 56) && count == 16)
        {
            printf("MASTERCARD");
        }
        else
        {
            printf("INVALID");
        }
    }
    else
    {
        printf("INVALID");
    }
}