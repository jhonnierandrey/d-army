# Implement a program that identifies a person based on their DNA

import csv
import sys

# Open CSV file and DNA sequence, read contents into memory
# For each STR, compute the longest run of consecutive repeats in the DNA sequence.
# Compare the STR counts against each row in the CSV file.


if len(sys.argv) != 3:
    sys.exit("Usage: python dna.py databases/large.csv sequences/5.txt")

csv_file = open(sys.argv[1], 'r')

strands = []
persons = {}

for ind, row in enumerate(csv_file):
    if ind == 0:
        strands = [strand for strand in row.strip().split(',')][1:]
    else:
        curr_row = row.strip().split(',')
        persons[curr_row[0]] = [int(x) for x in curr_row[1:]]

dna_stands = open(sys.argv[2], 'r').read()

final_strands = []

for strand in strands:
    i = 0
    max_strand = -1
    cur_max = 0

    while i < len(dna_stands):
        cur_window = dna_stands[i:i + len(strand)]
        if cur_window == strand:
            cur_max += 1
            max_strand = max(max_strand, cur_max)
            i += len(strand)
        else:
            cur_max = 0
            i += 1

    final_strands.append(max_strand)

for name, data in persons.items():
    if data == final_strands:
        print(name)
        sys.exit(1)


print("No match")

# print(strands)
# print(persons)
# print(final_strands)