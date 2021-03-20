#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

// standard alpha 
char LETTERS[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};


int main(int argc, string argv[])
{
    // verifying user input
    if (argc == 2)
    {
        int verified, charcounter = 0;
        string key = argv[1];
        bool valid = false;

        // verifies if each char is alpha
        for (int i = 0, s = strlen(argv[1]); i < s; i++)
        {
            verified++;

            for (int j = i + 1; j < strlen(argv[1]) + 1; j++)
            {
                valid = false;
                if (isalpha(argv[1][i]) && tolower(argv[1][i]) != tolower(argv[1][j]))
                {
                    valid = true;
                }
                else
                {
                    printf("Usage ./substitution key\n");
                    return 1;
                }
            }
        }

        if (valid != true)
        {
            printf("Key must not contain repeated characters.\n");
            return 1;
        }

        // checks 26 chars-len + if all alpha
        if (strlen(argv[1]) == 26 && verified == 26)
        {
            string plaintext = get_string("plaintext: ");

            // print ciphertext based on user key   
            printf("ciphertext: ");
            for (int j = 0, st = strlen(plaintext); j < st; j++)
            {
                if (!isalpha(plaintext[j]))
                {
                    printf("%c", plaintext[j]);
                }
                else if (isalpha(plaintext[j]))
                {
                    for (int k = 0, st = strlen(LETTERS); k < st; k++)
                    {
                        if (tolower(plaintext[j]) == LETTERS[k])
                        {
                            if (islower(plaintext[j]))
                            {
                                printf("%c", tolower(argv[1][k]));
                            }
                            else
                            {
                                printf("%c", toupper(argv[1][k]));
                            }
                        }
                    }
                }
            }            
            printf("\n");
            return 0;
        }
        else
        {
            printf("Key must contain 26 characters. \n");
            return 1;
        }
        
    }
    else
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }
}