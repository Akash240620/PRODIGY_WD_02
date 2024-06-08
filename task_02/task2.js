let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStop() {
    if (isRunning) {
        cancelAnimationFrame(timer);
        elapsedTime += performance.now() - startTime;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = performance.now();
        timer = requestAnimationFrame(updateDisplay);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    cancelAnimationFrame(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = performance.now() - startTime + elapsedTime;
        const lapDisplay = formatTime(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapDisplay;
        document.getElementById('laps').appendChild(lapElement);
    }
}

function updateDisplay() {
    const currentTime = performance.now() - startTime + elapsedTime;
    const formattedTime = formatTime(currentTime);
    document.getElementById('display').textContent = formattedTime;
    timer = requestAnimationFrame(updateDisplay);
}

function formatTime(time) {
    const totalMilliseconds = time;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}
