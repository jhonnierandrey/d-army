//  AS SEEN ON https://www.typescriptlang.org/docs/handbook/literal-types.html

// LITERAL NARROWING

const helloWorld = "Hello World";

let hiWorld = "Hi World";

// STRING LITERAL TYPES 

type Easing = "ease-in" | "ease-out" | "ease-in-out";

class IUElement {
    animate(dx: number, dy: number, easing: Easing){
        if(easing === "ease-in"){
            // ...
        }else if(easing === "ease-out"){

        }else if(easing === "ease-in-out"){

        }else{

        }
    }
}

let button = new IUElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy");

function createElement(tagName:"img"): HTMLImageElement { return;};
function createElement2(tagName: "input"): HTMLInputElement { return;};
function createElement3(tagName: string): Element { return;}

// NUMERIC LITERAL TYPES

function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();

console.log(result);

interface MapConfig {
    lng: number;
    lat: number;
    tileSize: 8 | 16 | 32;
}
function setupMap(obj : MapConfig) {
    return;
}
setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16});

// BOOLEAN LITERAL TYPES

interface ValidationSuccess {
    isValid: true;
    reason: null;
}

interface ValidationFailure {
    isValid: false;
    reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;