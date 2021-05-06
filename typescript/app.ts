export {};

console.log("Hello World!");

function welcome_person(person:Person):string {
    console.log(`Hey ${person.first_name} ${person.last_name}`);
    return `Hey ${person.first_name} ${person.last_name}`;
}

const james = {
    first_name: "James",
    last_name: "Quick"
}

welcome_person(james);

interface Person {
    first_name: string,
    last_name: string
}
