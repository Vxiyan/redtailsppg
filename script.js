// true = available, false = booked
let takenDatesDatabase = [
    new Date(2026, 8, 15),
    new Date(2026, 6, 23),
    new Date(2026, 5, 20),
    new Date(2026, 4, 21),
    new Date(2026, 6, 22)
]

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
    let currentDate = new Date();
    let lastMinuteProt = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
    console.log(selectedDate);
    console.log(lastMinuteProt);
    console.log(selectedDate <= lastMinuteProt);


    if (selectedDate <= lastMinuteProt) {
        statusText.textContent = "Please select a date that is a week in advance.";
        statusText.className = "status-unavailable";
        submitBtn.disabled = true;
        return;
    }

    const isNotAvailable = takenDatesDatabase.includes(selectedDate);

    if (isNotAvailable === false) {
        statusText.textContent = "Date is Available!";
        statusText.className = "status-available";
        submitBtn.disabled = false;
    } else if (isNotAvailable === true) {
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
