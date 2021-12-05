import time

class Tamagotchi:
    t = time.time()
    def __init__( self, name, hungry, stamina, energy):
        self.name = name
        self.hungry = hungry
        self.stamina = stamina
        self.energy = energy

    def play(self):
        self.stamina += 2
        self.energy -= 1

    def feed(self):
        self.stamina += 1
        self.hungry -= 2

    def sleep(self):
        self.hungry += 1
        self.energy += 2
    
    def lapse(self):
        t1 = time.time()
        time_ = int( t1 - Tamagotchi.t )

        self.stamina -= time_
        self.hungry += time_
        self.energy -= time_
        Tamagotchi.t = t1
        print(f"Total time : { time_ }")

    def status(self):
       return (f"Name: {self.name}\nStatus:\nHungry: {self.hungry} | Stamina: {self.stamina} | Energy: {self.energy} ") 

# Main App

t = Tamagotchi('Tamagotchi 1', 10, 100, 100)

print(t.status())
print("Options:\n1: play\n2: feed: \n3: sleep")

option=int(input("Choose one option or press 0 to exit: "))

while option !=0 and t.hungry >= 0 and t.hungry < 100 and t.stamina > 0 and t.energy > 0:
    if option==1:
        t.play()
    elif option==2:
        t.feed()
    elif option==3:
        t.sleep()
    else:
        print("Invalid option.")
    t.lapse()
    print(t.status())
    if  t.hungry >= 0 and  t.hungry < 100 and t.stamina > 0 and t.energy > 0:
        print("Options:\n1: play\n2: feed: \n3: sleep")
        option=int(input("Choose one option or press 0 to exit: "))

if option != 0:
    print("Game Over")