// CLASSES AND INTERFACES

// Object Oriented Approach
/*
There are four main principles to Object Oriented Programming :

-- Encapsulation
-- Inheritance
-- Abstraction
-- Polymorphism.
*/


// Classes

// A Class in terms of OOP is a blueprint for creating objects. It includes: fields, constructor and functions. We use "new" keyword to initialize the class object. Example:

class Student{
    name: string;
}

var newClassObject = new Student();

newClassObject = {
    name: "rajesh"
}

// We can define the scope of variable inside classes as public or private. It is important to note that the public or private keywords are only available in TypeScript.

class StudentAdv {
    private firstName: string;  //private members
    private lastName: string;
    yearOfBirth: number;    //Public scope by default
    schoolName: string;
    city: string;
    
    //Constructor            
    constructor(firstName: string, lastName: string, schoolName: string, city: string, yearOfBirth: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.city = city;
        this.schoolName = schoolName;
    }
    
    age() {
        return 2017 - this.yearOfBirth;
    }    
    
    printStudentFullName(): void {
        alert(this.lastName + ',' + this.firstName);
    }
}

// abstract

class Animal {
    private name : string;

    constructor(nameInp : string){
        this.name = nameInp;
    }

    walk(distance : number){
        console.log('I am walking ' + distance + 'mts')
    }
}

let myAnimal = new Animal('Iris')
myAnimal.walk(10);

class Snake extends Animal {
    constructor(nameInp : string){
        super(nameInp)
    }

    walk(distance : number){
        console.log('Snakes do not really walk !')
    }
}

// Interface

interface operateInterface {
    shape : string;
    side? : number;
}

function operate(x : operateInterface){
    return x.side * x.side
}

let calc = operate({shape:'square', side:5})

console.log(calc)

// Interface helps in detecting error in compile time.

interface Volume {
    length: number;
    width: number;
    sayHi: () => string;
}

//Volume binding object Physics to define all members as specified by interface 
var Physics: Volume = {
    length: 10,
    width: "ten",
    sayHi: (): string => { return "Hello" }
}

interface player{
    run():void;
    addLives(n:number):void;
    score():number
}

function createPlayer():player{
    return {
        run : function(){},
        addLives : function(n:number){},
        score : function(){ return 2}
    }
}

let player1 = createPlayer()