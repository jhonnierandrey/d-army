#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // get average
            float average = (image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.00;
            int roundedAver = round(average);

            // return new image with new values
            image[i][j].rgbtRed = roundedAver;
            image[i][j].rgbtGreen = roundedAver;
            image[i][j].rgbtBlue = roundedAver;
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
        for (int j = 0; j < width; j++)
        {
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
                    if (i + k < 0 || i + k > height - 1 || j + l < 0 || j + l  > width - 1)
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

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE temp[height][width];

    // sobel operator axis
    int gx[3][3] =
    {
        {-1, 0, 1},
        {-2, 0, 2},
        {-1, 0, 1}
    };

    int gy[3][3] =
    {
        {-1, -2, -1},
        {0, 0, 0},
        {1, 2, 1}
    };

    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            // coordinates
            int rowCoords[] = { row - 1, row, row + 1};
            int colCoords[] = { col - 1, col, col + 1};

            // axis
            float gx_red = 0, gx_green = 0, gx_blue = 0;
            float gy_red = 0, gy_green = 0, gy_blue = 0;

            for (int r = 0; r < 3; r++)
            {
                for (int c = 0; c < 3; c++)
                {
                    int curRow = rowCoords[r];
                    int curCol = colCoords[c];

                    if (curRow >= 0 && curRow < height && curCol >= 0 && curCol < width)
                    {
                        RGBTRIPLE pixel = image[curRow][curCol];

                        //  updating X axis
                        gx_red += gx[r][c] * pixel.rgbtRed;
                        gx_green += gx[r][c] * pixel.rgbtGreen;
                        gx_blue += gx[r][c] * pixel.rgbtBlue;

                        //  updating Y axis
                        gy_red += gy[r][c] * pixel.rgbtRed;
                        gy_green += gy[r][c] * pixel.rgbtGreen;
                        gy_blue += gy[r][c] * pixel.rgbtBlue;
                    }
                }
            }

            // calculating algorithm
            int totalReds = round(sqrt(gx_red * gx_red + gy_red * gy_red));
            int totalGreens = round(sqrt(gx_green * gx_green + gy_green * gy_green));
            int totalBlues = round(sqrt(gx_blue * gx_blue + gy_blue * gy_blue));
            
            // setting up temporary total
            temp[row][col].rgbtRed = totalReds > 255 ? 255 : totalReds;
            temp[row][col].rgbtGreen = totalGreens > 255 ? 255 : totalGreens;
            temp[row][col].rgbtBlue = totalBlues > 255 ? 255 : totalBlues;
        }
    }

    // moving from temp to new file
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j] = temp[i][j];
        }
    }
    
    return;
}
