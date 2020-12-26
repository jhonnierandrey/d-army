#include <stdio.h>
#include <stdlib.h>

int main()
{
    char grade;
    printf("Enter your grade: ");
    scanf("%c", &grade);
    printf("You got an %c on the test \n", grade);
}