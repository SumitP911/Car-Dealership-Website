
// Insert navbar and footer HTML into the page
document.getElementById("navbar").innerHTML = fetch("navbar.html").then(response => response.text()).then(data => data);
document.getElementById("footer").innerHTML = fetch("footer.html").then(response => response.text()).then(data => data);

// Add active class to the current page's link
window.onload = function () {
    // Load the navbar
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            // After loading the navbar, set the active class
            const currentPage = window.location.pathname.split("/").pop();
            const links = document.querySelectorAll(".nav-link");
            links.forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });
        });

    // Load the footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
};
