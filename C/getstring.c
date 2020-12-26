#include <stdio.h>
#include <stdlib.h>

int main()
{
    char name[10];
    printf("Enter your name: ");
    fgets(name, 10, stdin);
    printf("Hello %s! \n", name);
}
