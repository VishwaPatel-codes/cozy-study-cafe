    const message = document.querySelector(".messege");
    const timer = document.querySelector(".timer");
    const cat = document.querySelector(".cat-gif");
    const workButton = document.querySelector(".mode-work");
    const breakButton = document.querySelector(".mode-break");

    function showWork() {
    workButton.classList.add("active");
    workButton.classList.remove("inactive");

    breakButton.classList.add("inactive");
    breakButton.classList.remove("active");

    message.textContent = "YOU CAN DO IT";
    timer.textContent = "25:00";
    cat.src = "assets/pomodoro/cat-idle.gif";

    time = 25 * 60;
}
    function showBreak() {
    breakButton.classList.add("active");
    breakButton.classList.remove("inactive");

    workButton.classList.add("inactive");
    workButton.classList.remove("active");

    message.textContent = "TAKE A BREAK";
    timer.textContent = "05:00";
    cat.src = "assets/pomodoro/cat-break.gif";

    time = 5 * 60;
}
    let time = 25 * 60;
    let timerRunning = false;
    let timerInterval;

    const playButton = document.querySelector(".play-btn");

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

            if (time <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                playButton.textContent = "▶";
            }
        }, 1000);

    } else {
        timerRunning = false;
        clearInterval(timerInterval);
        if (workButton.classList.contains("active")) {
        cat.src = "assets/pomodoro/cat-idle.gif";
        message.textContent = "YOU CAN DO IT";
        } else {
            cat.src = "assets/pomodoro/cat-break.gif";
            message.textContent = "TAKE A BREAK";
        }
        playButton.textContent = "▶";
    }
}
const resetButton = document.querySelector(".reset-btn");

resetButton.onclick = function () {
    clearInterval(timerInterval);
    timerRunning = false;
    playButton.textContent = "▶";

    if (workButton.classList.contains("active")) {
        time = 25 * 60;
        timer.textContent = "25:00";
    } else {
        time = 5 * 60;
        timer.textContent = "05:00";
    }
}
const pomodoroWindow = document.querySelector(".pomodoro-window");

let isDragging = false;
let offsetX;
let offsetY;

pomodoroWindow.addEventListener("mousedown", function (event) {
    isDragging = true;

    offsetX = event.clientX - pomodoroWindow.offsetLeft;
    offsetY = event.clientY - pomodoroWindow.offsetTop;
});

document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        pomodoroWindow.style.left = event.clientX - offsetX + "px";
        pomodoroWindow.style.top = event.clientY - offsetY + "px";

        pomodoroWindow.style.right = "auto";
    }
});

document.addEventListener("mouseup", function () {
    isDragging = false;
});