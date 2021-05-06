// form https://www.youtube.com/watch?v=WBPrJSw7yQA

export {};
let message = "Hi World";
console.log(message);

let x = 10;
const y = 20;

let sum;
const title = "Hello World";

///////////////
// variables //
///////////////

let is_beginner: boolean = true;
let total: number = 0;
let name: string = "Test";

let sentence: string = `My name is ${name}
I am a beginner in Typescript.`;

console.log(sentence);

// subtypes of all other types
let n: null = null;
let u: undefined = undefined;

// let is_new: boolean = null;
// let my_name: string = undefined;

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// tupel
let person1: [string, number] = ["Chris", 22];

///////////
// enums //
///////////

enum Color {
    Red = 5,
    Green,
    Blue,
}
let c: Color = Color.Green;
console.log(c);

/////////////////
// any/unknown //
/////////////////

let random_value: any = 10;
random_value = true;
random_value = "Test";

// would compile
// console.log(random_value.name);
// random_value();
// random_value.toUpperCase();

// this can't be done with unknown type
let my_variable: unknown = 10;

function has_name(obj: any): obj is { name: string } {
    return !!obj && typeof obj === "object" && "name" in obj;
}

if (has_name(my_variable)) {
    console.log(my_variable.name);
}

// type asserting
// only works if actually is string
// (my_variable as string).toUpperCase();

// type inference

let a;
a = 10;
a = true;

// auto detect type
let b = 20;
// error
// b = true;

// union
let multi_type: number | boolean;
multi_type = 20;
multi_type = true;

// functions
function add(num1: number, num2?: number, num3: number = 10): number {
    if (num2) return num1 + num2 + num3;
    else return num1 + num3;
}
// num2 and num3 are optional
console.log(add(1, 2, 3));
console.log(add(5, 10));
console.log(add(5));

////////////////
// interfaces //
////////////////

interface Person {
    first_name: string;
    // optional
    last_name?: string;
}
function full_name(person: Person) {
    console.log(`${person.first_name} ${person.last_name}`);
}

let p = {
    first_name: "Bruce",
    last_name: "Wayne",
};

full_name(p);

// classes
// default: everything is public
class Employee {
    // can't even be accessed in derived class
    // private name: string;
    // can only be accessed by base and derived classes
    // protected name: string;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log(`Guten Tag, ich bin ${this.name}.`);
    }
}

let emp1 = new Employee("Chris");
console.log(emp1.name);
emp1.greet();

// inheritance
class Manager extends Employee {
    constructor(name: string) {
        super(name);
    }
    delegate_work() {
        console.log(`Manager doing funky stuff.`);
    }
}
let m1 = new Manager("Bruce");
m1.delegate_work();
m1.greet();
console.log(m1.name);
