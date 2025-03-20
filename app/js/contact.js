/*document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const inputs = document.querySelectorAll(".form input");
    const submitButton = document.querySelector("#ContactForm button");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true;
        let errorMessage = "";

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                errorMessage += `${input.placeholder} is required.\n`;
                input.style.border = "2px solid red"; // Highlight empty fields
            } else {
                input.style.border = "1px solid #ccc"; // Reset border if filled
            }
        });

        if (!isValid) {
            alert("Please fill out all required fields:\n" + errorMessage);
        } else {
            alert("Form submitted successfully!");
            form.reset(); // Clear form fields after submission
        }
    });
});*/

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form"); // Select the form
    const submitButton = document.querySelector("#ContactForm button");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents page refresh

        let isValid = true;
        const inputs = document.querySelectorAll(".form input");

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                alert(`Please fill in the ${input.placeholder} field.`);
                return;
            }
        });

        if (isValid) {
            alert("Form submitted successfully!");

            // ✅ Clear form fields after submission
            inputs.forEach(input => input.value = ""); 
        }
    });
});

