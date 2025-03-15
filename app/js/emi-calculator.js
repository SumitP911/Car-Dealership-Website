const downPaymentSlider = document.getElementById('downPayment');
const loanAmountSlider = document.getElementById('loanAmount');
const interestRateSlider = document.getElementById('interestRate');
const loanTenureSlider = document.getElementById('loanTenure');

const downPaymentValue = document.getElementById('downPaymentValue');
const loanAmountValue = document.getElementById('loanAmountValue');
const interestRateValue = document.getElementById('interestRateValue');
const loanTenureValue = document.getElementById('loanTenureValue');
const emiResult = document.getElementById('emiResult');

// Price breakdown elements
const showroomPriceElem = document.getElementById('exShowroomPrice');
const rtoElem = document.getElementById('rtoCharges');
const insuranceElem = document.getElementById('insuranceCharges');
const tcsElem = document.getElementById('tcsCharges');
const onRoadPriceElem = document.getElementById('onRoadPrice');

// Get documentId dynamically from the URL
const urlParams = new URLSearchParams(window.location.search);
const documentId = urlParams.get('documentId');

if (!documentId) {
    console.error("Error: documentId is missing from URL.");
}

const vehicleApiUrl = `http://localhost:1337/api/vehicles?filters[documentId][$eq]=${documentId}&populate=*`;

// Global declaration
let vehiclePrice = 0;
let onRoadPrice = 0;

// Function to fetch vehicle price from API and update UI
async function fetchVehiclePrice() {
    try {
        const response = await fetch(vehicleApiUrl);
        const data = await response.json();

        if (data?.data?.length > 0) {
            vehiclePrice = Number(data.data[0].Price);

            const rtoCharges = 0.10 * vehiclePrice; // 10% RTO tax
            const tcs = 0.01 * vehiclePrice; // 1% Tax Collected at Source
            const insurance = 0.05 * vehiclePrice; // 5% Insurance charge

            // Total On-Road Price Calculation
            onRoadPrice = vehiclePrice + rtoCharges + tcs + insurance;

            // Update price breakdown section
            showroomPriceElem.textContent = `₹ ${vehiclePrice.toLocaleString()}`;
            rtoElem.textContent = `₹ ${rtoCharges.toLocaleString()}`;
            insuranceElem.textContent = `₹ ${insurance.toLocaleString()}`;
            tcsElem.textContent = `₹ ${tcs.toLocaleString()}`;
            onRoadPriceElem.textContent = `₹ ${onRoadPrice.toLocaleString()}`;

            // Setting max values for sliders
            loanAmountSlider.max = onRoadPrice;
            loanAmountSlider.value = onRoadPrice;
            downPaymentSlider.max = onRoadPrice;
            downPaymentSlider.value = 0;

            updateValues(); // Update displayed values
        } else {
            console.error("No vehicle data found.");
        }
    } catch (error) {
        console.error("Error fetching vehicle data:", error);
    }
}

// Event listeners for sliders
downPaymentSlider.addEventListener('input', updateDownPayment);
loanAmountSlider.addEventListener('input', updateLoanAmount);
interestRateSlider.addEventListener('input', updateValues);
loanTenureSlider.addEventListener('input', updateValues);

// Function to update Down Payment and adjust Loan Amount
function updateDownPayment() {
    const downPayment = parseFloat(downPaymentSlider.value);
    const adjustedLoanAmount = onRoadPrice - downPayment;

    loanAmountSlider.value = adjustedLoanAmount; // Sync loan amount
    updateValues();
}

// Function to update Loan Amount and adjust Down Payment
function updateLoanAmount() {
    const loanAmount = parseFloat(loanAmountSlider.value);
    const adjustedDownPayment = onRoadPrice - loanAmount;

    downPaymentSlider.value = adjustedDownPayment; // Sync down payment
    updateValues();
}

// Function to update displayed values and calculate EMI
function updateValues() {
    const downPayment = parseFloat(downPaymentSlider.value);
    const loanAmount = parseFloat(loanAmountSlider.value);
    const interestRate = parseFloat(interestRateSlider.value) / 12 / 100; // Monthly interest rate
    const loanTenure = parseInt(loanTenureSlider.value);

    // Display slider values
    downPaymentValue.textContent = `₹${downPayment.toLocaleString()}/-`;
    loanAmountValue.textContent = `₹${loanAmount.toLocaleString()}/-`;
    interestRateValue.textContent = `${(interestRate * 12 * 100).toFixed(1)}%`; // Annual interest rate
    loanTenureValue.textContent = `${loanTenure} months`;

    // EMI Calculation using the formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const numerator = loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure);
    const denominator = Math.pow(1 + interestRate, loanTenure) - 1;
    const emi = numerator / denominator;

    // Update EMI result
    emiResult.textContent = isFinite(emi) ? `₹ ${emi.toFixed(2)}` : '₹ 0';
}

// Fetch the vehicle price on page load
fetchVehiclePrice();
