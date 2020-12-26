interface User {
    name: string,
    id: number;
}

const user: User = {
    name: "Hayes",
    id: 0,
}

class UserAccount {
    name: string;
    id: number;

    constructor( name : string, id: number){
        this.name = name;
        this.id = id;
    }
}

const user2 : User = new UserAccount("Murphy", 1)


function getAdminUser(): User {
    return null;
}

function deleteUser(user: User){
    return user;
}

deleteUser(user);

// composing types:

type MyBool = true | false;

let newNumber : MyBool = true;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]){
    return obj.length;
}

getLength(["7"]);

function wrapInArray(obj: string | string[]){
    if(typeof obj === "string"){
        return [obj];
    }else{
        return obj;
    }
}

console.log(wrapInArray(["6"]))

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string}>;

let firstArr : StringArray = ["Hi"];
let objArr : ObjectWithNameArray = [{ name : "Pepe"}];

interface Backpack<Type> {
    add : (obj : Type) => void;
    get: () => Type;
}

//declare const backpack : Backpack<string>;

//const object = backpack.get();

//backpack.add("23");

// STRUCTURAL TYPE SYSTEM 

interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point){
    console.log(`${p.x}, ${p.y}`);
}

const point = { x : 12, y : 26};

printPoint(point);

const point3 = { x: 12, y: 26, z: 89};
printPoint(point3)

const rect = { x: 33, y: 3, width: 30, height: 80};
printPoint(rect);

const color = { hex : "#187ABF"};
printPoint(color);

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;        
    }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint);