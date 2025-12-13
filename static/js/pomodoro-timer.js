let workDuration = 25;  // Default work duration in minutes
let shortBreak = 5;     // Default short break duration in minutes
let longBreak = 15;     // Default long break duration in minutes
let volume = 50;        // Default volume for notifications

let currentSession = "work";  // Current session type: work, shortBreak, longBreak
let timerInterval;  // Reference to the timer interval
let timeLeft;       // Time left in current session (in seconds)
let tasks = [];     // Task list

// DOM elements
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const timeDisplay = document.getElementById("time-left");
const progressRing = document.getElementById("progress-ring");
const taskList = document.getElementById("tasks");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const settingsPanel = document.getElementById("settings-panel");
const settingsToggle = document.getElementById("settings-toggle");
const saveSettingsBtn = document.getElementById("save-settings-btn");

// Initialize settings from localStorage if available
function initializeSettings() {
    const storedSettings = JSON.parse(localStorage.getItem("settings"));
    if (storedSettings) {
        workDuration = storedSettings.workDuration;
        shortBreak = storedSettings.shortBreak;
        longBreak = storedSettings.longBreak;
        volume = storedSettings.volume;
    }
    updateDisplay();
}

// Save settings to localStorage
function saveSettings() {
    const newSettings = {
        workDuration,
        shortBreak,
        longBreak,
        volume,
    };
    localStorage.setItem("settings", JSON.stringify(newSettings));
}

// Update the timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Start or resume the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            playSound();
            changeSession();
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = workDuration * 60;
    updateDisplay();
}

// Switch between work, short break, and long break sessions
function changeSession() {
    if (currentSession === "work") {
        currentSession = "shortBreak";
        timeLeft = shortBreak * 60;
    } else if (currentSession === "shortBreak") {
        currentSession = "work";
        timeLeft = workDuration * 60;
    }
    updateDisplay();
}

// Play sound for session transition
function playSound() {
    const audio = new Audio("notification.mp3");
    audio.volume = volume / 100;
    audio.play();
}

// Task management functions
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
        tasks.push(taskName);
        renderTasks();
        taskInput.value = "";
    }
}

// Render tasks in the task list
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Event listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
addTaskBtn.addEventListener("click", addTask);
settingsToggle.addEventListener("click", () => {
    settingsPanel.classList.toggle("hidden");
});
saveSettingsBtn.addEventListener("click", saveSettings);

// Initialize the app
initializeSettings();
