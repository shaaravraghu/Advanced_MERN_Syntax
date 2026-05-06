// JavaScript Core + OOPs

// Java is a compiled language whereas JS is interpreted using JIT (Just In Time) compilation
// .java → javac → .class → JVM → Machine Code
// .js → Interpreter → Machine Code (line-by-line)

// Java is statically typed whereas JS is dynamically typed
// In Java, you need to declare the data type of a variable at the time of its creation
// In JS, the data type is determined at runtime based on the assigned value

// Java follows class-based OOPs whereas JS follows prototype-based OOPs
// In Java, classes are blueprints for creating objects
// In JS, objects can inherit properties and methods directly from other objects

// Java: Multi-threading built-in; You explicitly create threads; True parallelism (with limits)
// JavaScript: Single-threaded; Only one call stack; One task at a time

// In Java: Execution always starts at main(), Code outside methods is illegal, Everything belongs to a class
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
// In JS: Execution starts top to bottom, No entry function, Code executes as the file is read
console.log("Hello");

// Java File & Project Structure
// One public class per file, Filename = class name, Strict folder → package mapping
src/
 └── com/app/Main.java
// JavaScript File & Project Structure
// Any number of functions / variables per file, Filename doesn’t control execution, Structure is convention-based, not enforced
src/
 ├── index.js
 ├── utils.js
 └── service.js

// JS uses blocks for loops, conditionals, functions, etc. but can be used standalone also
// JS has automatic semicolon insertion (ASI) but it's good practice to use semicolons
// same variable naming structure in both
// JS is behaviour-first, not declaration-first
// no access modifiers in JS (public, private, protected), no static, final keyword in JS
// Java has strict type checking at compile time, JS has loose type checking at runtime
// Java has checked exceptions, JS has only unchecked exceptions
// Java uses interfaces and abstract classes for abstraction, JS uses prototypes and classes (ES6) for abstraction
// Java has method overloading and overriding, JS only has method overriding
// Java supports generics, JS uses dynamic typing and can simulate generics with JSDoc or TypeScript
// Java has a rich standard library (Java API), JS has a smaller standard library but a vast ecosystem of third-party libraries (npm)
// Java uses JVM for cross-platform compatibility, JS runs in web browsers and Node.js for server-side applications

// var let const
// var (avoid): function-scoped, can be redeclared and updated, hoisted with undefined
// let: block-scoped, cannot be redeclared but can be updated, hoisted but not initialized
// const (default): block-scoped, cannot be redeclared or updated, hoisted but not initialized

// Scope Types
// JS has Global Scope, Function Scope, and Block Scope 
// Java has Class Scope, Method Scope, and Block Scope

// JS variables are dynamically typed, type resolved at runtime, variables can change type
// JS data types: Primitive (number (inclusive of int, float, double), string, boolean, null, undefined, symbol, bigint) and Non-Primitive (object, array, function, dates)
// typeof operator to check data types in JS; undefined: variable declared but not assigned, null: intentional absence of any object value
// primitives are copied by value currently held; objects are copied by reference (by the address)
// NaN (number type) refers to invalid number
// FALSE values: false, -0, 0, "", null, undefined, NaN; everything else is TRUE
// automatic type casting (low to high)
// Operators: +  -  *  /  %  >  <  >=  <=  &&   ||   !
// == (value comparison with type casting) vs === (strict value and type comparison)
// != (value comparison with type casting) vs !== (strict value and type comparison)
// typeof value === value (also will show true if type matches)

// Short-Circuit Patterns
let name = userName || "Guest"; // if userName is falsy, name gets "Guest"
isLoggedIn && showDashboard(); // if isLoggedIn is truthy, showDashboard() is called

// JS Selection Statements
if (condition) {
  // runs if condition is true
} else if (anotherCondition) {
  // runs if the first was false and this is true
} else {
  // runs if all conditions are false
}
switch (value) {
  case 1:
    console.log("one");
    break;
  case 2:
    console.log("two");
    break;
  default:
    console.log("other");
} // must match type and value

// JS Repetition Statements
for (let i = 0; i < 5; i++) {
  console.log(i);
}
while (condition) {}
do {} while (condition);
for (const x of [1,2,3]) { // for...of (values)
  console.log(x);
}
for (const key in { a:1, b:2 }) { // for...in (keys)
  console.log(key);
}
break; continue;

// Functions in JS
function add(a, b) { // has it's own scope, hoisted
  return a + b;
}
const greet = function(name) { //stored in variables, not hoisted the same way
  return "Hello " + name;
};
// Arrow Functions (ES6)
const add = (a, b) => a + b;
const add = (a, b) => { // expanded form
  return a + b;
};
function demo(a, b) { // loose architecture
  console.log(a, b);
}
demo(1);        // b = undefined
demo(1, 2, 3);  // extra ignored
function f() {}
console.log(f()); // undefined
function sayHi() {
  console.log("Hi");
}
let x = sayHi; // assigns function reference to x
x(); // runs function
function test() {
  let x = 10;
}
console.log(x); // ❌ error


// Java Model: Class (blueprint), Object (instance of class), Inheritance, Encapsulation, Polymorphism, Abstraction, Field & Methods are fixed
// JavaScript Model: Object (key-value pairs), Prototype-based Inheritance, Dynamic properties & methods, Flexible structure
// In JS object is a reference to a mutable dictionary stored in memory
Address ──▶ {
  key1 → value1
  key2 → value2
}
// keys are always strings (or symbols), values can be any data type (primitive, object, function, etc.)
let a = { x: 1 };
let b = { x: 1 };
a === b // false
// different identity (over equality) because different memory locations
// objects are mutable
let user = { name: "A" };
user.name = "B";
// Objects are referenced
let obj1 = { a: 1 };
let obj2 = obj1;
obj2.a = 100;
console.log(obj1.a); // 100 😬

// Objects v/s Maps
// Objects: simpler syntax, string keys only, prototype chain, built-in methods may conflict, fast/ common
// Maps: any data type keys, size property, better performance for frequent additions/removals, slower, specialised

// Object Literals
const user = {
  name: "Shaarav",
  age: 20,
  isAdmin: false
};
// New Objects
const obj = new Object();
obj.a = 1;
// Factory Functions
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log("Hi " + name);
    }
  };
}
const u1 = createUser("A", 20);
const u2 = createUser("B", 25);
// Constructor Functions
function User(name, age) { // new creates empty object and sets this to it; links prototype; returns this (object)
  this.name = name;
  this.age = age;
}
const u = new User("A", 20);
// Advanced
const proto = {
  greet() {
    console.log("hello");
  }
};
const obj = Object.create(proto);
obj.name = "A";
// When to use what?
// simple data: {}, reusable objects: factory function, OOPs with identity: constructor function, complex inheritance: class/ constructor, explicit inheritance: Object.create(), legacy code: function prototype









// Ternary Operator: condition ? expr1 : expr2







