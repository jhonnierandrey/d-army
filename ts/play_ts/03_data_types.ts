// Data Types

// ANY

var valueA: any = 30;  //can take string, number, boolean anything

// Built-in Types
// Built-in types in Typescript are number, string, boolean, null, undefined, and void.

var valueB: string = "john"; //can take only string values

// Difference between null and undefined

// null - variable is set to an object whose value is undefined (empty)
// undefined - variable has no value or object assigned to it.

// User-defined
// User-defined types include enums, classes, interfaces, arrays etc.

interface ToDo {
    name: string,
    completed?: boolean; 
    // ? tells that 'completed' is optional property, user need not give value
}

let todo: ToDo = {
    name: 'some string',
}

/*
Try it out with Types
Create a function "arrLength" that takes string array as input, calculate number of elements present in it and return it.

Use the function to find out the length of the array ["hi", "there"] and [1,5,4].

Define proper types as and when required.
*/

function arrLength(inputString:string[] | number[]){
    return inputString.length;
}

let arrA: string[] = ["hi", "there"]
let arrB: number[] = [1,5,4]

console.log(arrLength(arrA));
console.log(arrLength(arrB));

// Generics
// Generics are templates allowing the same function to accept arguments of various different types.
// You can implement Generics by writing "T" instead of any specific data type like- number, boolean etc. as shown below.

function calVolumeCube<T>(side: T) {
    return [side, side, side];
}

let volumeA : number[] = calVolumeCube<number>(5);
let volumeB : number[] = calVolumeCube(5);
let volumeC : string[] = calVolumeCube<string>("hello");

console.log(volumeA)
console.log(volumeB)
console.log(volumeC)

// Generics vs Any

function identity<T>(arg: T): T {
    return arg;
}

/*
While any might look like generic, as that accepts any and all types of values for variable "arg", we are actually losing the information about what that type was when the function returns.
If we pass in a number, the only information we have is that any type could be returned.

In contrast, Generics knows which type of data is to be returned.
*/

// Enums
/*
Enum is a way to organize set of related values. Enum members have numeric value associated with them and can be either constant or computed. By default first member of enum is assigned value 0 (zero). Then each subsequent member is assigned value incremented by 1 automatically.
*/

enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}
// Sample usage
var card = CardSuit.Hearts;
console.log(`Card value= ${card}`);
// Safety
// card = "some string"; // Error : string is not assignable to type CardSuit

enum expressions {
    pi = 3.14,
    e = 2.73,
    log2 = 0.3,
    log5 = 0.7
}

console.log('Finding the circumference of circle');

let radius : number = 10;

console.log(2 * expressions.pi * radius );