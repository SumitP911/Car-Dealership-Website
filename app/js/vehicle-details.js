document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const documentId = urlParams.get("documentId");

    if (!documentId) {
        console.error("No documentId found in URL.");
        return;
    }

    const apiUrl = `http://localhost:1337/api/vehicles?filters[documentId][$eq]=${documentId}&populate=*`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data?.data?.length) {
            console.error("Vehicle data not found.");
            return;
        }

        displayVehicleDetails(data);
    } catch (error) {
        console.error("Error fetching vehicle data:", error);
    }
});

function displayVehicleDetails(data) {
    const vehicle = data.data[0];

    if (!vehicle) {
        console.error("Vehicle details missing in response:", data);
        return;
    }

    const brandName = vehicle.brand?.Name || "Unknown Brand";
    const vehicleName = vehicle.Name || "Unknown Model";
    const year = vehicle.Year || "N/A";

    // Ensure `Price` is properly fetched and converted to a number
    const priceValue = vehicle.Price ? Number(vehicle.Price) : 0;
    const formattedPrice = priceValue ? `₹${priceValue.toLocaleString("en-IN")}/-` : "N/A";

    document.querySelector(".vehicle-name h2").textContent = brandName;
    document.querySelector(".vehicle-name h3").textContent = `${vehicleName} (${year})`;
    document.querySelector("#first-section h5").textContent = formattedPrice;

    // Calculate On-Road Price Components
    const rtoCharges = 0.10 * priceValue; // 10% RTO tax
    const tcs = 0.01 * priceValue; // 1% Tax Collected at Source
    const insurance = 0.05 * priceValue; // 5% Insurance charge

    // Total On-Road Price Calculation
    const onRoadPrice = priceValue + rtoCharges + tcs + insurance;

    // Display On-Road Price
    const onRoadPriceElement = document.querySelector("#on-road-price");
    if (onRoadPriceElement) {
        onRoadPriceElement.textContent = `₹${onRoadPrice.toLocaleString("en-IN")}/-`;
    }

    const details = Object.entries({
        EngineVariant: vehicle.EngineVariant || "N/A",
        EngineDisplacement: vehicle.EngineDisplacement ? `${vehicle.EngineDisplacement} CC` : "N/A",
        MaxPower: vehicle.MaxPower || "N/A",
        MaxTorque: vehicle.MaxTorque ? `${vehicle.MaxTorque} Nm` : "N/A",
        TopSpeed: vehicle.TopSpeed ? `${vehicle.TopSpeed} Kmph` : "N/A",
        Transmission: vehicle.Transmission || "N/A",
        DriveTrain: vehicle.DriveTrain || "N/A",
        FuelType: vehicle.FuelType || "N/A",
        SecondaryFuelType: vehicle.SecondaryFuelType || "N/A",
        EmissionNormCompliance: vehicle.EmissionNormCompliance || "N/A",
        BodyType: vehicle.BodyType || "N/A",
        SeatingCapacity: vehicle.SeatingCapacity || "N/A",
        Color: vehicle.Color || "N/A",
        InteriorType: vehicle.InteriorType || "N/A",
        InteriorColor: vehicle.InteriorColor || "N/A",
        KMsDriven: vehicle.KMsDriven ? `${vehicle.KMsDriven} km` : "N/A",
        Ownership: vehicle.Ownership || "N/A",
        RegistrationDate: vehicle.RegistrationDate || "N/A",
        ManufacturingDate: vehicle.ManufacturingDate || "N/A",
        RegistrationType: vehicle.RegistrationType || "N/A",
    }).slice(0, 20);

    const leftDesc = document.querySelector("#description ul#left");
    const rightDesc = document.querySelector("#description ul#right");

    if (!leftDesc || !rightDesc) {
        console.error("Description lists not found in HTML.");
        return;
    }

    leftDesc.innerHTML = "";
    rightDesc.innerHTML = "";

    const leftDetails = details.slice(0, 10);
    const rightDetails = details.slice(10, 20);

    leftDetails.forEach(([key, value]) => {
        const li = document.createElement("li");
        li.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value}`;
        leftDesc.appendChild(li);
    });

    rightDetails.forEach(([key, value]) => {
        const li = document.createElement("li");
        li.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value}`;
        rightDesc.appendChild(li);
    });

    const carousel = document.querySelector(".carousel");
    if (!carousel) {
        console.error("Carousel element not found in HTML.");
        return;
    }

    carousel.innerHTML = "";
    const images = vehicle.Images || [];

    if (!images.length) {
        carousel.innerHTML = `<div class="carousel-item active"><img src="./Assets/Presets/Inventory/image-coming-soon.png" alt="No Image Available"></div>`;
        return;
    }

    images.forEach((image, index) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item");
        if (index === 0) div.classList.add("active");

        const img = document.createElement("img");
        img.src = `http://localhost:1337${image.url}`;
        img.alt = `Vehicle Image ${index + 1}`;

        div.appendChild(img);
        carousel.appendChild(div);
    });

    document.querySelector(".carousel").style.transform = `translateX(0%)`;
}