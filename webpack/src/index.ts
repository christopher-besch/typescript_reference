import { formData } from "./forms";

const form = document.querySelector("form")!;
console.log("test");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = formData(form);
    console.log(data);
});
