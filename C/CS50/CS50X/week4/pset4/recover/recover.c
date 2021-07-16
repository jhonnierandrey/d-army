#include <stdio.h>
#include <stdlib.h>
#include <cs50.h>
#include <stdint.h>

typedef uint8_t BYTE;

// Number of bytes for an image
#define BLOCK_SIZE 512
#define FILE_NAME_SIZE 8

int main(int argc, char *argv[])
{
    // check for 1 inline argument
    if (argc != 2)
    {
        printf("Usage: ./recover image \n");
        return 1;
    }

    // open memory card
    FILE *file = fopen(argv[1], "r");

    // check for valid file
    if (file == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    BYTE buffer[BLOCK_SIZE];
    int current_file_number = 0;
    bool is_first_jpeg = false;
    FILE *current_file;

    while (fread(buffer, BLOCK_SIZE, 1, file))
    {
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (!is_first_jpeg)
            {
                is_first_jpeg = true;
            }
            else
            {
                fclose(current_file);
            }

            char current_file_name[FILE_NAME_SIZE];
            sprintf(current_file_name, "%03i.jpg", current_file_number++);
            current_file = fopen(current_file_name, "w");
            if (current_file == NULL)
            {
                return 1;
            }
            fwrite(buffer, BLOCK_SIZE, 1, current_file);
        }
        else if (is_first_jpeg)
        {
            fwrite(buffer, BLOCK_SIZE, 1, current_file);
        }
    }

    fclose(current_file);
    fclose(file);
}