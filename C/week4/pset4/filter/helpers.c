#include "helpers.h"
#include <stdio.h>
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // get average 
            int average = image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue;

            // return new image with new values
            image[i][j].rgbtRed = round(average / 3);
            image[i][j].rgbtGreen = round(average / 3);
            image[i][j].rgbtBlue = round(average / 3);
        }
    }
    
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // calculate sepia values
            int sepiaRed = .393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue;
            int sepiaGreen = .349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue;
            int sepiaBlue = .272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue;

            if(sepiaRed > 255)
            {
                sepiaRed = 255;
            }
            if(sepiaGreen > 255)
            {
                sepiaGreen = 255;
            }
            if(sepiaBlue > 255)
            {
                sepiaBlue = 255;
            }
            // return new image with new values
            image[i][j].rgbtRed = round(sepiaRed);
            image[i][j].rgbtGreen = round(sepiaGreen);
            image[i][j].rgbtBlue = round(sepiaBlue);
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        // temporary var
        RGBTRIPLE temp[width];

        // get last part
        for (int j = 0; j < width; j++) {
            // temp[width - 1 - j] = arr[j];
            temp[width - 1 - j].rgbtRed = image[i][j].rgbtRed;
            temp[width - 1 - j].rgbtGreen = image[i][j].rgbtGreen;
            temp[width - 1 - j].rgbtBlue = image[i][j].rgbtBlue;
        }

        // put last part at the beggining 
        for (int k = 0; k < width; k++)
        {
            image[i][k].rgbtRed = temp[k].rgbtRed;
            image[i][k].rgbtGreen = temp[k].rgbtGreen;
            image[i][k].rgbtBlue = temp[k].rgbtBlue;
        }
        
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE temp[height][width];

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int totalBlues = 0;
            int totalReds = 0;
            int totalGreens = 0;
            float counter = 0;

            for (int k = -1; k < 2; k++)
            {
                for (int l = -1; l < 2; l++)
                {
                    if(i + k < 0 || i + k > height -1 || j + l > width - 1 )
                    {
                        continue;
                    }

                    totalReds += image[i + k][j + l].rgbtRed;
                    totalGreens += image[i + k][j + l].rgbtGreen;
                    totalBlues += image[i + k][j + l].rgbtBlue;

                    counter++;
                }
                
            }

            temp[i][j].rgbtRed = round(totalReds / counter);
            temp[i][j].rgbtGreen = round(totalGreens / counter);
            temp[i][j].rgbtBlue = round(totalBlues / counter);
        }
        
    }

    for (int m = 0; m < height; m++)
    {
        for (int n = 0; n < width; n++)
        {
            image[m][n].rgbtRed = temp[m][n].rgbtRed;
            image[m][n].rgbtGreen = temp[m][n].rgbtGreen;
            image[m][n].rgbtBlue = temp[m][n].rgbtBlue;
        }
        
    }
    
    

    return;
}