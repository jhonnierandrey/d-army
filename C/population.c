#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // TODO: Prompt for start size
    int start;

    do
    {
        start = get_int("Start size: ");
    }
    while (start < 9);

    // TODO: Prompt for end size
    int end;

    do
    {
        end = get_int("End size: ");
    }
    while (end < start);
    

    // TODO: Calculate number of years until we reach threshold

    int born, death, current;

    current = start;
    born = start / 3;
    death = start / 4;
    int i;

    for (i = 0; end > current; i++)
    {
        born = current / 3;
        death = current / 4;

        current += born - death;
    }

    // TODO: Print number of years
    
    printf("Years: %i\n", i);
}