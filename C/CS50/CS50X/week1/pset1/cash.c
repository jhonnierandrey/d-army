#include <stdio.h>
#include <math.h>
#include <cs50.h>

int main(void){
    float dollars;

    do
    {
        dollars = get_float("Change owed: ");
    }
    while(dollars < 0);

    int cents = round(dollars * 100);

    int coins = 0;
    int change = 25 * coins;

    while(cents >= 25)
    {
        coins++;
        cents -= 25;
    }

    while(cents >= 10)
    {
        coins++;
        cents -= 10;
    }

    while(cents >= 5)
    {
        coins++;
        cents -= 5;
    }

    while(cents >= 1)
    {
        coins++;
        cents -= 1;
    }

    printf("We owe you = %i coins, cents = %i \n", coins, change);
}