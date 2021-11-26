/*
Type System

Static Type Checking : Static Type Checking is done at compile time. The type of variable should be declared before using them. Examples of programming languages using Static Type Checking are C, C++, JAVA, C#, Fortran, Pascal, Scala etc.
Dynamic Type Checking : is done at run time. We do not have to declare the type of variables. The compiler automatically detects the type. Examples are JavaScript, Python, VBScript etc.

Benefits of Dynamic Type Checking

-- Dynamic code evaluation
-- DOM manipulation
-- Validation from DBs / data stores
-- User inputs

Strong and Weak typed languages

Object Model

*/

// Defining variables

var num : number = 3;
let list : number[] = [1,2,3]

var a : string;

// Defining functions

let myAdd = ( x: number , y: number): number => { return x+y; }; 


// optional parameter by adding “?”

var addFunction = (n1: number, n2: number, n3?: number) : number => {
    //observe "?" in parameter n3
    //Optional parameter has to be the last parameter in the list 
    return 1;
}
var sum = addFunction(10, 20);	//output: 30

// Defining objects

interface Point2D {
    x: number;
    y: number;
}

var point2D: Point2D = { x: 0, y: 10 }