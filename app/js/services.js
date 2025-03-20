document.getElementById("service").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission

    const carMakeModel = document.querySelector(".text-1").value.trim();
    const name = document.querySelector(".text-2").value.trim();
    const email = document.querySelector(".text-3").value.trim();
    const phone = document.querySelector(".text-4").value.trim();
    const service = document.getElementById("select-car-service").value;
    const responseMessage = document.getElementById("responseMessage");

    let errorMessage = "";

    // Validations
    if (!carMakeModel) errorMessage += "Please enter the car make and model.\n";
    if (!name) errorMessage += "Please enter a valid name.\n";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errorMessage += "Please enter a valid email address.\n";
    if (!/^\d{10}$/.test(phone))
        errorMessage += "Please enter a valid 10-digit phone number.\n";
    if (!service || service === "Select Service")
        errorMessage += "Please select a valid service from the dropdown.\n";

    // Show error or success message
    if (errorMessage) {
        alert(errorMessage);
    } else {
        alert("Form submitted successfully!");

        // Simulated Submission
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carMakeModel, name, email, phone, service })
        })
            .then(response => {
                responseMessage.textContent = response.ok
                    ? "Form submitted successfully!"
                    : "Failed to submit the form. Try again.";
                responseMessage.style.color = response.ok ? "green" : "red";
            })
            .catch(() => {
                responseMessage.textContent = "Error connecting to the server.";
                responseMessage.style.color = "red";
            });
    }
});

