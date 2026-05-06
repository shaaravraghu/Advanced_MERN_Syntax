# Comprehensive TypeScript Developer Guide: From Basics to Advanced Patterns

Welcome to the definitive TypeScript study guide. This document is designed to take you from understanding the basic concepts of TypeScript to mastering advanced typing patterns. It is written for developers looking for depth through coverage, practical examples, and production-ready best practices.

---

## Table of Contents
1. [Introduction to TypeScript](#1-introduction-to-typescript)
2. [Setup and Configuration](#2-setup-and-configuration)
3. [Basic Types](#3-basic-types)
4. [Type Inference and Annotations](#4-type-inference-and-annotations)
5. [Functions](#5-functions)
6. [Objects and Interfaces](#6-objects-and-interfaces)
7. [Type Aliases](#7-type-aliases)
8. [Arrays and Tuples](#8-arrays-and-tuples)
9. [Enums](#9-enums)
10. [Union and Intersection Types](#10-union-and-intersection-types)
11. [Generics](#11-generics)
12. [Classes in TypeScript](#12-classes-in-typescript)
13. [Modules](#13-modules)
14. [TypeScript with JavaScript Libraries](#14-typescript-with-javascript-libraries)
15. [Error Handling](#15-error-handling)
16. [Best Practices](#16-best-practices)
17. [Common Mistakes](#17-common-mistakes)
18. [Real-world Examples](#18-real-world-examples)

---

## 1. Introduction to TypeScript

### What is TypeScript?
TypeScript is a strongly typed, object-oriented, compiled language developed and maintained by Microsoft. It is a **strict syntactical superset of JavaScript**, which means any valid JavaScript code is also valid TypeScript code. TypeScript adds optional static typing to the language.

### Why use TypeScript over JavaScript?
1. **Early Bug Detection**: Catch errors at compile-time rather than runtime. Type checking prevents common errors like typos in property names or passing the wrong type of arguments to functions.
2. **Enhanced IDE Support**: Because of static types, IDEs (like VS Code) can provide richer auto-completion, safer refactoring, and inline documentation.
3. **Self-Documenting Code**: Types serve as a form of documentation that is guaranteed to be up-to-date, making large codebases easier to understand and maintain.
4. **Latest JavaScript Features**: TypeScript compiler (`tsc`) can transpile newer JavaScript features (ES6+) down to older versions (ES5) for broader browser compatibility.

### TypeScript vs JavaScript
| Feature | JavaScript | TypeScript |
| :--- | :--- | :--- |
| **Typing** | Dynamic Typing (resolved at runtime) | Static Typing (resolved at compile-time) |
| **Compilation** | Interpreted directly by the browser/engine | Must be compiled to JS before execution |
| **Error Checking**| Errors discovered during execution | Errors discovered during compilation |
| **Learning Curve**| Lower | Higher, requires understanding of type systems |

---

## 2. Setup and Configuration

### Installing TypeScript
To use TypeScript, you need Node.js installed. You can install TypeScript globally, but it is generally recommended to install it locally in your project as a development dependency.

```bash
# Initialize a new Node.js project
npm init -y

# Install TypeScript as a dev dependency
npm install typescript --save-dev

# Optionally install ts-node to run TS files directly without manual compilation
npm install ts-node --save-dev
```

### `tsconfig.json` Basics
The `tsconfig.json` file is the heart of a TypeScript project. It specifies the root files and the compiler options required to compile the project. You can generate one using:

```bash
npx tsc --init
```

Here is an example of a robust, modern `tsconfig.json`:

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2022",           // Defines the JavaScript version to compile to
    "module": "CommonJS",         // Module system (CommonJS for Node, ESNext for front-end bundlers)
    "lib": ["ES2022", "DOM"],     // Included library definitions (DOM for browser apps)
    
    /* Modules */
    "rootDir": "./src",           // The root folder of your TS source files
    "outDir": "./dist",           // Where to output the compiled JS files
    "esModuleInterop": true,      // Enables default imports for CommonJS modules
    "forceConsistentCasingInFileNames": true, // Case sensitivity for file imports
    
    /* Strict Type-Checking Options */
    "strict": true,               // Enables all strict type checking options
    "noImplicitAny": true,        // Raise error on expressions with implied 'any' type
    "strictNullChecks": true,     // Checks for null and undefined
    "strictFunctionTypes": true,  // Checks function parameters strictly
    
    /* Completeness */
    "skipLibCheck": true          // Skip type checking of declaration files (speeds up compilation)
  },
  "include": ["src/**/*"],        // Which files to compile
  "exclude": ["node_modules", "**/*.spec.ts"] // Files to ignore
}
```

---

## 3. Basic Types

TypeScript provides several basic types that map directly to JavaScript primitives, along with a few special types.

### Primitives: `number`, `string`, `boolean`
Unlike some languages, TypeScript doesn't differentiate between integers and floats; everything is a `number`.

```typescript
let age: number = 28;
let temperature: number = -5.5;
let hex: number = 0xf00d;

let firstName: string = "Alice";
let greeting: string = `Hello, ${firstName}!`; // Template literals work normally

let isPublished: boolean = true;
let isEnabled: boolean = false;
```

### `any`, `unknown`, `void`, `never`

#### `any`
The `any` type completely disables type checking for a variable. It should be used sparingly, mostly when migrating from JS or dealing with dynamic 3rd-party untyped libraries.

```typescript
let looselyTyped: any = 4;
looselyTyped = "Now I am a string";
looselyTyped.ifItExists(); // No compile error, but will throw at runtime!
```

#### `unknown`
`unknown` is the type-safe counterpart of `any`. You can assign anything to `unknown`, but you **cannot** perform operations on it without first asserting or narrowing its type.

```typescript
let safeUnknown: unknown = "Hello World";

// safeUnknown.toUpperCase(); // Error: Object is of type 'unknown'

// Type narrowing required:
if (typeof safeUnknown === "string") {
  console.log(safeUnknown.toUpperCase()); // Works!
}
```

#### `void`
`void` is used for functions that do not return a value.

```typescript
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}
```

#### `never`
`never` represents the type of values that never occur. This is typically the return type for functions that always throw an error or contain infinite loops.

```typescript
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function infiniteLoop(): never {
  while (true) {
    // do something infinitely
  }
}
```

---

## 4. Type Inference and Annotations

### Type Inference
TypeScript is smart enough to infer types in many cases, meaning you don't always need explicit type annotations.

```typescript
// Type inferred as string
let message = "Hello World"; 
// message = 42; // Error: Type 'number' is not assignable to type 'string'.

// Inferred as number[]
let numbers = [1, 2, 3]; 

// Return type inferred as number
function addSimple(a: number, b: number) {
  return a + b; 
}
```

### Type Annotations
Explicit annotations are necessary when TypeScript cannot infer the type, such as:
1. When declaring a variable without an initial value.
2. When a function returns the `any` type.
3. When you want a variable to have a union type.

```typescript
let uninitializedVar: string; // Annotation required here
uninitializedVar = "I have a value now";

// Without annotation, parsing JSON results in 'any'
const parsedData: { name: string, age: number } = JSON.parse('{"name":"Bob", "age":30}');
```

### Type Assertions
Sometimes you know more about a value's type than TypeScript does. You can use type assertions (like a cast in other languages, but it performs no special checking or restructuring of data at runtime).

```typescript
// Two syntaxes for assertion:
let someValue: unknown = "This is a string";

// 1. 'as' syntax (Recommended, especially in React/JSX)
let strLength: number = (someValue as string).length;

// 2. Angle-bracket syntax
let strLength2: number = (<string>someValue).length;
```

---

## 5. Functions

### Typing Parameters and Return Values
Functions form the core of any JavaScript application. TypeScript lets you strongly type input arguments and return values.

```typescript
function calculateDiscount(price: number, discountRate: number): number {
  return price - (price * discountRate);
}

// Arrow function syntax
const multiply = (x: number, y: number): number => {
  return x * y;
};
```

### Optional and Default Parameters
In TypeScript, all parameters are assumed to be required unless specified otherwise.

**Optional Parameters (`?`)**:
Must appear *after* all required parameters.
```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

console.log(buildName("John")); // OK
console.log(buildName("John", "Doe")); // OK
```

**Default Parameters (`=`)**:
```typescript
function createGreeting(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(createGreeting("Alice")); // "Hello, Alice!"
console.log(createGreeting("Bob", "Hi")); // "Hi, Bob!"
```

### Rest Parameters
When dealing with an unbounded number of arguments, use rest parameters typed as an array.

```typescript
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

---

## 6. Objects and Interfaces

### Interface Definition
An `interface` is a way to name an object type. It enforces a specific structure on an object.

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

const user1: User = {
  id: 1,
  username: "johndoe",
  email: "john@example.com",
  isActive: true
};
```

### Optional Properties
Not all properties of an interface may be required. Use `?` to mark them as optional.

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
}

const item1: Product = { id: 101, name: "Laptop", price: 999 }; // Valid
const item2: Product = { id: 102, name: "Mouse", price: 25, description: "Wireless" }; // Valid
```

### Readonly Properties
Some properties should only be modified when an object is first created. You can specify this by putting `readonly` before the name of the property.

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property.
```

### Index Signatures
If you don't know the exact property names in advance, but you know the shape of the values, use an index signature.

```typescript
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  greeting: "Hello",
  farewell: "Goodbye",
  // age: 30 // Error: Type 'number' is not assignable to type 'string'.
};
```

### Extending Interfaces
Interfaces can inherit from other interfaces.

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Rex",
  breed: "German Shepherd",
  bark: () => console.log("Woof!")
};
```

---

## 7. Type Aliases

Type aliases create a new name for a type. They are similar to interfaces but can name primitives, unions, tuples, and any other types that you'd otherwise have to write by hand.

```typescript
type ID = string | number; // Union type alias

function printId(id: ID) {
  console.log(`ID is: ${id}`);
}

// Object type alias
type UserProfile = {
  name: string;
  age: number;
};

const profile: UserProfile = { name: "Alice", age: 28 };
```

### Type vs. Interface
- **Interfaces** are primarily for shaping objects. They support "declaration merging" (defining the same interface multiple times merges their properties).
- **Type aliases** are more versatile (can handle unions/intersections of primitives), but do not support declaration merging.
- **Rule of thumb**: Use `interface` until you need features only available in `type` (like complex unions or tuples).

---

## 8. Arrays and Tuples

### Arrays
There are two ways to type arrays in TypeScript:

```typescript
// 1. Using brackets []
let stringArray: string[] = ["Apple", "Banana", "Cherry"];

// 2. Using the generic Array type
let numberArray: Array<number> = [1, 2, 3, 4, 5];

// Readonly Arrays (cannot push/pop/modify)
let immutableNumbers: ReadonlyArray<number> = [10, 20, 30];
```

### Tuples
Tuples allow you to express an array with a fixed number of elements whose types are known, but need not be the same.

```typescript
// A tuple representing a [String, Number] pair
let tupleTuple: [string, number];

tupleTuple = ["Alice", 28]; // Correct
// tupleTuple = [28, "Alice"]; // Error: Type 'number' is not assignable to type 'string'.
// tupleTuple = ["Alice", 28, true]; // Error: Source has 3 element(s) but target allows only 2.

// Destructuring tuples
const [userName, userAge] = tupleTuple;

// Labeled tuples (for better readability)
type Coordinate = [latitude: number, longitude: number];
const myLocation: Coordinate = [40.7128, -74.0060];
```

---

## 9. Enums

Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases.

### Numeric Enums
By default, enums are zero-based numeric.

```typescript
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

let dir: Direction = Direction.Up;
```
You can initialize the first member, and the rest will auto-increment.
```typescript
enum StatusCode {
  NotFound = 404,
  InternalServerError = 500,
  BadGateway // Auto-assigned 501
}
```

### String Enums
String enums are often preferred for readability during debugging because their runtime value is a meaningful string.

```typescript
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER"
}

const currentRole: UserRole = UserRole.Admin;
```

### Const Enums
Standard enums generate a significant amount of boilerplate JavaScript code. `const enum` prevents this by completely replacing the enum usage with the literal value during compilation.

```typescript
const enum Environment {
  Dev,
  Prod,
  Test
}
let currentEnv = Environment.Prod; // Compiles directly to: let currentEnv = 1;
```

---

## 10. Union and Intersection Types

### Union Types (`|`)
Union types allow a value to be one of several types.

```typescript
function formatPadding(padding: number | string) {
  if (typeof padding === "number") {
    return `${padding}px`;
  }
  if (typeof padding === "string") {
    return padding;
  }
}
```

### Discriminated Unions
A very powerful pattern in TS. You create a common literal property (a "discriminator") to differentiate between object types.

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  // TypeScript knows which properties are available inside each block
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}
```

### Intersection Types (`&`)
Intersection types combine multiple types into one. This is useful for mixins or combining configuration objects.

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// Combines both interfaces
type Person = HasName & HasAge;

const person: Person = {
  name: "Bob",
  age: 45
};
```

---

## 11. Generics

Generics provide a way to create reusable components that can work over a variety of types rather than a single one, while preserving strict type safety.

### Generic Functions
Without generics, we would have to use `any` to allow a function to accept varying types.

```typescript
// Bad: Losing type information
function identityBad(arg: any): any {
  return arg;
}

// Good: Generic type variable 'T' captures the type
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString"); // output1 is string
let output2 = identity(100); // output2 is inferred as number
```

### Multiple Type Variables
```typescript
function mapPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const pair = mapPair("id", 101); // type is [string, number]
```

### Generic Interfaces and Classes
```typescript
interface Box<T> {
  contents: T;
  getContents(): T;
}

const stringBox: Box<string> = {
  contents: "Secret Message",
  getContents() { return this.contents; }
};

const numberBox: Box<number> = {
  contents: 42,
  getContents() { return this.contents; }
};
```

### Generic Constraints (`extends`)
Sometimes you want a generic to accept any type, but *require* that type to have certain properties.

```typescript
interface Lengthwise {
  length: number;
}

// T must have a length property
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength({ length: 10, value: 3 }); // OK
// logLength(3); // Error: number doesn't have a .length property
```

### Built-in Utility Types
TypeScript provides several built-in generic utility types for type transformation.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial: Makes all properties optional
type PartialTodo = Partial<Todo>;

// Required: Makes all properties required
type RequiredTodo = Required<PartialTodo>;

// Readonly: Makes all properties readonly
type ReadonlyTodo = Readonly<Todo>;

// Pick: Selects specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit: Removes specific properties
type TodoOmitted = Omit<Todo, "description">;

// Record: Creates an object type with specific keys and value types
type UserRoles = Record<string, "Admin" | "User">;
```

---

## 12. Classes in TypeScript

TypeScript adds strong typing, access modifiers, and other OOP features to ES6 classes.

### Access Modifiers
- `public`: (Default) Accessible anywhere.
- `private`: Accessible only within the class.
- `protected`: Accessible within the class and its subclasses.

```typescript
class Employee {
  public name: string;
  private salary: number;
  protected department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  public getSalary(): number {
    return this.salary;
  }
}

const emp = new Employee("Alice", 80000, "Engineering");
console.log(emp.name); // OK
// console.log(emp.salary); // Error: Property 'salary' is private
```

### Parameter Properties Shorthand
You can drastically reduce boilerplate by placing modifiers directly in the constructor.

```typescript
class ProductItem {
  // This automatically creates and assigns the properties!
  constructor(
    public readonly id: number,
    public name: string,
    private price: number
  ) {}
}
```

### Inheritance and Interfaces
```typescript
interface Drivable {
  drive(): void;
}

// Inheritance
class Vehicle {
  constructor(public wheels: number) {}
}

// Implementation and Extending
class Car extends Vehicle implements Drivable {
  constructor() {
    super(4); // Call parent constructor
  }

  drive() {
    console.log("Driving a car with", this.wheels, "wheels.");
  }
}
```

### Abstract Classes
Abstract classes serve as base classes. They cannot be instantiated directly and often contain abstract methods that must be implemented by subclasses.

```typescript
abstract class BaseController {
  abstract handleRequest(req: any): void; // Must be implemented
  
  protected logMethod() {
    console.log("Handling request...");
  }
}

class UserController extends BaseController {
  handleRequest(req: any) {
    this.logMethod();
    console.log("Routing to User logic");
  }
}
// const ctrl = new BaseController(); // Error: Cannot create an instance of an abstract class.
```

---

## 13. Modules

TypeScript shares the same module syntax as ES6 modules.

### Exporting and Importing
```typescript
// math.ts
export function add(a: number, b: number) { return a + b; }
export const PI = 3.14;

// main.ts
import { add, PI } from "./math";
console.log(add(10, PI));
```

### Default Exports
```typescript
// logger.ts
export default class Logger {
  log(msg: string) { console.log(msg); }
}

// app.ts
import Logger from "./logger";
new Logger().log("Started");
```

### Type-Only Imports
If you are only importing types (which are erased during compilation), you can use `import type`. This helps bundlers optimize the code and prevents accidental circular dependencies at runtime.

```typescript
import type { UserProfile } from "./types";
import { fetchUser } from "./api"; // Actual runtime function
```

---

## 14. TypeScript with JavaScript Libraries

### DefinitelyTyped (`@types`)
Most popular JavaScript libraries do not contain TypeScript definitions natively. The community maintains high-quality type definitions in the DefinitelyTyped repository.

If you install a library like `lodash`, you should also install its types:
```bash
npm install lodash
npm install @types/lodash --save-dev
```

### Custom Declaration Files (`.d.ts`)
If a library has no types available, you can define them yourself in a `.d.ts` file.

```typescript
// custom-types.d.ts
declare module 'untyped-library' {
  export function doSomethingComplex(args: any): boolean;
  export const config: any;
}
```

### Allowing JS in TS Projects
If you are migrating a legacy JS project, you can allow JS files to coexist with TS files by setting `"allowJs": true` in `tsconfig.json`.

---

## 15. Error Handling

### Typing `catch` block errors
By default in TypeScript 4.0+, the error object in a `catch` clause is of type `unknown` (in strict mode). You must narrow it before using it.

```typescript
try {
  throw new Error("Network failed");
} catch (error: unknown) {
  // error.message; // Error: Object is of type 'unknown'.
  
  if (error instanceof Error) {
    console.log(error.message); // OK
  } else {
    console.log("An unexpected error occurred", error);
  }
}
```

### Custom Error Classes
Extend the native `Error` class to create structured, typed errors.

```typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
    // Required for extending built-in classes in TS targeting older ES versions:
    Object.setPrototypeOf(this, ValidationError.prototype); 
  }
}
```

### Functional Error Handling (Result Pattern)
Instead of throwing errors (which are hard to track in the type system), return a strongly typed union result.

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function parseInteger(input: string): Result<number, string> {
  const parsed = parseInt(input, 10);
  if (isNaN(parsed)) {
    return { success: false, error: "Invalid number format" };
  }
  return { success: true, data: parsed };
}

const res = parseInteger("123");
if (res.success) {
  console.log(res.data * 2); // TS knows 'data' is a number
} else {
  console.error(res.error); // TS knows 'error' is a string
}
```

---

## 16. Best Practices

1. **Use Strict Mode**: Always ensure `"strict": true` in your `tsconfig.json`. It enables a suite of checks (like strict null checks) that are fundamental to TS's value proposition.
2. **Never Use `any`**: If you don't know a type, use `unknown`. If you are ignoring a type rule, use `@ts-expect-error` instead of `@ts-ignore` so you are notified if the error goes away.
3. **Prefer `interface` for Objects**: Unless you specifically need a union, intersection, or tuple type, use `interface`. It yields clearer error messages and supports merging.
4. **Define Return Types**: While TS infers return types excellently, explicitly defining them prevents accidental structural changes in returned objects.
5. **Use Readonly**: If a property or array shouldn't be mutated, mark it `readonly` or use `ReadonlyArray`. This enforces immutability at the compiler level.
6. **Keep Type Definitions Close**: Keep interfaces and types close to where they are used, or in a dedicated `types.ts` file if shared across the module.

---

## 17. Common Mistakes

### 1. Confusing `any` with `unknown`
```typescript
// Mistake: Using any propagates untyped code
const data: any = JSON.parse(userInput);
data.fakeMethod(); // Compiles, crashes at runtime.

// Solution: Use unknown
const safeData: unknown = JSON.parse(userInput);
// safeData.fakeMethod(); // Error!
```

### 2. Using assertions `as` to silence errors
```typescript
interface User { name: string; age: number; }
// Mistake: Forcing a partial object to be a full User
const badUser = { name: "Bob" } as User; // Missing age, but TS ignores it!

// Solution: Define properly or use Partial
const goodUser: Partial<User> = { name: "Bob" };
```

### 3. Misunderstanding Type Erasure
TypeScript types exist *only* at compile time. You cannot use TS types in runtime logic.
```typescript
interface MyInterface { id: number; }

// Mistake: Trying to check an interface at runtime
function check(obj: any) {
  // if (obj instanceof MyInterface) { ... } // ERROR: MyInterface only refers to a type
}
```
*Solution*: Use custom type guards or check specific properties (e.g., `'id' in obj`).

---

## 18. Real-world Examples

### 1. A Typed API Fetch Wrapper
This wrapper utilizes Generics to return properly typed responses from a REST API.

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

async function get<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: T = await response.json();
  
  return {
    data,
    status: response.status
  };
}

// Usage:
interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts() {
  try {
    // We pass <Post[]> to tell TS what 'data' will look like
    const result = await get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    
    // Now result.data has full autocompletion for Post[]
    result.data.forEach(post => console.log(post.title));
  } catch (err) {
    console.error(err);
  }
}
```

### 2. Typing React Components
A basic introduction to how TypeScript integrates with React functional components and hooks.

```tsx
import React, { useState } from 'react';

// Define the Props interface
interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "danger"; // Optional union type
  disabled?: boolean;
}

// Use React.FC (Functional Component) or explicitly type arguments
export const CustomButton: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = "primary", 
  disabled = false 
}) => {
  
  // Typing state: Inferred as boolean, but explicit is sometimes safer
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseStyle = { padding: "10px 20px", borderRadius: "4px" };
  const variantStyle = 
    variant === "primary" ? { background: "blue", color: "white" } :
    variant === "danger"  ? { background: "red", color: "white" } :
    { background: "gray", color: "black" };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variantStyle, opacity: isHovered ? 0.8 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};
```

### 3. Typing React Events and Forms
```tsx
import React, { useState } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Explicit event typing for input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Explicit event typing for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TypeScript knows this is safe
    console.log("Submitting", { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleEmailChange} />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} // Inline inference works here!
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

---
*End of TypeScript Study Guide. Review these concepts practically by applying them to a small project, progressively enabling stricter type checking in your `tsconfig.json`.*
