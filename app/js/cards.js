document.addEventListener("DOMContentLoaded", async function () {
    const API_URL = "http://localhost:1337/api/vehicles?populate=*";
    const cardContainer = document.querySelector(".card-container");

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!data?.data || !Array.isArray(data.data)) {
            console.error("Invalid data structure from Strapi:", data);
            return;
        }

        // Shuffle vehicles for random order
        const shuffledVehicles = data.data.sort(() => Math.random() - 0.5);

        cardContainer.innerHTML = ""; // Clear existing cards

        shuffledVehicles.forEach(vehicle => {
            const { documentId, Name, Year, Price, Images, brand } = vehicle;

            if (!Name || !Year || !Price || !brand?.Name) {
                console.warn("Skipping vehicle with missing data:", vehicle);
                return;
            }

            const brandName = brand.Name; // Extract brand name
            const fullVehicleName = `${brandName} ${Name}`.toUpperCase(); // Complete vehicle name

            const firstImage = Images?.[0]?.url;
            const imageUrl = firstImage
                ? `http://localhost:1337${firstImage}`
                : "./Assets/Presets/Inventory/image-coming-soon.png";

            const formattedPrice = isNaN(Price) ? Price : `₹${Number(Price).toLocaleString("en-IN")}/-`;

            // Create elements
            const link = document.createElement("a");
            link.href = `./vehicle-details.html?documentId=${documentId}`;

            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = fullVehicleName;
            img.classList.add("car-image");

            const yearElement = document.createElement("h3");
            yearElement.textContent = Year;

            const nameWrapper = document.createElement("div");
            nameWrapper.classList.add("name-wrapper");

            const nameElement = document.createElement("h2");
            nameElement.classList.add("car-name");
            nameElement.textContent = fullVehicleName;

            nameWrapper.appendChild(nameElement);

            const priceElement = document.createElement("p");
            priceElement.textContent = formattedPrice;

            // Append elements
            carCard.appendChild(img);
            carCard.appendChild(yearElement);
            carCard.appendChild(nameWrapper);
            carCard.appendChild(priceElement);
            link.appendChild(carCard);
            cardContainer.appendChild(link);

            // Check if name overflows and apply scrolling
            requestAnimationFrame(() => {
                if (nameElement.scrollWidth > nameWrapper.clientWidth) {
                    const fixedScrollDuration = 10; // Constant duration
                    nameElement.style.setProperty("--scroll-duration", `${fixedScrollDuration}s`);
                    nameElement.classList.add("scroll");
                }
            });
        });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
    }
});
