# The Definitive Swift Programming Study Guide

Welcome to the comprehensive study guide for Swift. This document is designed to take you from a beginner understanding to an intermediate, practical mastery of Apple's flagship programming language. It focuses on clarity, real-world applicability, and understanding the "why" behind the language's design.

---

## Table of Contents
1. [Introduction to Swift](#1-introduction-to-swift)
2. [Setup and Environment](#2-setup-and-environment)
3. [Basics](#3-basics)
4. [Control Flow](#4-control-flow)
5. [Functions](#5-functions)
6. [Optionals](#6-optionals)
7. [Collections](#7-collections)
8. [Object-Oriented & Protocol-Oriented Programming](#8-object-oriented-programming)
9. [Error Handling](#9-error-handling)
10. [Memory Management](#10-memory-management-basic-intro)
11. [SwiftUI](#11-swiftui-basic-intro)
12. [Best Practices](#12-best-practices)
13. [Common Mistakes](#13-common-mistakes)
14. [Real-world Examples](#14-real-world-examples)

---

## 1. Introduction to Swift

### What is Swift?
Swift is a powerful, intuitive, and compiled programming language created by Apple for building apps across its entire ecosystem: iOS, macOS, watchOS, and tvOS. It was introduced in 2014 as a modern replacement for Objective-C. Swift is designed to be safe, fast, and expressive. In 2015, Apple open-sourced Swift, allowing it to be used on Linux and other platforms, making it suitable for server-side development as well.

### Why Swift is Used
- **Safety First:** Swift eliminates entire classes of unsafe code. Variables are always initialized before use, arrays and integers are checked for overflow, and memory is managed automatically. Its crowning achievement in safety is the concept of **Optionals**, which forces developers to explicitly handle the absence of values, practically eliminating null pointer exceptions that plague other languages.
- **Performance:** Swift is fast. It uses the LLVM compiler framework to transform Swift code into optimized native machine code. It was designed from the ground up to outperform Objective-C and rival C-based languages in execution speed.
- **Modern Syntax:** Swift sheds the historical baggage of C. You don't need semicolons at the end of statements, header files are gone, and string manipulation is straightforward.
- **Interoperability:** Swift can seamlessly co-exist with existing Objective-C codebases, allowing developers to gradually migrate older apps.
- **Approachable:** With tools like Swift Playgrounds, the language is highly interactive and accessible for absolute beginners.

### Swift vs Objective-C (Basic Comparison)

| Feature | Swift | Objective-C |
| :--- | :--- | :--- |
| **Release Year** | 2014 | 1984 |
| **Syntax** | Clean, modern, C-like but without the clutter. | Clunky, relies heavily on brackets `[ ]` and pointers `*`. |
| **Typing** | Strongly and statically typed with powerful type inference. | Dynamically typed, allowing more runtime flexibility but catching fewer errors at compile time. |
| **File Structure** | Single `.swift` file for both interface and implementation. | Split between Header (`.h`) and Implementation (`.m`) files. |
| **Null Handling** | Native Optionals (`Type?`), enforced safely at compile time. | Pointers can be `nil`. Sending messages to `nil` fails silently, which can hide bugs. |
| **Memory Management** | Automatic Reference Counting (ARC) across the board. | Manual originally, later adopted ARC, but C-primitives required manual management. |

---

## 2. Setup and Environment

### Installing Xcode
To develop for Apple platforms, you need **Xcode**, Apple's official Integrated Development Environment (IDE). 
1. **Hardware Requirement:** You must have a Mac running macOS.
2. **Installation:** Open the Mac App Store, search for "Xcode", and click "Get". It is a large application (often over 10GB), so installation may take a while.
3. **Components:** Xcode includes the Swift compiler, the iOS/macOS SDKs, Interface Builder (for UI), and a suite of performance debugging tools.

### Writing and Running Swift Code
You have three primary ways to write and run Swift code:

1. **Swift Playgrounds:** 
   - Ideal for learning, prototyping, and testing algorithms.
   - You type code on the left, and see the results immediately on the right.
   - Open Xcode > File > New > Playground.
   
2. **Command Line (REPL & Swift Scripts):**
   - You can run Swift from the Terminal.
   - Type `swift` to enter the Read-Eval-Print Loop (REPL), where you can type Swift code and see instant execution.
   - You can also write `.swift` files and run them using `swift filename.swift`.
   
3. **Xcode Projects:**
   - For building actual apps.
   - Open Xcode > Create a new Xcode project. Select "App" under the iOS or macOS tab.
   - This sets up the entire directory structure, build settings, and UI entry points for a full application.

**Hello World Example:**
```swift
import Foundation // Foundation provides basic utilities, strings, dates, etc.

// The print function outputs text to the console.
print("Hello, World!")
```

---

## 3. Basics

### Variables and Constants
In Swift, you must explicitly declare whether a value can change (variable) or cannot change (constant).

- **Constants (`let`):** Use `let` to declare a value that will never change once assigned. This is heavily preferred in Swift for safety and performance.
- **Variables (`var`):** Use `var` to declare a value that can be modified later.

```swift
// Declaring a constant
let maximumLoginAttempts = 3
// maximumLoginAttempts = 4 // ERROR: Cannot assign to value: 'maximumLoginAttempts' is a 'let' constant

// Declaring a variable
var currentLoginAttempts = 0
currentLoginAttempts += 1 // This is perfectly fine

// Multiple declarations on one line
var x = 0.0, y = 0.0, z = 0.0
```

*Best Practice:* Default to using `let`. Only change it to `var` if the compiler complains because you actually need to mutate the value.

### Type Inference vs Type Annotation
Swift is strongly typed, meaning every variable has a specific, unchangeable type. However, you rarely have to write the type yourself because of **Type Inference**. The compiler looks at the initial value and infers the type.

```swift
// Type Inference
let greeting = "Hello" // Inferred as String
let age = 30           // Inferred as Int
let pi = 3.14159       // Inferred as Double (Swift prefers Double over Float)
let isLoggedIn = true  // Inferred as Bool

// Type Annotation
// Use when you don't provide an initial value, or when you want a specific type (like Float instead of Double)
let explicitFloat: Float = 4.0
let welcomeMessage: String
welcomeMessage = "Welcome to the app!" // Initialization deferred, but type is fixed
```

### Core Data Types
- **Int:** Whole numbers. On a 64-bit system, `Int` is a 64-bit integer.
- **Double / Float:** Floating-point numbers. `Double` has 64-bit precision (at least 15 decimal digits), `Float` has 32-bit precision (as few as 6 decimal digits).
- **Bool:** Logical values, true or false.
- **String:** A collection of characters.
- **Character:** A single character, denoted by double quotes like a String.

### String Interpolation
Swift makes it incredibly easy to inject variables or expressions into strings using `\(...)`.

```swift
let name = "Alice"
let apples = 5
let oranges = 3

let summary = "\(name) has \(apples + oranges) pieces of fruit."
print(summary) // Outputs: Alice has 8 pieces of fruit.
```

### Tuples
Tuples group multiple values into a single compound value. The values can be of any type and don't have to be the same type as each other. They are incredibly useful for returning multiple values from a function.

```swift
// Creating a tuple
let http404Error = (404, "Not Found") // Inferred as (Int, String)

// Decomposing a tuple
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)") // Outputs 404

// Naming tuple elements for clarity
let http200Status = (statusCode: 200, description: "OK")
print("Status: \(http200Status.statusCode) - \(http200Status.description)")
```

---

## 4. Control Flow

### if-else
Standard conditional execution. Unlike C, the condition must explicitly evaluate to a `Bool`. `if number { ... }` is invalid in Swift; it must be `if number != 0 { ... }`. Parentheses around the condition are optional but braces `{}` are required.

```swift
let temperature = 75

if temperature <= 32 {
    print("It's freezing. Wear a heavy coat.")
} else if temperature >= 85 {
    print("It's really warm. Don't forget sunscreen.")
} else {
    print("It's not that cold. Wear a t-shirt.")
}
```

### switch
Swift's `switch` statement is significantly more powerful and safer than in C/Objective-C.
- **No Implicit Fallthrough:** Once a matching case finishes executing, the switch statement terminates. You do not need to write `break`.
- **Exhaustiveness:** A switch must cover *every* possible value of the type being evaluated. If it doesn't, you must provide a `default` case.
- **Compound Cases and Ranges:** You can match against multiple values or ranges.

```swift
let someCharacter: Character = "z"

switch someCharacter {
case "a", "e", "i", "o", "u": // Compound case
    print("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
     "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    print("\(someCharacter) is a consonant")
default:
    print("\(someCharacter) is not a vowel or a consonant")
}

// Matching Ranges
let approximateCount = 62
switch approximateCount {
case 0:
    print("no")
case 1..<5: // Half-open range: 1, 2, 3, 4
    print("a few")
case 5...12: // Closed range: 5 to 12 inclusive
    print("several")
case 13...100:
    print("dozens of")
default:
    print("many")
}

// Value Binding and Where Clauses
let point = (2, -2)
switch point {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
```

### Loops (for, while)

#### For-In Loops
Use the `for-in` loop to iterate over sequences, such as arrays, dictionaries, ranges, or strings.

```swift
// Iterating a Closed Range
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}

// Ignoring the value with an underscore `_`
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
print("\(base) to the power of \(power) is \(answer)")

// Iterating an Array
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}

// Iterating a Dictionary
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    print("\(animalName)s have \(legCount) legs")
}
```

#### While Loops
A `while` loop performs a set of statements until a condition becomes false.

```swift
var count = 5
while count > 0 {
    print("Countdown: \(count)")
    count -= 1
}
print("Liftoff!")
```

#### Repeat-While Loops
Similar to a `do-while` loop in other languages. It executes a block of code at least once, *then* evaluates the condition.

```swift
var rollCount = 0
var diceRoll = 0

repeat {
    diceRoll = Int.random(in: 1...6)
    rollCount += 1
    print("Rolled a \(diceRoll)")
} while diceRoll != 6

print("It took \(rollCount) rolls to get a 6.")
```

---

## 5. Functions

Functions are self-contained chunks of code that perform a specific task. Swift functions are highly flexible.

### Function Declaration
Functions are declared using the `func` keyword. You specify the name, parameters (with types), and the return type.

```swift
// Simple function with no parameters and no return value
func greet() {
    print("Hello there!")
}
greet()

// Function with parameters and a return value
// Parameters require labels when calling the function by default
func addNumbers(a: Int, b: Int) -> Int {
    return a + b
}
let sum = addNumbers(a: 5, b: 10) // Note how `a:` and `b:` are required
```

### Argument Labels and Parameter Names
Swift has a unique feature where parameters can have both an **argument label** (used when calling the function) and a **parameter name** (used within the function's implementation). This allows functions to read like natural English sentences.

```swift
// `to` and `and` are argument labels. `person` and `hometown` are parameter names.
func greet(to person: String, and hometown: String) -> String {
    return "Hello \(person)! Glad you could visit from \(hometown)."
}

// Reads naturally: greet to "John" and "New York"
let greeting = greet(to: "John", and: "New York")
```

#### Omitting Argument Labels
If you don't want to require an argument label, use an underscore `_` as the argument label.

```swift
func multiply(_ a: Int, by b: Int) -> Int {
    return a * b
}

// The first parameter label is omitted
let product = multiply(4, by: 5)
```

### Default Parameter Values
You can assign a default value to any parameter. If a default is defined, you can omit that parameter when calling the function.

```swift
func configureServer(port: Int = 8080, timeout: Double = 30.0) {
    print("Server starting on port \(port) with timeout \(timeout)s")
}

configureServer() // Uses 8080 and 30.0
configureServer(port: 3000) // Uses 3000 and 30.0
```

### In-Out Parameters
By default, function parameters are constants (`let`). You cannot change them inside the function. If you need to modify a parameter and have those changes persist outside the function, define it as an `inout` parameter and pass a variable prefixed with an ampersand `&`.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
```

---

## 6. Optionals

Optionals are arguably the most important feature to grasp in Swift. They solve the "billion-dollar mistake" (null pointer exceptions). 

### What are Optionals?
An Optional in Swift is a type that can hold *either* a value OR no value at all (`nil`). In Swift, regular types (like `String`, `Int`, `CustomClass`) CANNOT be `nil`. If a variable might be absent, it **must** be declared as an Optional by appending a question mark `?` to the type.

```swift
var regularString: String = "Hello"
// regularString = nil // COMPILE ERROR: 'nil' cannot be assigned to type 'String'

var optionalString: String? = "Hello"
optionalString = nil // Perfectly fine. The variable now holds no value.
```

Think of an Optional as a wrapped box. 
- `String?` is a box that *might* contain a String, or it might be empty.
- Before you can use the String inside, you must safely "unwrap" the box to check if something is actually inside.

### 1. Force Unwrapping (`!`)
If you are absolutely, 100% certain that an optional contains a value, you can force unwrap it using an exclamation mark `!`. 

**WARNING:** If you force unwrap an optional that is `nil`, your application will crash instantly with a fatal error. Use this sparingly!

```swift
let possibleNumber = "123"
// Int(String) returns an Int? because the string might not be a valid number (e.g. "apple")
let convertedNumber: Int? = Int(possibleNumber)

// We happen to know "123" converts successfully, so we force unwrap
let actualNumber: Int = convertedNumber! 
print(actualNumber)
```

### 2. Optional Binding (`if let` and `guard let`)
This is the safest and most common way to unwrap optionals. It checks if a value exists, and if so, extracts it into a temporary constant that is guaranteed to be non-nil.

#### Using `if let`
```swift
var optionalName: String? = "Alice"

// "If let safeName be the unwrapped value of optionalName..."
if let safeName = optionalName {
    // Inside these braces, safeName is a regular String, NOT an Optional String
    print("Hello, \(safeName)")
} else {
    print("No name provided")
}
```

#### Using `guard let`
`guard let` is used for early exits. It keeps your code from becoming deeply nested (avoiding the "Pyramid of Doom"). The unwrapped value remains available for the rest of the scope after the guard statement.

```swift
func processUser(id: Int, name: String?) {
    // We mandate that name MUST have a value to continue.
    guard let validName = name else {
        print("Error: User \(id) has no name. Aborting process.")
        return // You MUST exit the scope (return, break, continue, throw) in the else block
    }
    
    // validName is available here as a non-optional String
    print("Processing user: \(validName)")
    // ... further processing
}
```

### 3. Nil-Coalescing Operator (`??`)
This operator unwraps an optional if it contains a value, or returns a default value if it is `nil`.

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil

// colorNameToUse is "red" because userDefinedColorName is nil
var colorNameToUse = userDefinedColorName ?? defaultColorName

userDefinedColorName = "green"
// colorNameToUse is now "green"
colorNameToUse = userDefinedColorName ?? defaultColorName
```

### 4. Optional Chaining (`?.`)
Optional chaining provides a safe way to query properties, methods, or subscripts on an optional that might currently be `nil`. If the optional contains a value, the property/method call succeeds. If the optional is `nil`, the entire chain gracefully fails and evaluates to `nil`, rather than crashing.

```swift
class Residence {
    var numberOfRooms = 1
}

class Person {
    var residence: Residence? // A person might or might not have a residence
}

let john = Person()
// john.residence is nil right now

// The following line attempts to get numberOfRooms. 
// Because residence is nil, the chain breaks safely and roomCount is assigned nil.
// roomCount is of type Int?
let roomCount = john.residence?.numberOfRooms 

if let count = roomCount {
    print("John has \(count) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
```

---

## 7. Collections

Swift provides three primary collection types for storing collections of values: Arrays, Sets, and Dictionaries.

### Arrays
Arrays store values of the **same type** in an **ordered list**. The same value can appear multiple times at different positions.

```swift
// Creating an empty Array
var someInts: [Int] = []
var otherInts = [Int]() // Equivalent

// Creating an Array with a default value
var threeDoubles = Array(repeating: 0.0, count: 3) // [0.0, 0.0, 0.0]

// Creating an Array with an array literal
var shoppingList: [String] = ["Eggs", "Milk"]
// Swift can infer the type: var shoppingList = ["Eggs", "Milk"]

// Accessing and Modifying Arrays
print("The list contains \(shoppingList.count) items.")
shoppingList.append("Flour")
shoppingList += ["Baking Powder", "Cheese"]

// Accessing by index (0-indexed)
var firstItem = shoppingList[0]

// Inserting and Removing
shoppingList.insert("Maple Syrup", at: 0)
let removedItem = shoppingList.remove(at: 0) // Returns "Maple Syrup"
let lastItem = shoppingList.removeLast()

// Iterating with indices
for (index, value) in shoppingList.enumerated() {
    print("Item \(index + 1): \(value)")
}
```

### Dictionaries
Dictionaries store associations between **keys** of the same type and **values** of the same type in a collection with **no defined ordering**. Every value is associated with a unique key, which acts as an identifier for that value.

```swift
// Creating an empty Dictionary
var namesOfIntegers: [Int: String] = [:]

// Creating with a literal
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

// Accessing and Modifying
print("The dictionary contains \(airports.count) items.")

// Adding or updating via subscript
airports["LHR"] = "London" // Adds a new item
airports["LHR"] = "London Heathrow" // Updates existing item

// Note: Dictionary subscripting returns an Optional. 
// If the key doesn't exist, it returns nil.
if let airportName = airports["DUB"] {
    print("The name of the airport is \(airportName).")
} else {
    print("That airport is not in the dictionary.")
}

// Removing an item
airports["APL"] = "Apple International"
airports["APL"] = nil // Removing by setting to nil

// Iterating a Dictionary
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
```

### Sets
Sets store **distinct** values of the same type in a collection with **no defined ordering**. Use a Set instead of an Array when the order of items is not important, or when you need to ensure that an item only appears once. Types placed in a Set must conform to the `Hashable` protocol.

```swift
// Creating an empty Set
var letters = Set<Character>()

// Creating with an array literal
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
// Type must be explicitly declared as Set, otherwise Swift infers Array
var inferredGenres: Set = ["Rock", "Classical", "Hip hop"]

// Modifying and Accessing
favoriteGenres.insert("Jazz")
if let removedGenre = favoriteGenres.remove("Rock") {
    print("\(removedGenre)? I'm over it.")
} else {
    print("I never much cared for that.")
}

// Sets are incredibly fast for membership checking
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
}

// Set Operations (The real power of Sets)
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

// Union: Combine both sets
let union = oddDigits.union(evenDigits).sorted() // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Intersection: Common elements
let intersection = oddDigits.intersection(singleDigitPrimeNumbers).sorted() // [3, 5, 7]

// Subtracting: Elements in Set A not in Set B
let subtracting = oddDigits.subtracting(singleDigitPrimeNumbers).sorted() // [1, 9]
```

### Higher Order Functions (Map, Filter, Reduce)
Swift collections support powerful functional programming patterns.

```swift
let numbers = [1, 2, 3, 4, 5]

// Map: Transforms every element
let doubled = numbers.map { $0 * 2 } 
// $0 is shorthand for the first parameter in the closure. Result: [2, 4, 6, 8, 10]

// Filter: Keeps elements that match a condition
let evens = numbers.filter { $0 % 2 == 0 } 
// Result: [2, 4]

// Reduce: Combines all elements into a single value
// The 0 is the starting value. $0 is the accumulated value, $1 is the current element
let sum = numbers.reduce(0) { $0 + $1 } 
// Result: 15
```

---

## 8. Object-Oriented Programming

Swift supports both traditional Object-Oriented Programming (Classes) and a modern paradigm called Protocol-Oriented Programming (Structs + Protocols).

### Classes vs Structs

Both Classes and Structs can define properties, methods, initializers, and conform to protocols. However, there are fundamental differences.

**Structs (Value Types)**
- When assigned to a variable, passed to a function, or assigned to a new variable, the struct is **copied**.
- Modifying the copy does NOT affect the original.
- They get an automatic "memberwise initializer" for free.
- Cannot inherit from other structs.
- Default to being immutable. You must use the `mutating` keyword on methods that alter internal state.
- **Best Practice:** Use Structs by default for modeling data (e.g., User, Product, Coordinates). Swift relies heavily on value types (Array, String, Int are all structs).

**Classes (Reference Types)**
- When assigned or passed around, a **reference** (pointer) to the same existing instance in memory is used.
- Modifying a property through one reference alters the data for all references.
- Support inheritance (a class can inherit characteristics from another class).
- Require custom initializers if properties don't have default values.
- Can be deinitialized (`deinit`) when memory is freed.
- **Best Practice:** Use Classes when you need shared, mutable state, lifecycle management (like a View Controller), or Objective-C interoperability.

#### Struct Example
```swift
// Defining a Struct
struct Resolution {
    var width: Int
    var height: Int
    
    // Mutating method because it modifies properties of the value type
    mutating func resize(to newWidth: Int, _ newHeight: Int) {
        width = newWidth
        height = newHeight
    }
}

// Structs get a free memberwise initializer
var vga = Resolution(width: 640, height: 480)

// Value Type semantics (Copying)
var hd = vga
hd.width = 1920 // Modifying the copy
print("vga width: \(vga.width), hd width: \(hd.width)") 
// Outputs: vga width: 640, hd width: 1920. They are completely separate instances.
```

#### Class Example
```swift
class VideoMode {
    var resolution = Resolution(width: 1920, height: 1080)
    var interlaced = false
    var frameRate = 0.0
    var name: String?
    
    // Classes do not get memberwise initializers automatically
    // You must provide an init if properties aren't given default values, 
    // but here they all have defaults, so we get an empty init() for free.
}

let tenEighty = VideoMode()
tenEighty.frameRate = 25.0

// Reference Type semantics (Sharing)
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0 // Modifying via the second reference

print("tenEighty frameRate: \(tenEighty.frameRate)") 
// Outputs 30.0. Both variables point to the same object in memory.

// Identity Operator (===) checks if two references point to the exact same object
if tenEighty === alsoTenEighty {
    print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
}
```

### Properties
Classes and Structs have properties.

- **Stored Properties:** Simply store a constant or variable value.
- **Computed Properties:** Do not store a value. Instead, they provide a getter and an optional setter to retrieve and set other properties indirectly.
- **Property Observers:** Observe and respond to changes in a property's value (`willSet` and `didSet`).

```swift
struct Rect {
    // Stored properties
    var width: Double
    var height: Double
    
    // Computed property
    var area: Double {
        // Getter
        get { return width * height }
        // If it only has a getter, you can omit the `get {}` block
    }
}

class StepCounter {
    // Property Observer
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("About to set totalSteps to \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}

let stepCounter = StepCounter()
stepCounter.totalSteps = 200 // Triggers willSet, then oldValue, then didSet
```

### Inheritance
A class can inherit methods, properties, and other characteristics from another class. The inheriting class is a *subclass*, and the class it inherits from is its *superclass*.

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise() {
        // do nothing - an arbitrary vehicle doesn't necessarily make a noise
    }
}

// Bicycle inherits from Vehicle
class Bicycle: Vehicle {
    var hasBasket = false
    
    // Overriding a property
    override var description: String {
        return super.description + " on two wheels"
    }
    
    // Overriding a method
    override func makeNoise() {
        print("Ring ring!")
    }
}

// To prevent a class or method from being overridden, mark it as `final`
final class Train: Vehicle { ... }
```

### Protocols
A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task. Classes, structs, and enums can then adopt (conform to) these protocols to provide actual implementations. This is the cornerstone of Protocol-Oriented Programming.

```swift
// Defining a protocol
protocol Identifiable {
    // A gettable string property requirement
    var id: String { get }
}

protocol Describable {
    func describe() -> String
}

// A struct adopting protocols
struct User: Identifiable, Describable {
    var id: String // Satisfies Identifiable
    var name: String
    
    // Satisfies Describable
    func describe() -> String {
        return "User \(name) with ID \(id)"
    }
}
```

#### Protocol Extensions
A major feature of Swift. You can extend a protocol to provide a *default implementation* for its methods. Any type that conforms to the protocol automatically gets this behavior for free.

```swift
extension Describable {
    // Default implementation
    func describe() -> String {
        return "A generic describable object."
    }
}

struct BasicObject: Describable {
    // No need to implement describe(), it uses the default.
}
print(BasicObject().describe()) // Outputs: A generic describable object.
```

---

## 9. Error Handling

Swift provides first-class support for throwing, catching, propagating, and manipulating recoverable errors at runtime.

### Defining Errors
Errors in Swift are values of types that conform to the `Error` protocol. Enums are particularly well suited for modeling related error conditions.

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

### Throwing Errors
Use the `throw` keyword to throw an error. A function that can throw an error must be marked with the `throws` keyword before its return type.

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = ["Candy": Item(price: 12, count: 7)]
    var coinsDeposited = 0
    
    // This function can potentially fail and throw an error
    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }
        
        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }
        
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        coinsDeposited -= item.price
        print("Dispensing \(name)")
    }
}
```

### Handling Errors
There are four ways to handle errors in Swift.

#### 1. Do-Catch
The most comprehensive way to handle errors. You execute throwing code inside a `do` block using `try`, and handle specific errors in `catch` clauses.

```swift
let machine = VendingMachine()
machine.coinsDeposited = 8

do {
    // You MUST use 'try' before calling a throwing function
    try machine.vend(itemNamed: "Candy")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    // A catch-all for any other error. The error is implicitly named 'error'
    print("Unexpected error: \(error).")
}
```

#### 2. Optional Conversion (`try?`)
Converts the result of a throwing function into an Optional. If the function succeeds, it returns the value wrapped in an optional. If it throws an error, it ignores the specific error and just returns `nil`.

```swift
// if vend() returned a String, it would be a String? here.
// Since vend() returns Void, it returns Void? which isn't very useful, 
// but try? is great for functions that return data.
if let data = try? fetchData(from: someURL) {
    print("Successfully fetched data")
} else {
    print("Fetching failed, but we don't care exactly why.")
}
```

#### 3. Forced Unwrapping (`try!`)
Asserts that the code will NOT throw an error. If it does throw an error, your app will crash. Use only when you are absolutely certain failure is impossible (e.g., loading a bundled file that you know is included in the app).

```swift
// If the image doesn't exist, the app crashes.
let image = try! loadImage(named: "logo.png")
```

#### 4. Propagating the Error
A throwing function can simply choose not to handle the error, but rather let it propagate up to whatever function called it.

```swift
// This function doesn't use do-catch. It passes the buck up the chain.
func buySnack(name: String, vendingMachine: VendingMachine) throws {
    try vendingMachine.vend(itemNamed: name)
}
```

---

## 10. Memory Management (Basic Intro)

Swift uses **Automatic Reference Counting (ARC)** to track and manage your app’s memory usage. In most cases, memory management "just works," and you do not need to think about it yourself. 

ARC automatically frees up the memory used by class instances when those instances are no longer needed.

### How ARC Works
Every time you create a new instance of a class, ARC allocates memory for it. When you assign that instance to a property, variable, or constant, it creates a **strong reference** to that instance. As long as at least ONE strong reference exists, the object stays alive in memory. When the count of strong references drops to zero, ARC deallocates the object.

```swift
class Person {
    let name: String
    init(name: String) { self.name = name; print("\(name) is being initialized") }
    deinit { print("\(name) is being deinitialized") } // Called right before memory is freed
}

var reference1: Person?
var reference2: Person?

reference1 = Person(name: "John Appleseed") // Strong ref count = 1. Prints "initialized"
reference2 = reference1                     // Strong ref count = 2.

reference1 = nil // Strong ref count = 1. Object remains alive.
reference2 = nil // Strong ref count = 0. Prints "deinitialized". Memory is freed.
```

### Strong Reference Cycles (Memory Leaks)
A memory leak occurs if two class instances hold strong references to each other, such that each keeps the other alive. Their reference counts will never reach zero.

```swift
class Employee {
    var name: String
    var computer: Mac? // Strong reference to Mac
    init(name: String) { self.name = name }
}

class Mac {
    var model: String
    var owner: Employee? // Strong reference to Employee
    init(model: String) { self.model = model }
}

var bob: Employee? = Employee(name: "Bob")
var bobsMac: Mac? = Mac(model: "MacBook Pro")

// Create a cycle!
bob?.computer = bobsMac
bobsMac?.owner = bob

bob = nil
bobsMac = nil
// Memory Leak! Neither the Employee nor the Mac deinit blocks will ever be called.
// They are keeping each other alive in memory indefinitely.
```

### Breaking Cycles: Weak and Unowned References
To resolve strong reference cycles, you define one of the relationships as `weak` or `unowned` instead of a strong reference.

- **Weak References (`weak`):** A weak reference does not increase the ARC count. Because the object it points to might be deallocated while the weak reference is still pointing to it, weak references are **always declared as Optional variables**. If the object is deallocated, ARC automatically sets the weak reference to `nil`.

```swift
class MacFixed {
    var model: String
    weak var owner: Employee? // <--- FIX: Made weak. Does not keep Employee alive.
    init(model: String) { self.model = model }
}
```

- **Unowned References (`unowned`):** Similar to weak, it doesn't increase the ARC count. However, it is used when you know the reference will *never* become `nil` while the unowned reference is in use. It is **not** an Optional. If you try to access an unowned reference after the object has been deallocated, the app crashes. Use with caution (often used in parent-child relationships where the child can't exist without the parent).

### Closures and Capture Lists
Closures (blocks of code) are reference types. If a closure captures `self` (the class it belongs to) and the class stores the closure, you create a retain cycle.

```swift
class NetworkManager {
    var data: String = "Important Data"
    
    // A closure property
    lazy var onCompletion: () -> Void = { [weak self] in 
        // [weak self] is a capture list. It captures self weakly to avoid a cycle.
        
        // Because self is weak, it becomes an Optional inside the closure
        guard let strongSelf = self else { return }
        print("Finished loading: \(strongSelf.data)")
    }
}
```

---

## 11. SwiftUI (Basic Intro)

SwiftUI is Apple's modern, declarative framework for building user interfaces across all Apple platforms. It replaces the older imperative framework, UIKit.

### Declarative Syntax
In UIKit (Imperative), you tell the system *how* to build the UI (create a label, set its frame, add it to view, update text later).
In SwiftUI (Declarative), you tell the system *what* the UI should look like for a given state. When the state changes, SwiftUI automatically rebuilds the interface.

### The View Protocol
Everything you see on screen is a `View`. You build custom views by conforming a struct to the `View` protocol, which requires a single computed property called `body`.

```swift
import SwiftUI

// A standard SwiftUI View
struct ContentView: View {
    // The UI definition
    var body: some View {
        Text("Hello, SwiftUI!")
            .font(.largeTitle)
            .foregroundColor(.blue)
            .padding() // Modifiers act on views and return new, modified views
    }
}
```

### Layout Stacks
You arrange views using stacks: `VStack` (Vertical), `HStack` (Horizontal), and `ZStack` (Depth/Overlay).

```swift
struct ProfileView: View {
    var body: some View {
        VStack(spacing: 20) { // Vertical arrangement
            Image(systemName: "person.circle.fill")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.gray)
            
            HStack { // Horizontal arrangement inside the VStack
                Text("Username:")
                    .bold()
                Text("jappleseed")
            }
            
            Button("Follow") {
                // Button action goes here
                print("Followed!")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

### State Management (`@State`)
Because structs are immutable, you cannot normally change properties inside them. SwiftUI provides property wrappers like `@State` to declare data that can change and should cause the UI to redraw when it does.

```swift
struct CounterView: View {
    // @State tells SwiftUI to manage the storage for this property
    // and redraw the view whenever it changes.
    @State private var tapCount = 0

    var body: some View {
        VStack {
            Text("Tap count: \(tapCount)")
                .font(.title)
            
            Button("Tap Me") {
                // Modifying state triggers a UI update automatically
                tapCount += 1
            }
        }
    }
}
```

### Bindings (`@Binding`)
A `@Binding` creates a two-way connection between a property that stores data (like `@State` in a parent view) and a view that displays and changes the data (like a TextField in a child view).

```swift
struct SettingsView: View {
    @State private var isDarkMode = false
    
    var body: some View {
        // Toggle takes a Binding to a boolean. 
        // We pass it using the $ prefix.
        Toggle("Enable Dark Mode", isOn: $isDarkMode)
            .padding()
    }
}
```

---

## 12. Best Practices

1. **Prefer `let` over `var`:** Immutability makes code predictable, thread-safe, and easier to reason about. Only use variables when you explicitly need state mutation.
2. **Prefer Structs over Classes:** Use value types for data models. It prevents accidental shared state mutations. Only use classes when you need reference semantics, inheritance, or Objective-C compatibility.
3. **Use Meaningful Naming:** Swift code should read like English sentences, especially function calls. Utilize argument labels effectively. `func insert(item: Any, at index: Int)` is better than `func insert(item: Any, index: Int)`.
4. **Avoid Force Unwrapping (`!`):** Almost never use `!`. Use `if let` or `guard let` to handle optionals safely. Force unwrapping is the leading cause of app crashes.
5. **Use `guard` for Early Returns:** It keeps the "happy path" un-nested and visible. Avoid deeply nested `if` statements (Pyramid of Doom).
6. **Embrace Protocol-Oriented Programming:** Instead of building deep class inheritance hierarchies (which become rigid), build small, focused protocols and compose them together.
7. **Leverage Type Inference:** Don't explicitly type everything. `let name = "John"` is cleaner than `let name: String = "John"`. Let the compiler do the work.
8. **Use Access Control:** Use `private`, `fileprivate`, `internal` (default), and `public` to hide implementation details and expose only the necessary API surface.

---

## 13. Common Mistakes

1. **Retain Cycles in Closures:** Forgetting to use `[weak self]` in network calls or long-living closures inside a class. This causes memory leaks and eventually app crashes.
2. **Massive View Controllers (MVC):** In UIKit, putting all networking, data processing, and UI logic into one file. Break logic out into separate helper classes, view models, or services.
3. **Ignoring the `Result` Type:** When performing asynchronous tasks that can fail, returning `(Data?, Error?)` is ambiguous (what if both are nil? what if both have values?). Use Swift's built-in `Result<Success, Failure>` type instead.
4. **Misunderstanding Value Semantics:** Modifying a struct property inside an array, expecting the array element to update without assigning it back. You are modifying a *copy*.
   ```swift
   var users = [User(name: "A")]
   var userA = users[0]
   userA.name = "B" // users[0] is still "A"!
   ```
5. **Overusing Implicitly Unwrapped Optionals (`Type!`):** Often seen when migrating from Objective-C or when dealing with Interface Builder outlets. Treat them as dangerous; they will crash if accessed when nil.

---

## 14. Real-world Examples

### Example 1: Basic App Logic (Fetching and Parsing Data)
This example demonstrates structs, protocols, error handling, optionals, and basic asynchronous flow.

```swift
import Foundation

// 1. Data Model conforming to Codable (for easy JSON parsing)
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    let company: Company? // Optional because not all users might have a company
}

struct Company: Codable {
    let name: String
}

// 2. Custom Error Types
enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingError(Error)
}

// 3. Service Class to handle fetching
class UserService {
    
    // Async/Await syntax (Modern Swift way to handle asynchronous tasks)
    func fetchUsers() async throws -> [User] {
        let urlString = "https://jsonplaceholder.typicode.com/users"
        
        // Safely unwrap the URL
        guard let url = URL(string: urlString) else {
            throw NetworkError.invalidURL
        }
        
        // Network call (async and can throw errors)
        let (data, response) = try await URLSession.shared.data(from: url)
        
        // Ensure we got a valid HTTP response
        guard let httpResponse = response as? HTTPURLResponse, 
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.noData
        }
        
        // Decode JSON into our Swift Structs
        do {
            let decoder = JSONDecoder()
            let users = try decoder.decode([User].self, from: data)
            return users
        } catch {
            throw NetworkError.decodingError(error)
        }
    }
}

// Usage (in an async context, like a Task block in SwiftUI)
Task {
    let service = UserService()
    do {
        let users = try await service.fetchUsers()
        print("Successfully fetched \(users.count) users.")
        if let firstUser = users.first {
            print("First user: \(firstUser.name)")
            // Safe optional chaining to get company name
            print("Works at: \(firstUser.company?.name ?? "Independent")")
        }
    } catch {
        print("Failed to fetch users: \(error)")
    }
}
```

### Example 2: Simple UI Interaction (SwiftUI)
This example builds a simple functional screen combining state management, lists, and layout.

```swift
import SwiftUI

// The Data Model
struct TodoItem: Identifiable {
    let id = UUID() // Unique identifier required for Lists
    var title: String
    var isCompleted: Bool = false
}

// The ViewModel (Handling the logic separated from the View)
class TodoListViewModel: ObservableObject {
    // @Published tells SwiftUI to update any Views watching this data
    @Published var items: [TodoItem] = [
        TodoItem(title: "Learn Swift Basics"),
        TodoItem(title: "Understand Optionals"),
        TodoItem(title: "Build a SwiftUI App")
    ]
    
    func toggle(item: TodoItem) {
        if let index = items.firstIndex(where: { $0.id == item.id }) {
            items[index].isCompleted.toggle()
        }
    }
    
    func delete(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}

// The View
struct TodoListView: View {
    // @StateObject instantiates and observes the ViewModel
    @StateObject private var viewModel = TodoListViewModel()
    
    var body: some View {
        NavigationView {
            List {
                // Iterate over the items
                ForEach(viewModel.items) { item in
                    HStack {
                        // Checkmark icon toggles based on state
                        Image(systemName: item.isCompleted ? "checkmark.circle.fill" : "circle")
                            .foregroundColor(item.isCompleted ? .green : .gray)
                            // Action when tapping the icon
                            .onTapGesture {
                                viewModel.toggle(item: item)
                            }
                        
                        Text(item.title)
                            // Strikethrough if completed
                            .strikethrough(item.isCompleted, color: .gray)
                            .foregroundColor(item.isCompleted ? .gray : .primary)
                    }
                }
                .onDelete(perform: viewModel.delete) // Enable swipe to delete
            }
            .navigationTitle("My Swift Journey")
            .toolbar {
                EditButton() // Adds a standard edit button to the navbar
            }
        }
    }
}

// Preview provider to see the UI in Xcode
struct TodoListView_Previews: PreviewProvider {
    static var previews: some View {
        TodoListView()
    }
}
```

---
*End of Study Guide. Happy Coding!*
