# OBJECT ORIENTED PROGRAMMING WITH PYTHON

# Python is a great programming language that supports OOP. You will use it to define a class with attributes and methods, which you will then call. Python offers a number of benefits compared to other programming languages like Java, C++ or R. It's a dynamic language, with high-level data types. This means that development happens much faster than with Java or C++. It does not require the programmer to declare types of variables and arguments. This also makes Python easier to understand and learn for beginners, its code being more readable and intuitive.

class Student:
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade

    def get_grade(self):
        return self.grade

class Course:
    def __init__(self, name, max_students):
        self.name = name
        self.max_students = max_students
        self.students = []
    
    def add_student(self, student):
        if len(self.students) < self.max_students:
            self.students.append(student)
            return True
        else:
            return False
    
    def get_average(self):
        value = 0
        for student in self.students:
            value += student.get_grade()

        return value / len(self.students)

s1 = Student('Tim', 19, 95)
s2 = Student('Tim', 18, 75)
s3 = Student('Tim', 19, 65)

course = Course('Science', 2)
course.add_student(s1)
course.add_student(s2)

print(course.get_average())

# INHERITANCE

class Pet:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show(self):
        print(f'I am {self.name} and I am {self.age} years old.')

class Cat(Pet):
    def __init__(self, name, age, color):
        super().__init__(name, age)
        self.color = color
    
    def speak(self):
        print('Meow')

    def show(self):
        print(f'I am {self.name} and I am {self.age} years old and I am {self.color}.')


class Dog(Pet):
    def speak(self):
        print('Bark')

p = Pet('Tim', 19)
p.show()

c = Cat('Bill', 34, 'Black')
c.show()

d = Dog('Jim', 12)
d.show()

# CLASS ATTRIBUTES & CLASS METHODS

class Person:
    number_of_people = 0

    def __init__(self, name):
        self.name = name
        Person.add_person()

    @classmethod
    def number_of_people_(cls):
        return cls.number_of_people

    @classmethod
    def add_person(cls):
        cls.number_of_people += 1

p1 = Person('tim')
p2 = Person('jill')

print(Person.number_of_people_())

# STATIC METHODS

class Math:
    
    @staticmethod
    def add_five(x):
        return x + 5
    
    @staticmethod
    def add_ten(x):
        return x + 10

print(Math.add_five(5))
