#include <stdio.h>
#include <cs50.h>
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

// prototypes
int cipher(string original, int key);

int main(int argc, string argv[])
{
    // will store key here if it's valid
    int key;
    string plainText;

    // verify cmd-inline input
    if (argc == 2)
    {
        //iterate through the args
        int digits = 0;
        
        for (int i = 0, s = strlen(argv[1]); i < s; i++)
        {
            if (isdigit(argv[1][i]))
            {
                digits++;
            }
        }

        // converts string into int if all char are digits
        if (digits == strlen(argv[1]))
        {
            key = atoi(argv[1]);
            plainText = get_string("plaintext: ");
        }
        else
        {
            printf("Usage: ./caesar key \n");
            return 1;
        }

        cipher(plainText, key);
    }
    else
    {
        printf("Usage: ./caesar key \n");
        return 1;
    }
}

int cipher(string original, int key)
{
    // will store cipher text
    char cipherText[strlen(original)];

    // cipher the original text
    for (int i = 0, s = strlen(original); i < s; i++)
    {
        if (isalpha(original[i]))
        {
            char c = 'A';
            if (islower(original[i]))
            {
                c = 'a';
            }
            cipherText[i] = (original[i] - c + key) % 26 + c;
        }
        else if (original[i] >= 0 && original[i] <= 127)
        {
            cipherText[i] = original[i];
        }
        else
        {
            printf("Usage: ./caesar key \n");
            return 1;
        }
    }
    
    // prints the stored ciphertext
    printf("ciphertext: %s\n", cipherText);
    return 0;
}