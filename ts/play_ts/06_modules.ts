import { TodoModel } from './06_modules';
import { Person } from './classes';
/*
Internal modules
External modules
*/

function echo<T>(arg:T) {
    return arg;
}

let myStr = echo(1);

class Admin extends Person {
    
}

class Manager extends Person {
    
}

let admin = new Admin('Robert', 'Johnson');
let manager = new Manager('Christopher', 'Jackson');

function personEcho<T extends Person>(person : T) : T {
    return person;
}

let foo = personEcho(admin);
let bar = personEcho(manager);

// Modules

module Cube{
    class property{
    }
}

// Namespaces

namespace Cube{
    
}

namespace app.model.todo {
    // export let counter = 1;
    let counter = 1;
    
    export interface TodoModel {
        id : number;
        text : string;
    }
}

namespace app.model {
    import TodoModel = app.model.todo.TodoModel;
    
    interface User {
        id : number;
        name : string;
        todos : TodoModel[]
    }
}

// DECORATORS

@log
class Physics {
    cube: string;
    constructor(message: string) {
        this.cube = message;
    }
    helloPhysics() {
        return "Hello! " + this.cube;
    }
}

/*
In the previous code, changing the instance where @log was used just before the method "helloPhysics()" will result to example of method decorator.
Similarly, parameter delcaration can also have parameter decorator.
For instance, see the below code snippet:
*/

// @validate
// helloPhysics(@required cube: string) {
// }