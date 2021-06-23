from os import system

print('1. Ping Google')
print('2. Ping Yahoo')
print('3. Ping custom URL')

key = int(input('Input your choice: '))

if key == 1:
        system("ping www.google.com")
elif key == 2:
        system("ping www.yahoo.com")
elif key == 3:
        url = input('Enter URL: ')
        system("ping " + url)
else:
        print("Invalid Option!")