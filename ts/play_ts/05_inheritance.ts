// Inheritance

// JavaScript uses prototypical inheritance instead of classical inheritance.
// TypeScript allows us to inherit from existing classes according to need. Here is a code snippet to explain:

class Cube {
    length: number;
    constructor(length : number) {
        this.length = length;
    }
}
class Physics extends Cube {
    color: string;
    constructor(length: number, color: string) {
        super(length);
        this.color = color;
    }
}
var obj = new Physics(10, "yellow");

class Person {
    constructor(name){
        console.log(name + ' Person constructor.');
    }
    getID(){
        return 10;
    }
}

class Employee extends Person {
    constructor(name){
        super(name);
        console.log(name + ' Employee constructor');
    }
    getID(){
        // return 50;
        return super.getID()
    }
}

let e = new Employee('Chandler');
console.log(e.getID());

// Polymorphism - Overloading

// Is there any overloading in JavaScript?
// Yes, function overloading is possible in TypeScript. The following code snippet will demonstrate how:

class Length{
    Length(length: number);
    Length(length:string);
    Length(value: any) {
        if (value && typeof value == "number") {
            console.log("overload 1");
        }
        if (value && typeof value == "string") {
            console.log("overload 2");
        }
    }
}

let leA = new Length();

console.log(leA.Length('large'))
console.log(leA.Length(6))

function areaOfQuad(side1:number);
function areaOfQuad(side1:number, side2:number);
function areaOfQuad(side1:number, side2:number, side3:number);
function areaOfQuad(side1:number, side2:number, side3:number, side4:number);

function areaOfQuad(side1:number, side2?:number, side3?:number, side4?:number){
    if(side2 === undefined && side3 === undefined && side4 === undefined){
        side2 = side3 = side1;
        return side1 * side2;
    }else if(side3 === undefined && side4 === undefined){
        side3 = side1;
        side4 = side2;
        return side1 * side2;
    }
    
    return -1;
}

console.log(areaOfQuad(1)); // square
console.log(areaOfQuad(1, 2));  // rectangle
console.log(areaOfQuad(1, 2, 3, 4));   // trapezium

// Polymorphism - Overriding

// Method Overriding is a mechanism by which the child class redefines the superclass’s method.
// The following code snippet will demonstrate how:

class PrinterClass {
    doPrint():void {
        console.log("doPrint() from Parent called…") 
    }
}

class StringPrinter extends PrinterClass { 
    doPrint():void { 
        super.doPrint() 
        console.log("doPrint() is printing a string…")
    }
}

var objB = new StringPrinter() 
objB.doPrint()