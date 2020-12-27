// AS SOON https://www.typescriptlang.org/docs/handbook/basic-types.html

// boolean 
let isDone: boolean = false;

// number 

let decimal : number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0x744;
let big: bigint = 100n;

// string

let color: string = "blue";
color = "red";

let fullName : string = `Bob Bobbington`;
let age: number = 37;
let sentence : string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;

// array

let list: number[] = [ 1, 2, 3];
let list2: Array<number> = [ 1, 2, 3];

// tuple 

let x: [string, number];

x = ["hello", 10]

console.log(x[0].substring(1));

// x[3] = "world"

// enum 

enum Color {
    Red = 3,
    Green,
    Blue,
}

let c : Color = Color.Green;
console.log(c)

let colorName: string = Color[4];
console.log(colorName)

// unknown

let notSure: unknown = 4;
notSure = "maybe a string now";
notSure = false;

// any 

declare function getValue(key: string): any;
//const str: string = getValue("myString");

let looselyTyped: any = 4;
// looselyTyped.ifItExists(); // compiler doesn't check if exists
// looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed(); // with unknown compiler checks if exists

let looselyTyped2: any = {};
// let d = looselyTyped2.a.b.c.d;

// void 

function warnUser(): void {
    console.log("This is my warning message.")
}

let unusable: void = undefined;
unusable = null;

// null and undefined

let u: undefined = undefined;
let n: null = null;

// never

function error(message : string){
    throw new Error(message);
}

function fail(){
    return error("Something failed.");
}

function infinityLoop(): never {
    while(true){}    
}

// object

declare function create(o: object | null): void;

// create({ prop: 0})
// create(null);

// create(42);
// create("string");
// create(true);

// type assertions 
// as-syntax
let someValue: unknown = "this is a string";
let strLength : number = (someValue as string).length;

// angle-bracket
let someValue2: unknown = "this is a string";
let strLength2: number = (<string>someValue2).length;

// Number, String, Boolean, Symbol and Object

function reverse(s: string) : string {
    return s.split("").reverse().join("");    
}

console.log(reverse("hello world"));

