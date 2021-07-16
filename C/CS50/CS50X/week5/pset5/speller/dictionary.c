// Implements a dictionary's functionality

#include <stdbool.h>

#include "dictionary.h"

// More libraries

#include <ctype.h>
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <stdlib.h>

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table
const unsigned int N = 1;

// Hash table
int words_counter = 0;
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    // Hash word to obtain a hash value
    // Access linked list at taht index in the cash table
    // Traverse linked list, looking for the word (strcasecmp)

    int index = hash(word);
    
    node *cursor = table[index];
    while (cursor != NULL)
    {
        if (strcasecmp(cursor->word, word) == 0)
        {
            return true;
        }
        cursor = cursor->next;
    }
    
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO
    
    int hash = 0;
    for (int i = 0; i < strlen(word); i++)
    {
        hash += tolower(word[i]);
    }
    
    return (hash % N);
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO
    // Open dictionary file
    // Read strings from file one at a time 
    // Create a new node for each word 
    // Hash word to obtain a hash value 
    // Insert node into hash table at that location

    FILE *infile = fopen(dictionary, "r");

    if (infile == NULL)
    {
        return false;
    }
    
    char word[LENGTH + 1];
    while (fscanf(infile, "%s", word) != EOF)
    {
        node *new_node =  malloc(sizeof(node));
        if (new_node == NULL)
        {
            return false;
        }
        
        strcpy(new_node->word, word);
        new_node->next = NULL;
        
        int index = hash(word);
        if (table[index] == NULL)
        {
            table[index] = new_node;
        }
        else
        {
            new_node->next = table[index];
            table[index] = new_node;
        }
        words_counter++;
    }
    fclose(infile);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO

    return words_counter;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    // Free all the memory allocated

    for (int i = 0; i < N; i++)
    {
        node *head = table[i];
        node *cursor = head;
        
        node *tmp = head;
        
        while (cursor != NULL)
        {
            cursor = cursor->next;
            free(tmp);
            tmp = cursor;
        }
    }
    return true;
}