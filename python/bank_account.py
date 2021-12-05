class BankAccount:
    """
    Simple BankAccount class to manage bank accounts.
    """
    id = 1
    
    def __init__(self, name):
        self.account_number = self.id
        BankAccount.id += 1
        self.name = name
        self.balance = 0

    def deposit(self, amount ):
        self.balance += amount

    def withdrawal(self, amount):
        self.balance -= amount

    def data(self):
        return f"Name: {self.name} \nAccount number: {self.account_number}\nBalance:$ {self.balance} \n"

    def transfer(self, cta, amount):
        self.withdrawal(amount)
        cta.deposit(amount)


c1 = BankAccount("Alan")
c1.deposit(10000)
c1.withdrawal(5000)
print(c1.data())

c2 = BankAccount(input("Enter your name: "))
c2.deposit(float(input("Enter your deposit amount: ")))
print(c2.data())

c1.transfer( c2, float(input("Enter the amount you want to transfer from acc #1 to acc #2: $")))
print(c1.data())
print(c2.data())