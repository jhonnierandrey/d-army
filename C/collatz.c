#include <stdio.h>
#include <cs50.h>

// prototypes
int collatz(int n);
int counter = 0;

int main(void)
{
    int n = get_int("Your input: ");

    printf("Steps: %i \n", collatz(n));
}

int collatz(int n)
{
    if(n == 1)
    {
        return counter;
    }
    else if(n % 2 == 0)
    {
        counter++;
        return collatz(n / 2);
    }
    else if(n % 2 != 0)
    {
        counter++;
        return collatz((3 * n) + 1);
    }
    return 1;
}