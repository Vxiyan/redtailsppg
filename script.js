// Mock availability for April 2024
// true = available, false = booked
const aprilAvailability = {
    "2026-04-01": false,
    "2026-04-05": false,
    "2026-04-10": false,
    "2026-04-15": false,
    "2026-04-20": true,
    "2026-04-25": true
};

const form = document.getElementById('appointment-form');
const nameInput = document.getElementById('appointment-name');
const emailInput = document.getElementById('appointment-email');
const dateInput = document.getElementById('appointment-date');
const submitBtn = document.getElementById('submit-btn');
const statusText = document.getElementById('availability-status');

function updateFormStatus() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const dateValue = dateInput.value;

    // Check if all fields have input and email is basic-valid
    const isFilled = name.length > 0 && email.includes('@') && dateValue !== "";

    if (isFilled) {
        checkAvailability(dateValue);
    } else {
        statusText.textContent = "";
        submitBtn.disabled = true;
    }
}

function checkAvailability(dateString) {
    const selectedDate = new Date(dateString);
    // getMonth() is 0-indexed, so April is 3
    const isApril = selectedDate.getMonth() === 3;

    if (!isApril) {
        statusText.textContent = "Please select a date in April.";
        statusText.className = "status-unavailable";
        submitBtn.disabled = true;
        return;
    }

    const isAvailable = aprilAvailability[dateString];

    if (isAvailable === true) {
        statusText.textContent = "Date is Available!";
        statusText.className = "status-available";
        submitBtn.disabled = false;
    } else if (isAvailable === false) {
        statusText.textContent = "Date is already booked.";
        statusText.className = "status-unavailable";
        submitBtn.disabled = true;
    } else {
        statusText.textContent = "No data for this date.";
        statusText.className = "status-unavailable";
        submitBtn.disabled = true;
    }
}

form.addEventListener('input', updateFormStatus);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusText.textContent = "Appointment request received! We will contact you soon.";
    statusText.className = "status-available";
    submitBtn.disabled = true;
});