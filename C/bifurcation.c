#include <stdio.h>
#include <cs50.h>

// prototype
void calc(int in, float x, float r);

int main(void)
{
    float x = get_float("X: ");
    float r = get_float("R: ");
    int interactions = get_int("Interactions: ");
    
    calc(interactions, x, r);
}

void calc(int in, float x, float r)
{
    float result = x;

    for (int i = 0; i < in; i++)
    {
        result = r * result * (1 - result); 
        printf("X%i = %f \n", i + 1, result);
    } 
}