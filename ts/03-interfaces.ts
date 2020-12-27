// AS SEEN ON https://www.typescriptlang.org/docs/handbook/interfaces.html

// first interface
interface LabeledValue {
    label : string;
}

function printLabel(labeledObj: LabeledValue){
    console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object"};

printLabel(myObj);

// optional properties

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config : SquareConfig) {
    let newSquare = { color : "white", area: 100};

    if(config.color){
        newSquare.color = config.color;
    }
    if(config.width){
        newSquare.area = config.width * config.width;
    }

    return newSquare;
}

let mySquare = createSquare({ color: "black"});

console.log(mySquare)

// readonly properties

interface Point {
    readonly x : number;
    readonly y : number;
}

let p1: Point = { x: 10, y: 20};
// p1.x = 5; // error, read-only property

let a: number[] = [ 1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 2; // error, read-only array
// ro.push(6)
//a = ro;

a = ro as number[];

// readonly vs const 
// readonly for properties
// const for variables

// Excess property checks

interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName : string] : any;
}

function createSquare2( config: SquareConfig2): { color: string; area : number}{
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20
    };
}

let mySquare2 = createSquare2({ colour : "red", width: 100}); // error because spelling of "color"

let mySquare3 = createSquare2({ width : 100, opacity: 0.5} as SquareConfig2);

console.log(mySquare3);

let squareOptions = { color : "red", width : 100};
let mySquare4 = createSquare2(squareOptions);
console.log(mySquare4);

// Function types

interface SearchFunc {
    (source: string, subString : string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (src, sub){
    let result = src.search(sub);
    return result > -1;
}

console.log(mySearch("Hello how are you", "a"))

// Indexable types

interface StringArray {
    [index : number]: string;
}

let myArray : StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

console.log(myStr);

interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

interface NotOkay {
    //[x: number] : Animal;
    [x: string] : Dog;
}

interface NumberDictionary {
    [index: string]: number | string;
    length: number;
    name: string;
}

interface ReadOnlyStringArray {
    readonly [index: number]: string;
}

let myArray2 : ReadOnlyStringArray = ["Alice", "Bob"];
//myArray2[2] = "Mallory"; // readonly array

// Class types

// interface ClockInterface {
//     currentTime : Date;
//     setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//     currentTime: Date = new Date();
//     setTime(d: Date){
//         this.currentTime = d;
//     }
//     constructor(h: number, m: number) {}
// }

interface ClockConstructor {
    new (hour : number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick() : void;
}

function createClock(
    ctor : ClockConstructor,
    hour : number,
    minute : number
): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface{
    constructor(h: number, m: number){}
    tick(){
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h:number, m: number) {}
    tick(){
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

console.log(digital);
console.log(analog);

// class Clock2 implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number){}
// }

// Extending Interfaces 

interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength : number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

console.log(square);


// Hybrid types

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function (start: number){} as Counter;
    counter.interval = 123;
    counter.reset = function (){};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// Interfaces Extending classes

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select(){}
}

class TextBox extends Control {
    select(){}
}

class ImageControl implements SelectableControl {
    private state : any;
    select(){}
}

