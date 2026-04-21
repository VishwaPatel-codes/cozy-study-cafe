const message = document.querySelector(".messege");
const timer = document.querySelector(".timer");
const cat = document.querySelector(".cat-gif");

const workButton = document.querySelector(".mode-work");
const breakButton = document.querySelector(".mode-break");

const playButton = document.querySelector(".play-btn");
const resetButton = document.querySelector(".reset-btn");
let time = 25 * 60;
let timerRunning = false;
let timerInterval;



function showWork() {
    workButton.classList.add("active");
    workButton.classList.remove("inactive");

    breakButton.classList.add("inactive");
    breakButton.classList.remove("active");

    clearInterval(timerInterval);
    timerRunning = false;

    time = 25 * 60;
    timer.textContent = "25:00";

    message.textContent = "YOU CAN DO IT";
    cat.src = "assets/pomodoro/cat-idle.gif";
    playButton.textContent = "▶";
updateProfileCat(); }

function showBreak() {
    breakButton.classList.add("active");
    breakButton.classList.remove("inactive");

    workButton.classList.add("inactive");
    workButton.classList.remove("active");

    clearInterval(timerInterval);
    timerRunning = false;

    time = 5 * 60;
    timer.textContent = "05:00";

    message.textContent = "TAKE A BREAK";
    cat.src = "assets/pomodoro/cat-break.gif";
    playButton.textContent = "▶";
    updateProfileCat();
}



playButton.onclick = function () {

    if (timerRunning === false) {

        timerRunning = true;

        if (workButton.classList.contains("active")) {
            cat.src = "assets/pomodoro/cat-study.gif";
            message.textContent = "FOCUS!!";
        } else {
            cat.src = "assets/pomodoro/cat-break.gif";
            message.textContent = "ENJOY YOUR BREAK";
        }

        playButton.textContent = "⏸";

        timerInterval = setInterval(function () {

            time--;

            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            timer.textContent = minutes + ":" + seconds;

            updateProfileCat();

            if (time <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            playButton.textContent = "▶";

            sessionPopup.style.display = "block";
            sessionPopup.textContent = "yay!! session complete ✦";

            setTimeout(function () {
                sessionPopup.style.display = "none";
                sessionPopup.textContent = "";
            }, 3000);

            time = workButton.classList.contains("active") ? 25 * 60 : 5 * 60;

            updateProfileCat();

            if (workButton.classList.contains("active")) {
                cat.src = "assets/pomodoro/cat-idle.gif";
                message.textContent = "DONE!";
            } else {
                message.textContent = "BREAK OVER!";
            }
        }
        }, 1000);

    } else {

        timerRunning = false;
        clearInterval(timerInterval);

        playButton.textContent = "▶";

        if (workButton.classList.contains("active")) {
            cat.src = "assets/pomodoro/cat-idle.gif";
            message.textContent = "YOU CAN DO IT";
        } else {
            cat.src = "assets/pomodoro/cat-break.gif";
            message.textContent = "TAKE A BREAK";
        }
    }
};



resetButton.onclick = function () {

    clearInterval(timerInterval);
    timerRunning = false;
    playButton.textContent = "▶";

    if (workButton.classList.contains("active")) {
        time = 25 * 60;
        timer.textContent = "25:00";
        message.textContent = "YOU CAN DO IT";
        cat.src = "assets/pomodoro/cat-idle.gif";
    } else {
        time = 5 * 60;
        timer.textContent = "05:00";
        message.textContent = "TAKE A BREAK";
        cat.src = "assets/pomodoro/cat-break.gif";
    }
};



const windows = document.querySelectorAll(".window-box");

windows.forEach(function(windowBox) {

    let isDragging = false;
    let offsetX;
    let offsetY;

    windowBox.addEventListener("mousedown", function(event) {
        isDragging = true;

        offsetX = event.clientX - windowBox.offsetLeft;
        offsetY = event.clientY - windowBox.offsetTop;
    });

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            windowBox.style.left = event.clientX - offsetX + "px";
            windowBox.style.top = event.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

});
const todoInput = document.querySelector(".todo-input");
const todoAddButton = document.querySelector(".todo-add-btn");
const todoList = document.querySelector(".todo-list");

todoAddButton.onclick = function () {

    const taskText = todoInput.value;

    if (taskText === "") {
        return;
    }

    const task = document.createElement("div");
    task.classList.add("todo-task");

    task.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-task">x</button>
    `;

    todoList.appendChild(task);

    todoInput.value = "";

    const deleteButton = task.querySelector(".delete-task");

    deleteButton.onclick = function () {
        task.remove();
    };
};
const startScreen = document.querySelector(".start-screen");
const startName = document.querySelector(".start-name");
const startButton = document.querySelector(".start-button");

const blackOption = document.querySelector(".black-option");
const orangeOption = document.querySelector(".orange-option");

let selectedCat = "black";

blackOption.classList.add("selected");

blackOption.onclick = function () {
    selectedCat = "black";

    blackOption.classList.add("selected");
    orangeOption.classList.remove("selected");
};

orangeOption.onclick = function () {
    selectedCat = "orange";

    orangeOption.classList.add("selected");
    blackOption.classList.remove("selected");
};

startButton.onclick = function () {

    let userName = startName.value.trim();

    if (userName === "") {
        userName = "vishwa";
    }

    profileUsername.textContent = userName;

document.querySelector(".floating-profile").style.display = "flex";
    startScreen.style.display = "none";

    updateProfileCat();
};
const profileUsername = document.querySelector(".profile-username");
const sessionPopup = document.querySelector(".session-popup");
const profileCat = document.querySelector(".profile-cat");

function updateProfileCat() {

    let totalTime;

    if (workButton.classList.contains("active")) {
        totalTime = 25 * 60;
    } else {
        totalTime = 5 * 60;
    }

    const progress = ((totalTime - time) / totalTime) * 100;

    if (selectedCat === "black") {

        if (progress < 25) {
            profileCat.src = "assets/black25.gif";
        } else if (progress < 50) {
            profileCat.src = "assets/black50.gif";
        } else if (progress < 75) {
            profileCat.src = "assets/black75.gif";
        } else {
            profileCat.src = "assets/black100.gif";
        }

    } else {

        if (progress < 25) {
            profileCat.src = "assets/orange25.gif";
        } else if (progress < 50) {
            profileCat.src = "assets/orange50.gif";
        } else if (progress < 75) {
            profileCat.src = "assets/orange75.gif";
        } else {
            profileCat.src = "assets/orange100.gif";
        }
    }
}
const floatingProfile = document.querySelector(".floating-profile");

let draggingProfile = false;
let profileOffsetX = 0;
let profileOffsetY = 0;

floatingProfile.addEventListener("mousedown", function (event) {
    draggingProfile = true;

    profileOffsetX = event.clientX - floatingProfile.offsetLeft;
    profileOffsetY = event.clientY - floatingProfile.offsetTop;
});

document.addEventListener("mousemove", function (event) {
    if (draggingProfile) {
        floatingProfile.style.left = event.clientX - profileOffsetX + "px";
        floatingProfile.style.top = event.clientY - profileOffsetY + "px";
        floatingProfile.style.bottom = "auto";
    }
});

document.addEventListener("mouseup", function () {
    draggingProfile = false;
});
const catMessage = document.querySelector(".cat-message");

const messages = [
    "you can do it ✦",
    "just one more task!",
    "proud of you!",
    "focus focus!!",
    "meow!! study time"
];

profileCat.addEventListener("click", function () {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    catMessage.textContent = randomMessage;

    setTimeout(function () {
        catMessage.textContent = "";
    }, 2000);
});