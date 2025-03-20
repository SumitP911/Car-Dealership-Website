document.getElementById("form1").addEventListener("submit1", function (event) {
    event.preventDefault(); // Prevent default submission

    const make = document.querySelector(".make").value.trim();
    const model = document.querySelector(".model").value.trim();
    const year = document.querySelector(".year").value.trim();
    const mileage = document.querySelector(".mileage").value.trim();
    const price = document.querySelector(".price").value.trim();
    const name = document.querySelector(".name").value.trim();
    const phone = document.querySelector(".phone").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    let errorMessage = "";

    // Validations
    if (!make) errorMessage += "Please enter the car make and model.\n";
    if (!model) errorMessage += "Please enter a valid name.\n";
    if (!/^(19|20)\d{2}$/.test(year)) errorMessage += "Please enter a valid year (1900 - current year).\n";
    if (!/^[1-9]\d*$/.test(mileage)) errorMessage += "Please enter a valid mileage (positive number).\n";
    if (!/^[1-9]\d*$/.test(price)) errorMessage += "Please enter a valid asking price (positive number).\n";
    if (!name) errorMessage += "Please enter a valid name.\n";
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    //     errorMessage += "Please enter a valid email address.\n";
    if (!/^\d{10}$/.test(phone))
        errorMessage += "Please enter a valid 10-digit phone number.\n";

    // Show error or success message
    if (errorMessage) {
        alert(errorMessage);
    } else {
        alert("Form submitted successfully!");

        // Simulated Submission
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ make, model, year, mileage, price, name, phone })
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
