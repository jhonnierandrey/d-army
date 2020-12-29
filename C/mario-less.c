#include <stdio.h>
#include <cs50.h>

int main(void)
{
    int number;

    do{
        number = get_int("Number of blocks? ");
    }while( number < 1 || number > 8);

    for(int i = 1; i <= number; i++)
    {
        for(int k = number; k > i; k--)
        {
            printf(" ");
        }
        for(int j = 1; j <= i; j++)
        {
            printf("#");
        }
        printf("\n");

    }
}