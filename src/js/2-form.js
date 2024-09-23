"use strict";

const formData = {
    email: "",
    message: "",
};

const storageKey = "feedback-form-state";
const feedbackForm = document.querySelector(".feedback-form");

function handleInput(event) {
    const { name, value } = event.target;
    formData[name] = value.trim();

    localStorage.setItem(storageKey, JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            formData.email = parsedData.email || "";
            formData.message = parsedData.message || "";
            feedbackForm.elements.email.value = formData.email;
            feedbackForm.elements.message.value = formData.message;
        } catch (error) {
            console.error("Error parsing data from localStorage:", error);
        }
    }
}

function handleSubmit(event) {
    event.preventDefault();
    if (!formData.email || !formData.message) {
        return alert("Fill please all fields");
    }
    console.log(formData);
    feedbackForm.reset();
    localStorage.removeItem(storageKey);
    formData.email = "";
    formData.message = "";
}

loadFormData();

feedbackForm.addEventListener("input", handleInput);
feedbackForm.addEventListener("submit", handleSubmit);
