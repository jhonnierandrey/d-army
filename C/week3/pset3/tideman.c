#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
}
pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
void print_winner(void);

bool check_cycle(int i);
bool check_cycle_util(int v, bool visited[]);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    // TODO

    // iterate each candidate
    for (int i = 0; i < candidate_count; i++)
    {
        // check if current candidate = name
        if (strcmp(name, candidates[i]) == 0)
        {
            // update rank for the current voter
            ranks[rank] = i;
            return true;
        }
    }
    
    return false;
}

// Update preferences given one voter's ranks
void record_preferences(int ranks[])
{
    // TODO
    for (int i = 0; i < candidate_count; i++)
    {
        // updates preferences[i][j]
        for (int j = i + 1; j < candidate_count; j++)
        {
            preferences[ranks[i]][ranks[j]]++;
        }
    }
    return;
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    // TODO
    for (int i = 0; i < candidate_count; i++)
    {
        // compares each other candidate & update pairs
        for (int j = 0; j < candidate_count; j++)
        {
            if (preferences[i][j] > preferences[j][i])
            {
                pairs[pair_count].winner = i;
                pairs[pair_count].loser = j;
                pair_count++;
            }
        }
    }
    return;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    // TODO
    // sort all the pairs by as-order
    for (int i = 1; i < pair_count; i++)
    { 
        pair key = pairs[i]; 
        int j = i - 1; 
        while (j >= 0 && preferences[pairs[j].winner][pairs[j].loser] > preferences[key.winner][key.loser]) 
        { 
            pairs[j + 1] = pairs[j]; 
            j = j - 1; 
        } 
        pairs[j + 1] = key; 
    } 
    

    // move pairs in des-order
    pair tempPairs[pair_count];
    for (int i = 0; i < pair_count; i++)
    {
        tempPairs[i] = pairs[pair_count - i - 1];
    }

    for (int i = 0; i < pair_count; i++)
    {
        pairs[i] = tempPairs[i];
    }
    return;
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    // TODO
    for (int i = 0; i < pair_count; i++)
    {
        locked[pairs[i].winner][pairs[i].loser] = true;
        if (check_cycle(i))
        {
            locked[pairs[i].winner][pairs[i].loser] = false;
        }
    }
    return;
}

// Print the winner of the election
void print_winner(void)
{
    // TODO
    bool winner = true;
    int can_index = 0;
    for (int i = 0; i < candidate_count; i++)
    {
        winner = true;
        for (int j = 0; j < candidate_count; j++)
        {
            // checking the candidate columm with i
            if (locked[j][i] == true)
            {
                winner = false;
                break;
            }
        }
        if (winner == true)
        {
            can_index = i;
            break;
        }
    }
    if (winner == true)
    {
        printf("The winner is %s\n", candidates[can_index]);
    }
    return;
}

// custom fuctions

bool check_cycle(int i)
{
    bool visited[candidate_count];

    for (int j = 0; j < candidate_count; j++)
    {
        visited[j] = false;
    }
    // starting from the first node
    return check_cycle_util(pairs[i].winner, visited);
}

bool check_cycle_util(int i, bool visited[])
{
    if (visited[i])
    {
        return true;
    }

    visited[i] = true;

    for (int j = 0; j < candidate_count; j++)
    {
        // going to check the next node, that is pointed to
        if (locked[i][j] && check_cycle_util(j, visited))
        {
            return true;
        }
    }
    return false;
}