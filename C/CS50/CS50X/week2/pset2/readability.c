#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

// prototypes
int count_letters(string text);
int count_words(string text);
int count_sentences(string text);
float get_average(int x,int y);

int main(void)
{
    // get user text
    string text = get_string("Text: ");

    // get totals from the text
    int numberLetters = count_letters(text);
    int numberWords = count_words(text);
    int numberSentences = count_sentences(text);

    // get averages 
    float l = get_average(numberLetters, numberWords);
    float s = get_average(numberSentences, numberWords);

    // get Coleman-Liau index
    float index = 0.0588 * l - 0.296 * s - 15.8;

    // print the response on console.
    if(index < 1)
    {
        printf("Before Grade 1\n");
    }
    else if ( index > 1 && index < 16)
    {
        printf("Grade %.0f\n", index);
    }
    else
    {
        printf("Grade 16+\n");
    }
}

int count_letters(string text)
{
    int counter = 0;

    for (int i = 0, s = strlen(text); i <= s; i++)
    {
        if (tolower(text[i]) >= 'a' && tolower(text[i]) <= 'z')
        {
            counter++;
        }
    }

    return counter;
}

int count_words(string text)
{
    int counter = 1;

    for (int i = 0, s = strlen(text); i <= s; i++)
    {
        if (text[i] == ' ')
        {
            counter++;
        }
    }

    return counter;
}

int count_sentences(string text)
{
    int counter = 0;

    for (int i = 0, s = strlen(text); i <= s; i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            counter++;
        }
    }

    return counter;
}

float get_average(int x, int y)
{
    return ((float) x / (float) y) * 100;
}