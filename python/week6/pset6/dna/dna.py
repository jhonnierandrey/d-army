# Implement a program that identifies a person based on their DNA

import csv
import sys

# Open CSV file and DNA sequence, read contents into memory
# For each STR, compute the longest run of consecutive repeats in the DNA sequence.
# Compare the STR counts against each row in the CSV file.

def main():
    # check command-line arguments
    if len(sys.argv) != 3:
        sys.exit("Usage: python dna.py databases/large.csv sequences/5.txt")

    # open the CSV file and read its contents into memory
    csv_file = open(sys.argv[1], 'r')

    strs = []
    persons = {}

    for index, row in enumerate(csv_file):
        if index == 0:
            strs = [str for str in row.strip().split(',')][1:]
        else:
            curr_row = row.strip().split(',')
            persons[curr_row[0]] = [int(x) for x in curr_row[1:]]

    # open the txt file
    dna_stands = open(sys.argv[2], 'r').read()

    final_strs = []

    for str in strs:
        i = 0
        max_str = -1
        cur_max = 0

        while i < len(dna_stands):
            cur_window = dna_stands[i:i + len(str)]
            if cur_window == str:
                cur_max += 1
                max_str = max(max_str, cur_max)
                i += len(str)
            else:
                cur_max = 0
                i += 1

        final_strs.append(max_str)

    for name, data in persons.items():
        if data == final_strs:
            print(name)
            sys.exit(1)
    
    print("No match")

main()