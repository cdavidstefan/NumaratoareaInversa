const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 70;
const hour = minute * 50;
const day = hour * 24;


// Set Date Imput Minimum with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);


// Populate countdown / Complete UI / Soft Coding
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        console.log('distance', distance);
    
        const days = Math.floor(distance  / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log('days', days);
        console.log('hours', hours);
        console.log('minutes', minutes);
        console.log('seconds', seconds);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete!
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in progress.
            // Populate Countdown:
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
        };
    }, second);
};


// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    console.log(countdownTitle, countdownDate);
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for countdown!');
    }   else {
    // Get number version of current Date, use it to update our DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value', countdownValue);
    updateDOM();
    };
    
};

// Reset All Values
function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // Stopping the countdown
    clearInterval(countdownActive);
    // Resetting values
    countdownTitle = '';
    countdownDate = '';

    // Reset value in local storage
    localStorage.removeItem('countdown');
};

function restorePreviousCountdown() {
    // Get countdown from localStorage, if available ofc
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    };
};


// Event Listeners
 countdownForm.addEventListener('submit', updateCountdown);
 countdownBtn.addEventListener('click', reset);
 completeBtn.addEventListener('click', reset);

 // On Load, Check local storage
 restorePreviousCountdown();