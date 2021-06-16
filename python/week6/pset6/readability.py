# Implement a program that computes the approximate grade level needed to comprehend some text

from cs50 import get_string


def main():
    # get user text
    text = get_string("Text: ")

    # get totals from the text
    number_letters = count_letters(text)
    number_words = count_words(text)
    number_sentences = count_sentences(text)

    # get averages
    l = get_average(number_letters, number_words)
    s = get_average(number_sentences, number_words)

    # get Coleman-Liau index
    index = 0.0588 * l - 0.296 * s - 15.8

    # print the response on console
    if index < 1:
        print("Before Grade 1")
    elif index > 1 and index < 16:
        print(f"Grade {round(index)}")
    else:
        print("Grade 16+")
        

def count_letters(text):
    counter = 0

    for i in range(len(text)):
        if text[i].lower() >= 'a' and text[i].lower() <= 'z':
            counter += 1

    return counter
    

def count_words(text):
    counter = 1

    for i in range(len(text)):
        if text[i] == ' ':
            counter += 1

    return counter
    

def count_sentences(text):
    counter = 0

    for i in range(len(text)):
        if text[i] == '.' or text[i] == '!' or text[i] == '?':
            counter += 1

    return counter
    

def get_average(x, y):
    return (x / y) * 100
    

main()