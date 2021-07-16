#include <stdio.h>
// needs to include cs50 library on make using -lcs50
#include <cs50.h>

int main(void)
{
    string name = get_string("What is your name? \n");
    printf("Hello, %s !\n", name);
}