# Comprehensive Java Study Guide: From Basics to Advanced Concepts

This guide is designed as an exhaustive, beginner-to-intermediate educational resource for Java. It focuses on practical understanding, conceptual clarity, and foundational depth through comprehensive explanations, code examples, and best practices.

---

## Table of Contents
1. [Introduction to Java](#1-introduction-to-java)
2. [Basics](#2-basics)
3. [Control Flow](#3-control-flow)
4. [Functions / Methods](#4-functions--methods)
5. [Object-Oriented Programming (OOP)](#5-object-oriented-programming-oop)
6. [Arrays and Strings](#6-arrays-and-strings)
7. [Exception Handling](#7-exception-handling)
8. [Collections Framework](#8-collections-framework)
9. [File Handling](#9-file-handling)
10. [Multithreading (Basics)](#10-multithreading-basics)
11. [Java Memory Management](#11-java-memory-management)
12. [Best Practices](#12-best-practices)
13. [Common Mistakes](#13-common-mistakes)
14. [Real-world Examples](#14-real-world-examples)

---

## 1. Introduction to Java

### What is Java?
Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Created by James Gosling at Sun Microsystems (now owned by Oracle) and released in 1995, it was built on the philosophy of **"Write Once, Run Anywhere" (WORA)**. This means that compiled Java code can run on all platforms that support Java without the need for recompilation.

### Features of Java
1. **Object-Oriented:** Everything in Java revolves around objects and classes. This makes it easier to manage large software architectures.
2. **Platform-Independent:** Java is compiled into platform-independent bytecode, which is then interpreted by the JVM on the underlying operating system.
3. **Simple & Familiar:** Java's syntax is based on C++, making it familiar to many programmers, but it removes complexities like explicit pointers and operator overloading.
4. **Secure:** Java operates in a virtual machine (sandbox) and lacks explicit pointers, heavily restricting unauthorized memory access.
5. **Robust:** Strong memory management (Garbage Collection) and strict compile-time/runtime checking for data typing and exception handling.
6. **Multithreaded:** Native support for multithreading allows concurrent execution of two or more parts of a program.

### JVM, JRE, and JDK

Understanding the distinction between these three is crucial:

1. **JVM (Java Virtual Machine):** 
   - An abstract machine that enables your computer to run a Java program. 
   - When you compile a `.java` file, the compiler generates a `.class` file containing **bytecode**. The JVM executes this bytecode line by line.
   - The JVM is platform-dependent (there are different JVMs for Windows, Mac, Linux), but it makes Java platform-independent.

2. **JRE (Java Runtime Environment):**
   - The JRE contains the JVM plus Java binaries and other class libraries needed to run a Java application.
   - If you only want to *run* a Java program, you just need the JRE.

3. **JDK (Java Development Kit):**
   - The complete toolkit for developing Java applications.
   - It contains the JRE + development tools like the compiler (`javac`), archiver (`jar`), and documentation generator (`javadoc`).

```ascii
JDK = JRE + Development Tools
JRE = JVM + Library Classes
```

---

## 2. Basics

### Anatomy of a Java Program

Every Java application begins with a class name, and that class must match the filename. The program starts executing from the `main` method.

```java
// File: HelloWorld.java
public class HelloWorld {
    
    // The main method is the entry point of any Java application.
    // public: accessible from anywhere (so JVM can invoke it)
    // static: can be called without creating an instance of the class
    // void: doesn't return any value
    // String[] args: command-line arguments passed to the program
    public static void main(String[] args) {
        
        // System.out is a standard output stream.
        // println prints the string followed by a new line.
        System.out.println("Hello, World!");
    }
}
```

### Variables and Data Types

Java is a **statically typed** language, meaning every variable must be declared with a specific data type before it can be used.

#### Primitive Data Types (8 types)

Primitive types represent single, basic values. They are not objects.

1. **Integer Types:**
   - `byte` (8-bit): -128 to 127
   - `short` (16-bit): -32,768 to 32,767
   - `int` (32-bit): Default choice for whole numbers. (-2^31 to 2^31-1)
   - `long` (64-bit): Used when `int` is not large enough. Suffixed with `L`.

2. **Floating-Point Types:**
   - `float` (32-bit): Single precision. Suffixed with `f`.
   - `double` (64-bit): Double precision. Default choice for decimals.

3. **Character Type:**
   - `char` (16-bit Unicode): Holds a single character, enclosed in single quotes.

4. **Boolean Type:**
   - `boolean`: Represents `true` or `false`.

```java
public class DataTypesExample {
    public static void main(String[] args) {
        // Integer types
        byte myByte = 100;
        short myShort = 5000;
        int myInt = 100000;
        long myLong = 15000000000L; // Note the 'L'
        
        // Floating point types
        float myFloat = 10.5f; // Note the 'f'
        double myDouble = 20.99;
        
        // Character type
        char myChar = 'A';
        char unicodeChar = '\u0041'; // Also 'A'
        
        // Boolean type
        boolean isJavaFun = true;
        
        System.out.println("Int value: " + myInt);
        System.out.println("Boolean value: " + isJavaFun);
    }
}
```

#### Non-Primitive (Reference) Data Types
These refer to objects and are created by programmers (except `String`, arrays, etc., which are built-in). Default value is `null`.
Examples: `String`, Arrays, Classes, Interfaces.

### Operators

Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.

```java
public class OperatorsExample {
    public static void main(String[] args) {
        // 1. Arithmetic Operators: +, -, *, /, %
        int a = 10;
        int b = 3;
        System.out.println("Addition: " + (a + b)); // 13
        System.out.println("Modulo: " + (a % b));   // 1 (remainder)

        // 2. Relational (Comparison) Operators: ==, !=, >, <, >=, <=
        System.out.println("Is a > b? " + (a > b)); // true
        
        // 3. Logical Operators: && (AND), || (OR), ! (NOT)
        boolean condition1 = (a > 5);
        boolean condition2 = (b > 5);
        System.out.println("AND: " + (condition1 && condition2)); // false
        System.out.println("OR: " + (condition1 || condition2));  // true
        
        // 4. Assignment Operators: =, +=, -=, *=, /=, %=
        int c = 5;
        c += 3; // Equivalent to c = c + 3;
        System.out.println("Value of c: " + c); // 8
        
        // 5. Unary Operators: ++ (increment), -- (decrement)
        int count = 0;
        count++; // Post-increment
        ++count; // Pre-increment
        System.out.println("Count is: " + count); // 2
    }
}
```

### Type Casting

Type casting is when you assign a value of one primitive data type to another type.

1. **Widening Casting (Implicit):** Converting a smaller type to a larger type size. Done automatically by Java.
   `byte` -> `short` -> `char` -> `int` -> `long` -> `float` -> `double`

2. **Narrowing Casting (Explicit):** Converting a larger type to a smaller size type. Done manually by placing the type in parentheses.
   `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`

```java
public class TypeCasting {
    public static void main(String[] args) {
        // Widening Casting (Automatic)
        int myInt = 9;
        double myDouble = myInt; // Automatic casting: int to double
        
        System.out.println(myInt);      // Outputs 9
        System.out.println(myDouble);   // Outputs 9.0
        
        // Narrowing Casting (Manual)
        double myPreciseDouble = 9.78d;
        int myTruncatedInt = (int) myPreciseDouble; // Manual casting: double to int
        
        System.out.println(myPreciseDouble);   // Outputs 9.78
        System.out.println(myTruncatedInt);    // Outputs 9 (decimal part is lost)
    }
}
```

---

## 3. Control Flow

Control flow statements break up the flow of execution by employing decision making, looping, and branching, enabling your program to conditionally execute blocks of code.

### Conditional Statements: if, else if, else

Executes different blocks of code based on conditions evaluated to `true` or `false`.

```java
public class IfElseExample {
    public static void main(String[] args) {
        int time = 20;
        
        if (time < 12) {
            System.out.println("Good morning.");
        } else if (time < 18) {
            System.out.println("Good afternoon.");
        } else {
            System.out.println("Good evening.");
        }
        
        // Ternary Operator (Shorthand if-else)
        // variable = (condition) ? expressionTrue :  expressionFalse;
        String greeting = (time < 18) ? "Good day." : "Good evening.";
        System.out.println(greeting);
    }
}
```

### Switch Statement

Used when a single variable is evaluated against many possible constant values.

```java
public class SwitchExample {
    public static void main(String[] args) {
        int dayOfWeek = 3;
        String dayName;
        
        switch (dayOfWeek) {
            case 1:
                dayName = "Monday";
                break; // Essential: breaks out of the switch block
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
            case 7:
                // Grouping cases (Fall-through)
                dayName = "Weekend";
                break;
            default:
                dayName = "Invalid day";
                // default doesn't strictly need a break, but it's good practice
        }
        
        System.out.println("Day is: " + dayName);
    }
}
```

### Loops

Loops execute a block of code repeatedly as long as a specified condition is reached.

#### 1. The `for` Loop
Best used when you know exactly how many times you want to loop.

```java
public class ForLoopExample {
    public static void main(String[] args) {
        // 1. Initialization: executed once before loop starts
        // 2. Condition: loop runs as long as this is true
        // 3. Update: executed every time after loop body runs
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteration: " + i);
        }
    }
}
```

#### 2. The `while` Loop
Loops through a block of code as long as a specified condition is `true`. Best used when the number of iterations is unknown in advance.

```java
public class WhileLoopExample {
    public static void main(String[] args) {
        int i = 0; // Initialization
        
        while (i < 5) { // Condition
            System.out.println("Value: " + i);
            i++; // Update (Crucial, or you get an infinite loop)
        }
    }
}
```

#### 3. The `do-while` Loop
Similar to a while loop, but it evaluates the condition *after* executing the block. This ensures the code block executes at least once.

```java
public class DoWhileExample {
    public static void main(String[] args) {
        int i = 10;
        
        do {
            System.out.println("Value in do-while: " + i);
            i++;
        } while (i < 5); // Condition is false, but body executed once
    }
}
```

#### Break and Continue
- `break`: Jumps out of the loop completely.
- `continue`: Skips the current iteration and jumps to the next iteration of the loop.

---

## 4. Functions / Methods

A method is a block of code which only runs when it is called. You can pass data (parameters) into a method. Methods are used to perform certain actions, and they are also known as functions. They promote code reusability.

### Method Declaration

```java
public class MethodExample {
    
    // Method declaration
    // access_modifier return_type method_name(parameters...)
    public static void sayHello() {
        System.out.println("Hello from a method!");
    }
    
    public static void main(String[] args) {
        // Method invocation
        sayHello();
    }
}
```

### Parameters and Return Types

Methods can take inputs (parameters) and can return an output to the caller.

```java
public class Calculator {
    
    // This method takes two integer parameters and returns an integer
    public static int addNumbers(int num1, int num2) {
        int sum = num1 + num2;
        return sum; // The 'return' keyword sends data back
    }
    
    // A method with a 'void' return type does not return a value
    public static void printGreeting(String name) {
        System.out.println("Welcome, " + name + "!");
    }

    public static void main(String[] args) {
        int result = addNumbers(15, 25);
        System.out.println("The sum is: " + result);
        
        printGreeting("Alice");
    }
}
```

### Method Overloading

With method overloading, multiple methods can have the same name as long as they have different parameters (different number, types, or order of parameters). It increases program readability.

```java
public class OverloadingExample {
    
    // Method 1: two int parameters
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    // Method 2: three int parameters
    public static int multiply(int a, int b, int c) {
        return a * b * c;
    }
    
    // Method 3: two double parameters
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    public static void main(String[] args) {
        System.out.println(multiply(2, 3));       // Calls Method 1 (Outputs 6)
        System.out.println(multiply(2, 3, 4));    // Calls Method 2 (Outputs 24)
        System.out.println(multiply(2.5, 3.5));   // Calls Method 3 (Outputs 8.75)
    }
}
```

---

## 5. Object-Oriented Programming (OOP)

OOP is a programming paradigm based on the concept of "objects," which can contain data (fields/attributes) and code (methods/behaviors).

### Classes and Objects

- **Class:** A blueprint or template for creating objects. It defines state (variables) and behavior (methods).
- **Object:** An instance of a class. When a class is defined, no memory is allocated until an object is created.

```java
// Defining a Class
public class Car {
    // Fields (State / Attributes)
    String color;
    String model;
    int year;
    boolean isRunning;
    
    // Methods (Behavior)
    public void startEngine() {
        isRunning = true;
        System.out.println(model + " engine started. Vroom!");
    }
    
    public void stopEngine() {
        isRunning = false;
        System.out.println(model + " engine stopped.");
    }
}

class MainApp {
    public static void main(String[] args) {
        // Creating an Object using the 'new' keyword
        Car myCar = new Car();
        
        // Accessing attributes
        myCar.color = "Red";
        myCar.model = "Mustang";
        myCar.year = 2023;
        
        // Calling methods
        myCar.startEngine();
    }
}
```

### Constructors

A constructor is a special method used to initialize objects. It is called automatically when an object of a class is created.
- It must have the exact same name as the class.
- It cannot have a return type (not even `void`).

```java
public class User {
    String username;
    int age;
    
    // Default constructor (provided by Java if no constructors are explicitly written)
    public User() {
        this.username = "Guest";
        this.age = 0;
    }
    
    // Parameterized constructor
    public User(String username, int age) {
        // 'this' refers to the current instance variables
        this.username = username;
        this.age = age;
    }
    
    public void displayInfo() {
        System.out.println("User: " + username + ", Age: " + age);
    }
    
    public static void main(String[] args) {
        User user1 = new User(); // Calls default constructor
        User user2 = new User("JohnDoe", 25); // Calls parameterized constructor
        
        user1.displayInfo();
        user2.displayInfo();
    }
}
```

### The 4 Pillars of OOP

#### 1. Encapsulation
The wrapping up of data (variables) and code acting on the data (methods) together as a single unit. It hides the internal state of an object and requires all interaction to be performed through an object's methods (getters and setters).

- Use `private` access modifier for variables.
- Provide `public` getter and setter methods.

```java
public class BankAccount {
    // Hidden data
    private double balance;
    
    // Constructor
    public BankAccount(double initialBalance) {
        if(initialBalance > 0) {
            this.balance = initialBalance;
        }
    }
    
    // Getter method (Read access)
    public double getBalance() {
        return this.balance;
    }
    
    // Setter method (Write access, with validation!)
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }
}
```

#### 2. Inheritance
The mechanism where a new class inherits properties and behaviors (methods and fields) from an existing class. It establishes a parent-child (IS-A) relationship. Promotes code reusability.
- **Superclass (Parent):** The class being inherited from.
- **Subclass (Child):** The class that inherits. Uses the `extends` keyword.

```java
// Parent Class
class Animal {
    protected String name; // protected: accessible within package and subclasses
    
    public void eat() {
        System.out.println(name + " is eating.");
    }
}

// Child Class
class Dog extends Animal {
    public Dog(String name) {
        this.name = name; // Inherited from Animal
    }
    
    public void bark() {
        System.out.println(name + " is barking.");
    }
}

class InheritanceTest {
    public static void main(String[] args) {
        Dog myDog = new Dog("Buddy");
        myDog.eat();  // Inherited method
        myDog.bark(); // Specific method
    }
}
```

#### 3. Polymorphism
Means "many forms." It allows us to perform a single action in different ways. In Java, this occurs mainly via **Method Overloading** (Compile-time) and **Method Overriding** (Runtime).

**Method Overriding:** A subclass provides a specific implementation for a method that is already defined in its superclass.

```java
class Shape {
    public void draw() {
        System.out.println("Drawing a generic shape");
    }
}

class Circle extends Shape {
    // The @Override annotation helps prevent typos and verifies overriding
    @Override
    public void draw() {
        System.out.println("Drawing a circle \u25EF");
    }
}

class Square extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a square \u25A1");
    }
}

class PolymorphismTest {
    public static void main(String[] args) {
        // Polymorphism in action: Superclass reference variable pointing to Subclass objects
        Shape s1 = new Shape();
        Shape s2 = new Circle();
        Shape s3 = new Square();
        
        s1.draw(); // Output: Drawing a generic shape
        s2.draw(); // Output: Drawing a circle ◯
        s3.draw(); // Output: Drawing a square □
    }
}
```

#### 4. Abstraction
Hiding the internal implementation details and showing only functionality to the users. Achieved using **Abstract Classes** and **Interfaces**.

- **Abstract Class:** Cannot be instantiated. Can contain both abstract (without body) and non-abstract methods.
- **Interface:** A contract. A completely "abstract class" that is used to group related methods with empty bodies. A class `implements` an interface.

```java
// Abstract class
abstract class Vehicle {
    String brand = "Unknown";
    
    // Abstract method (does not have a body)
    public abstract void move();
    
    // Regular method
    public void honk() {
        System.out.println("Beep beep!");
    }
}

class Motorcycle extends Vehicle {
    @Override
    public void move() {
        // Providing implementation for the abstract method
        System.out.println("Motorcycle is riding on two wheels.");
    }
}

// Interface
interface Flyable {
    void fly(); // implicitly public and abstract
}

class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("Airplane is flying in the sky.");
    }
}
```

---

## 6. Arrays and Strings

### Arrays
An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created. After creation, its length is fixed. Array indices are 0-based.

```java
public class ArrayExample {
    public static void main(String[] args) {
        // 1. Declaration and Instantiation
        int[] numbers = new int[5]; // Array of 5 integers. Default values are 0.
        
        // 2. Initialization
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;
        
        // 3. Declaration + Initialization literal
        String[] fruits = {"Apple", "Banana", "Cherry", "Date"};
        
        // 4. Iterating over an array using a standard for loop
        System.out.println("Numbers Array:");
        for(int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }
        
        // 5. Enhanced for-loop (for-each) - best for reading array elements
        System.out.println("\nFruits Array:");
        for(String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // 6. Multidimensional Arrays (Arrays of Arrays)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("Matrix element [1][2]: " + matrix[1][2]); // 6
    }
}
```

### String Class

A `String` in Java is an object that represents a sequence of characters.
**Crucial Concept:** Strings in Java are **Immutable**. Once a String object is created, its data or state can't be changed. Modification creates a *new* String object.

```java
public class StringExample {
    public static void main(String[] args) {
        // Creating strings
        String str1 = "Hello";             // Uses String Pool (memory optimization)
        String str2 = new String("World"); // Forces creation in heap memory
        
        // String Concatenation
        String fullName = "John" + " " + "Doe";
        
        // Important String Methods
        String text = "  Java Programming  ";
        
        System.out.println("Length: " + text.length());                // 20
        System.out.println("Trim: '" + text.trim() + "'");             // "Java Programming" (removes leading/trailing spaces)
        System.out.println("Uppercase: " + text.toUpperCase());        // "  JAVA PROGRAMMING  "
        System.out.println("Substring: " + text.trim().substring(5));  // "Programming"
        System.out.println("Contains: " + text.contains("Java"));      // true
        
        // Comparing Strings (NEVER USE == for String content comparison)
        String a = "test";
        String b = "test";
        String c = new String("test");
        
        System.out.println(a.equals(b)); // true (compares values)
        System.out.println(a.equals(c)); // true (compares values)
        System.out.println(a == b);      // true (same reference in String Pool)
        System.out.println(a == c);      // false (different references in memory)
    }
}
```

### StringBuilder

Because Strings are immutable, performing repeated concatenations (like inside a loop) creates many discarded intermediate String objects, consuming memory and processing time.
Use `StringBuilder` (or thread-safe `StringBuffer`) when you need to manipulate strings frequently.

```java
public class StringBuilderExample {
    public static void main(String[] args) {
        // StringBuilder is mutable
        StringBuilder sb = new StringBuilder("Java");
        
        sb.append(" is");
        sb.append(" awesome");
        
        sb.insert(4, " 17"); // Inserts at index 4
        
        System.out.println(sb.toString()); // Output: Java 17 is awesome
        
        sb.reverse(); // Reverses the characters
        System.out.println(sb.toString()); // Output: emosewa si 71 avaJ
    }
}
```

---

## 7. Exception Handling

An exception is an unwanted or unexpected event occurring during the execution of a program (runtime) that disrupts the normal flow of instructions. Java provides a robust way to handle them so the program can fail gracefully.

### try-catch-finally Block

- `try`: Block of code to monitor for exceptions.
- `catch`: Block of code that handles the specific exception thrown in the try block.
- `finally`: Block of code that will *always* execute, regardless of whether an exception occurred or not (used for cleanup like closing files).

```java
public class TryCatchExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        
        try {
            // Risky code that might throw an exception
            System.out.println("Accessing element: " + numbers[10]); // Throws ArrayIndexOutOfBoundsException
            int result = 10 / 0; // Throws ArithmeticException (won't reach here)
        } 
        catch (ArrayIndexOutOfBoundsException e) {
            // Handing specific exception
            System.out.println("Error: Array index is out of bounds!");
            // e.printStackTrace(); // Useful for debugging
        } 
        catch (Exception e) {
            // Generic catch-all for any other exceptions (Must be at the bottom)
            System.out.println("An unexpected error occurred: " + e.getMessage());
        } 
        finally {
            // Always executes
            System.out.println("The try-catch is finished. Cleaning up resources...");
        }
        
        System.out.println("Program continues executing normally...");
    }
}
```

### `throw` and `throws`

- `throw`: Used to explicitly throw a custom or built-in exception from within a method.
- `throws`: Used in the method signature to declare that this method *might* throw an exception, passing the responsibility to the caller to handle it.

```java
import java.io.IOException;

public class ThrowThrowsExample {
    
    // Using throws to declare potential exceptions
    public static void checkAge(int age) throws IllegalArgumentException {
        if (age < 18) {
            // Using throw to trigger the exception
            throw new IllegalArgumentException("Access denied: Must be at least 18 years old.");
        } else {
            System.out.println("Access granted.");
        }
    }
    
    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}
```

### Custom Exceptions

You can create your own exception classes by extending `Exception` (for Checked exceptions) or `RuntimeException` (for Unchecked exceptions).

```java
// Custom Unchecked Exception
class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    double balance = 100.0;
    
    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException("Cannot withdraw " + amount + ", balance is only " + balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount);
    }
}
```

---

## 8. Collections Framework

The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes Interfaces, Implementations (Classes), and Algorithms.

**Hierarchy Basics:**
`Iterable` -> `Collection`
- `List`: Ordered collection, allows duplicates.
- `Set`: Unordered collection, no duplicates.
- `Queue`: First-In-First-Out (FIFO) processing.
`Map`: Not part of Collection interface hierarchy. Stores Key-Value pairs.

### List (ArrayList)

`ArrayList` is a resizable array. As you add elements, it grows automatically.

```java
import java.util.ArrayList;
import java.util.List;

public class ListExample {
    public static void main(String[] args) {
        // Creating an ArrayList (Note the use of Wrapper class Integer, not int)
        List<String> cities = new ArrayList<>();
        
        // Adding elements
        cities.add("New York");
        cities.add("London");
        cities.add("Tokyo");
        cities.add("London"); // Lists allow duplicates
        
        // Accessing elements
        System.out.println("First city: " + cities.get(0));
        
        // Modifying
        cities.set(1, "Paris");
        
        // Removing
        cities.remove("Tokyo");
        
        // Size
        System.out.println("List size: " + cities.size());
        
        // Iterating
        for (String city : cities) {
            System.out.println(city);
        }
    }
}
```

### Set (HashSet)

`HashSet` stores elements in a hash table. It does not guarantee insertion order and does not allow duplicate elements.

```java
import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        Set<String> uniqueNames = new HashSet<>();
        
        uniqueNames.add("Alice");
        uniqueNames.add("Bob");
        uniqueNames.add("Charlie");
        
        // Attempting to add a duplicate
        boolean isAdded = uniqueNames.add("Alice");
        System.out.println("Was second Alice added? " + isAdded); // false
        
        System.out.println("Set contents: " + uniqueNames); // Order is not guaranteed
        
        if (uniqueNames.contains("Bob")) {
            System.out.println("Bob is in the set.");
        }
    }
}
```

### Map (HashMap)

`HashMap` stores data in key-value pairs. Keys must be unique, but values can be duplicated.

```java
import java.util.HashMap;
import java.util.Map;

public class MapExample {
    public static void main(String[] args) {
        // Key: String, Value: Integer
        Map<String, Integer> userAges = new HashMap<>();
        
        // Adding entries
        userAges.put("Alice", 28);
        userAges.put("Bob", 34);
        userAges.put("Charlie", 22);
        
        // Updating an entry (put overwrites if key exists)
        userAges.put("Alice", 29);
        
        // Retrieving a value
        System.out.println("Bob's age: " + userAges.get("Bob"));
        
        // Checking if key exists
        if (userAges.containsKey("Charlie")) {
            System.out.println("Charlie is present.");
        }
        
        // Iterating over a Map
        for (Map.Entry<String, Integer> entry : userAges.entrySet()) {
            System.out.println("User: " + entry.getKey() + ", Age: " + entry.getValue());
        }
    }
}
```

---

## 9. File Handling

Java uses the `java.io` and newer `java.nio` packages for file handling. Let's look at the basic approaches for reading and writing text files.

### Writing to a File

```java
import java.io.FileWriter;
import java.io.IOException;

public class WriteFileExample {
    public static void main(String[] args) {
        String data = "Learning Java File Handling is fun!\nLine two.";
        
        // The try-with-resources statement ensures that resources are automatically 
        // closed at the end of the statement, preventing memory/file handle leaks.
        try (FileWriter writer = new FileWriter("output.txt")) {
            writer.write(data);
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred during writing.");
            e.printStackTrace();
        }
    }
}
```

### Reading from a File

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ReadFileExample {
    public static void main(String[] args) {
        try {
            File myFile = new File("output.txt");
            Scanner reader = new Scanner(myFile);
            
            System.out.println("Reading file contents:");
            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                System.out.println(line);
            }
            reader.close(); // Don't forget to close the scanner!
            
        } catch (FileNotFoundException e) {
            System.out.println("The file was not found.");
            e.printStackTrace();
        }
    }
}
```
*Note: For modern Java (Java 8+), `java.nio.file.Files` provides highly efficient, one-liner methods like `Files.readAllLines(Path)` and `Files.write(Path, Iterable)`.*

---

## 10. Multithreading (Basics)

Multithreading is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. A thread is the smallest unit of processing.

There are two main ways to create a thread:
1. Extending the `Thread` class.
2. Implementing the `Runnable` interface.

### Implementing the Runnable Interface (Preferred Way)

Implementing `Runnable` is preferred because Java does not support multiple inheritance. If you extend `Thread`, you cannot extend any other class.

```java
// 1. Create a class that implements Runnable
class MyTask implements Runnable {
    private String taskName;

    public MyTask(String name) {
        this.taskName = name;
    }

    // 2. Override the run() method. This is the entry point for the thread.
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(taskName + " - step " + i);
            try {
                // Pause thread execution for 500 milliseconds
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(taskName + " interrupted.");
            }
        }
        System.out.println(taskName + " finished.");
    }
}

public class MultithreadingExample {
    public static void main(String[] args) {
        System.out.println("Main thread starting...");

        // 3. Create instances of the Runnable class
        MyTask task1 = new MyTask("Task A");
        MyTask task2 = new MyTask("Task B");

        // 4. Create Thread objects, passing the Runnable objects into the constructor
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        // 5. Start the threads (This calls the run() method in a separate call stack)
        // DO NOT call run() directly, as it will execute in the current thread sequentially.
        thread1.start();
        thread2.start();

        System.out.println("Main thread logic finished, waiting for child threads...");
    }
}
```
*Output order is unpredictable because the OS thread scheduler decides which thread runs when.*

---

## 11. Java Memory Management

Unlike languages like C/C++ where developers must manually allocate and deallocate memory, Java handles memory management automatically.

### The Stack and The Heap

Java memory is roughly divided into two main parts:

1. **Stack Memory:**
   - Used for static memory allocation and execution of threads.
   - Contains primitive values specific to a method and **references** to objects in the heap.
   - Variables are strictly bound to the scope (method). Once a method completes, its variables are popped off the stack and memory is freed immediately.
   - Extremely fast access.
   - LIFO (Last-In-First-Out) order.

2. **Heap Memory:**
   - Used for dynamic memory allocation.
   - **All Objects** (including Strings and Arrays) are stored in the Heap.
   - References to these objects are stored in the Stack.
   - Memory here is not automatically freed when a method ends. This is where Garbage Collection comes in.

### Garbage Collection (GC)

Garbage Collection is the automatic process of looking at heap memory, identifying which objects are in use and which are not, and deleting the unused objects.
- An in-use object (referenced object) means that some part of your program still maintains a pointer to that object.
- An unused object (unreferenced object) is no longer referenced by any part of your program. The memory used by an unreferenced object can be reclaimed.
- You cannot force Garbage Collection (though you can suggest it via `System.gc()`), the JVM runs it automatically in the background.

```java
public class GCExample {
    public static void main(String[] args) {
        Object obj1 = new Object(); // Object created in heap, obj1 reference in stack
        Object obj2 = new Object(); // Another object in heap
        
        obj1 = obj2; // obj1 now points to obj2's object. 
                     // The first object created is now unreachable!
                     // It is eligible for Garbage Collection.
                     
        obj2 = null; // Removing reference.
    }
}
```

---

## 12. Best Practices

Writing good Java code isn't just about making it run; it's about making it readable, maintainable, and robust.

### 1. Naming Conventions (CamelCase)
- **Classes / Interfaces:** `PascalCase` (e.g., `CustomerAccount`, `List`). Nouns.
- **Methods:** `camelCase` (e.g., `calculateTotal()`, `printReport()`). Verbs.
- **Variables:** `camelCase` (e.g., `totalPrice`, `firstName`).
- **Constants (static final):** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `PI`).

### 2. General Practices
- **Program to an Interface:** Use interfaces for types whenever possible to maintain flexibility.
  *Good:* `List<String> list = new ArrayList<>();`
  *Bad:* `ArrayList<String> list = new ArrayList<>();`
- **Use meaningful variable names:** Avoid `int d` (elapsed time in days). Use `int elapsedTimeInDays`.
- **Minimize variable scope:** Declare variables as close to where they are used as possible.
- **DRY (Don't Repeat Yourself):** Extract repeated code into reusable methods.
- **SOLID Principles:** Strive to follow SOLID principles in OOP design (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
- **Use Enums:** Instead of using magic numbers or arbitrary strings for categories/states, use `enum`.

---

## 13. Common Mistakes

1. **NullPointerException (NPE):** The most common exception. Occurs when you try to call a method or access an attribute on an object reference that is `null`.
   *Fix:* Always initialize objects, or check for null before operating on them.
2. **Using `==` to compare Strings:** `==` compares object references (memory addresses). `equals()` compares the actual textual content. Always use `equals()` for Strings!
3. **Memory Leaks via Collections:** Adding objects to a static `List` or `Map` and forgetting to remove them when no longer needed. The Garbage Collector cannot clean them up because the static collection still holds a reference.
4. **Swallowing Exceptions:** Catching an exception and doing nothing (empty catch block). It hides the error completely. At a minimum, log the error or print the stack trace.
5. **Ignoring Generics Warnings:** Using raw types (e.g., `List` instead of `List<String>`) removes type safety and can lead to `ClassCastException` at runtime.

---

## 14. Real-world Examples

### Example 1: Simple Console Utility - Number Guesser

A complete, runnable program combining loops, conditionals, and standard input.

```java
import java.util.Scanner;
import java.util.Random;

public class NumberGuesser {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        int numberToGuess = random.nextInt(100) + 1; // 1 to 100
        int attempts = 0;
        boolean hasWon = false;
        
        System.out.println("Welcome to the Number Guesser!");
        System.out.println("I'm thinking of a number between 1 and 100.");
        
        while (!hasWon) {
            System.out.print("Enter your guess: ");
            
            // Basic input validation
            if (!scanner.hasNextInt()) {
                System.out.println("Please enter a valid number.");
                scanner.next(); // consume invalid input
                continue;
            }
            
            int guess = scanner.nextInt();
            attempts++;
            
            if (guess < 1 || guess > 100) {
                System.out.println("Please guess within the range of 1 to 100.");
            } else if (guess < numberToGuess) {
                System.out.println("Too low! Try again.");
            } else if (guess > numberToGuess) {
                System.out.println("Too high! Try again.");
            } else {
                hasWon = true;
                System.out.println("Congratulations! You guessed the number " + numberToGuess + " in " + attempts + " attempts.");
            }
        }
        
        scanner.close();
    }
}
```

### Example 2: Basic OOP Project - Library Management System

This example demonstrates Encapsulation, Relationships (Classes interacting), and Collections.

```java
import java.util.ArrayList;
import java.util.List;

// Entity Class representing a Book
class Book {
    private String title;
    private String author;
    private boolean isCheckedOut;
    
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.isCheckedOut = false;
    }
    
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isCheckedOut() { return isCheckedOut; }
    
    public void setCheckedOut(boolean status) {
        this.isCheckedOut = status;
    }
    
    @Override
    public String toString() {
        return "'" + title + "' by " + author + (isCheckedOut ? " (Checked Out)" : " (Available)");
    }
}

// Manager Class representing the Library
class Library {
    private List<Book> collection;
    
    public Library() {
        this.collection = new ArrayList<>();
    }
    
    public void addBook(Book book) {
        collection.add(book);
        System.out.println("Added: " + book.getTitle());
    }
    
    public void displayBooks() {
        System.out.println("\n--- Library Catalog ---");
        for (Book book : collection) {
            System.out.println(book);
        }
        System.out.println("-----------------------");
    }
    
    public void checkoutBook(String title) {
        for (Book book : collection) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                if (!book.isCheckedOut()) {
                    book.setCheckedOut(true);
                    System.out.println("Successfully checked out: " + title);
                    return;
                } else {
                    System.out.println("Sorry, '" + title + "' is already checked out.");
                    return;
                }
            }
        }
        System.out.println("Error: Book '" + title + "' not found in library.");
    }
}

// Main Application Runner
public class LibraryApp {
    public static void main(String[] args) {
        Library myLib = new Library();
        
        // Adding books
        myLib.addBook(new Book("The Hobbit", "J.R.R. Tolkien"));
        myLib.addBook(new Book("1984", "George Orwell"));
        myLib.addBook(new Book("Clean Code", "Robert C. Martin"));
        
        // Viewing initial state
        myLib.displayBooks();
        
        // Interactions
        myLib.checkoutBook("1984");
        myLib.checkoutBook("The Hobbit");
        
        // Trying to checkout an already checked-out book
        myLib.checkoutBook("1984");
        
        // Trying to checkout non-existent book
        myLib.checkoutBook("Dune");
        
        // Viewing final state
        myLib.displayBooks();
    }
}
```

---
*End of Java Study Guide. Keep coding!*
