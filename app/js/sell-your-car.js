document.getElementById("form1").addEventListener("", function (event) {
    event.preventDefault(); // Prevent default PHP submission

    const make = document.querySelector(".make").value.trim();
    const model = document.querySelector(".model").value.trim();
    const year = document.querySelector(".year").value.trim();
    const mileage = document.querySelector(".mileage").value.trim();
    const price = document.querySelector(".price").value.trim();
    const name = document.querySelector(".name").value.trim();
    //const email = document.querySelector(".email").value.trim();
    //const phone = document.querySelector(".number").value.trim();

    let errorMessage = "";

    // Validations
    if (!make) errorMessage += "Please enter the car make.\n";
    if (!model) errorMessage += "Please enter the car model.\n";
    if (!/^(19|20)\d{2}$/.test(year)) errorMessage += "Please enter a valid year.\n";
    if (!/^\d+$/.test(mileage)) errorMessage += "Please enter a valid mileage.\n";
    if (!/^\d+$/.test(price)) errorMessage += "Please enter a valid asking price.\n";
    if (!name) errorMessage += "Please enter your name.\n";
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorMessage += "Please enter a valid email address.\n";
    //if (!/^\d{10}$/.test(phone)) errorMessage += "Please enter a valid 10-digit phone number.\n";

    if (errorMessage) {
        alert(errorMessage);
    } else {
        alert("Form submitted successfully!");
    }
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ make, model, year, mileage, price, name })
    // })
    //     .then(response => alert(response.ok ? "Form submitted successfully!" : "Failed to submit the form."))
    //     .catch(() => alert("Error connecting to the server."));
});
