1️⃣ What is the difference between var, let, and const?

Answer: The difference between var, let and const are given below:

var: var is a function scope and reassignable.  var allows variables to be declared repeatedly with the same name and their values ​​to be changed. However, this var is no longer used. The var variable is hosted, that's mean it is allocated space in memory before the code runs (but the value remains undefined).

Example:
var x = 10;
var x = 20; // re-declared with the same name
console.log(x); // output: 20


let: let is block scoped. It cannot be re-declared with the same name, but the value can be changed.

Example: 
let y = 10;
y = 20; // value can be updated
// let y = 30; // if we do this it will show us error
console.log(y); // output: 20

const: const is also block scoped. It is not possible to redeclare or change the value with it (constant). We use const for the data that will never change.

Example:
const z = 10;
// z = 20; // it won't work, because, value of  const can not be changed
console.log(z); // output: 10

2️⃣ What is the spread operator (...)?
Answer:
Spread Operator: (...) this three dots are called spread operator. Spread operator is used to separate all the elements of an array or object.

Example:
In case of Array:
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; // creating a new array by spreading

console.log(newNumbers); //output: [1, 2, 3, 4, 5]

In case of Object:
const person = {name: "SodorUddin", age: 25};
const newPerson = {...person, city: "Dhaka"}; // creating a new object by spreading

console.log(newPerson); //output: {name: "SodorUddin", age: 25, city: "Dhaka"}

3️⃣ What is the difference between map(), filter(), and forEach()?
Answer: The difference between map(), filter(), and forEach() are given below:

#map(): map() operates on each element of the array and returns a new array. map() is generally used to transform the data.

Example:
const numbers = [1, 2, 3, 4];
const result = numbers.map(num => num * 2);
console.log(result); //output: [2, 4, 6, 8]


#filter(): filter() selects some elements according to the condition and returns a new array.  filter() is used to select data.

Example:
const numbers = [5, 12, 8, 20];
const result = numbers.filter(num => num > 10);
console.log(result); //output: [12, 20]

#forEach(): forEach() operates on each element of the array but does not return a new array. forEach() used to operate the loop.

Example:
const numbers = [1, 2, 3];
numbers.forEach(num => {
console.log(num);
});

//output:
1
2
3

4️⃣ What is an arrow function?
Answer:

#Arrow Function: Arrow function is a shortcut way to write the normal function in JavaScript. Arrow functions were added in ES6 in 2015. Arrow functions are wriiten in less code than regular functions and are easier to read.

Example: Here, is a function called add that adds two numbers. This is a normal function in JavaScript:

function add(a, b) {
return a + b;
}
console.log(add(5, 3));

Same function can be written using arrow function:

const add = (a, b) => {   // Here, => this sign is called arrow function
return a + b;
}
console.log(add(5, 3));

Key features:
- Arrow Function is a short syntax for writing functions
- This sign => is used
- Can be written in less code
- Very widely used in modern JavaScript

5️⃣ What are template literals?

Answer:
#Template Literals: Template literals are modern methods to write strings is JavaScript. Template literals are written using template string  (``) symbol, template string is also known as backtick symbol.
Template literal syntax: `text ${variable}`

Temaplate literals makes it easier to add variables and write multi-line than regular strings.

Examples of Template Literals:

#Basic template literals:

const name = "SodorUddin";
console.log(`Hello! ${name}`); //output: Hello! SodorUddin

#Use of Multiple Variables using template literals:

const name = "SodorUddin";
const age = 25;

console.log(`My name is ${name} and I am ${age} years old.`); //output: My name is SodorUddin and I am 25 years old.

#Writing multi-line string using template literals:

const text = `This is line 1
This is line 2
This is line 3`;

console.log(text);
// output:
// This is line 1
// This is line 2
// This is line 3

In a single sentence: Template Literal = Writing modern strings with variables using Backtick.