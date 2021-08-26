// STACKS

let letters = [];  // this is a stack

let word = 'racecar';
let rword = '';

// put the letters of word into stack

for(let i = 0; i < word.length; i++){
	letters.push(word[i]);
}

// pop off the stack in reverse order

for(let i = 0; i < word.length; i++){
	rword += letters.pop();
}

console.log(rword);

if(rword === word){
	console.log(word + ' is a palindrome.');
}else{
	console.log(word + ' is not a palindrome.');
}

// CREATE A STACK

class Stack{

	constructor(){
		this.count = 0;
		this.storage = {};
	}

	// adds a value onto the end of the stack
	push = (value) => {
		this.storage[this.count] = value;
		this.count++;
	}

	// removes and return the values at the end of the stack
	pop = () => {
		if(this.count === 0){
			return undefined;
		}
		this.count--;
		let result = this.storage[this.count];
		delete this.storage[this.count];
		return result;
	}

	size = () => {
		return this.count;
	}

	// returns the value at the end of the stack
	peek = () => {
		return this.storage[this.count-1];
	}
}

let myStack = new Stack()

myStack.push(1);
myStack.push(2);

console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());