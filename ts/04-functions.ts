//  AS SEEN ON https://www.typescriptlang.org/docs/handbook/functions.html

    // named function 
function add( x, y){
    return x + y;
}

    //anonymous function 
let myAdd = function (x, y) {
    return x + y;
}

// FUNCTION TYPES

function add2( x: number, y: number): number {
    return x + y;
}

let myAdd2 = function (x: number, y : number){
    return x + y;
}

// WRITING THE FUNCTION TYPE

let myAdd3 : (x: number, y: number) => number = function (
    x : number,
    y: number
): number {
    return x + y;
};

let myAdd4 : ( baseValue: number, increment: number) => number = function (
    x: number,
    y: number
): number {
    return x + y;
};

// INFERRING THE TYPES

let myAdd5 = function (x:number, y: number): number {
    return x + y;
}

let myAdd6 : ( baseValue: number, increment : number) => number = function (x, y){
    return x + y;
}

console.log(myAdd6(2,3));

// OPTIONAL AND DEFAULT PARAMETERS

function buildName(firstName:string, lastName?: string) {
    if(lastName) return `${firstName} ${lastName}`;
    else return firstName;
}

let result1 = buildName("Bob");
let result2 = buildName("Bob", "Adams", "Sr.");
let result3 = buildName("Bob", "Adams");

console.log(result1, result2, result3)
    // default values
function buildName2(firstName:string, lastName = "Smith") {
    return `${firstName} ${lastName}`;
}

let result4 = buildName2("Bob");

console.log(result4)

// REST PARAMETERS

function buildName3(firstName:string, ...restOfName: string[]) {
    return `${firstName} ${restOfName.join(' ')}`;
}

let employeeName = buildName3("Joseph", "Samuel", "Lucas", "Mackinzie");

console.log(employeeName)

let buildNameFun : (fname: string, ...rest:string[]) => string = buildName3;

// THIS
    //this and arrow functions
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck){
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13};
        };
    },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// THIS PARAMETERS

function f(this:void) {
    // makes 'this' unusable in this function
}

    // this parameters in callbacks

interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event){
        // this.info = e.message;
        console.log('clicked!');
    }
}

let h = new Handler();
// uiElement.addClickListener(h.onClickBad);

// OVERLOADS

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: any): any {
    if( typeof x == "object"){
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if( typeof x == "number"){
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13};
    }
}

let myDeck = [
    { suit: "diamonds", card: 2},
    { suit: "spades", card: 10},
    { suit: "hearts", card: 4},
];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);