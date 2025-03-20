document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reserveForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Validation
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let car = document.getElementById("car").value;
        let year = document.getElementById("year").value;
        let date = document.getElementById("date").value;
        let agree = document.getElementById("agree").checked;

        if (name === "" || email === "" || phone === "" || car === "" || year === "" || date === "" || !agree) {
            alert("Please fill in all required fields correctly.");
            return;
        }

        // Display success message
        let successMessage = document.getElementById("successMessage");
        successMessage.innerText = "Reservation successful! We'll contact you soon.";
        
        // Clear the form after submission
        document.getElementById("reserveForm").reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.innerText = "";
        }, 3000);
    });
});
