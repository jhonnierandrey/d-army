// STRING METHODS

let stringOne = 'Hello world, welcome to the jungle';
let stringTwo = 'Where is the people?';


console.log(stringOne.charAt(1));

console.log(stringOne.charCodeAt(1));

console.log(stringOne.concat(stringTwo));

console.log(stringOne.endsWith('jungle'));

console.log(String.fromCharCode(114));

//

console.log(stringOne.includes('to'));

console.log(stringOne.indexOf('to'));

console.log(stringOne.lastIndexOf('to'));

console.log(stringOne.match(/the/g));

console.log(stringOne.repeat(3));

//

console.log(stringOne.replace(/to/, 'TO'));

console.log(stringOne.search('welcome'));

console.log(stringOne.slice(2, 4));

console.log(stringOne.split(' '));

console.log(stringOne.startsWith('Hello'));

//

console.log(stringOne.substr(2, 4));

console.log(stringOne.substring(2, 4));

console.log(stringOne.toLowerCase());

console.log(stringOne.toUpperCase());

let newString = '    Hello you!    ';

console.log(newString.trim());

