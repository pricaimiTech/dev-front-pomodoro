const minutesDisplay = document.getElementById('minutes')
const secondsDisplay = document.getElementById('seconds')
const startButton = document.getElementById('start')
const breakButton = document.getElementById('break')
const resetButton = document.getElementById('reset')
const studyTimeInput = document.getElementById('studyTime')
const breakTimeInput = document.getElementById('breakTime')
const sessionsCompletedDisplay = document.getElementById('sessionsCompleted')
const totalFocusTimeDisplay = document.getElementById('totalFocusTime')
const themeToggleButton = document.getElementById('theme-toggle')


let studyTime = parseInt(studyTimeInput.value)
let breakTime = parseInt(breakTimeInput.value)
timeLeft = studyTime * 60
let isRunning = false // saber se já iniciou o tempo de estudo
let isStudy = true //saber se está no tempo de estudo
let interval;
let sessionsCompleted = 0
let totalFocusTime = 0
const body = document.body

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(interval)
                isRunning = false

                if(isStudy) {
                    sessionsCompleted++ //informa que completou uma seção
                    totalFocusTime += parseInt(studyTimeInput.value) //atualiza tempo de foco
                }
                let message = isStudy? 'Study time is up!' : 'Break time is up! Back to studyng'
                alert(message)
                isStudy = !isStudy 
                timeLeft = (isStudy? studyTime : breakTime)*60 
                updateDisplay()
                updateStatistic()
            }
        }, 1000)
    }
}

function startBreakTime() {
    if(!isRunning) {
        isRunning = true,
        isStudy = false,
        timeLeft = breakTime*60
        updateDisplay()
        interval = setInterval(()=>{
            timeLeft--
            updateDisplay()
            if(timeLeft<=0){
                clearInterval(interval)
                isRunning = false
                alert('Break time is up! Back to studying')
                isStudy = true // volta para o modo de estudo
                timeLeft = studyTime *60
                updateDisplay()
            }
        }, 1000)
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60)
    let seconds = timeLeft % 60
    minutesDisplay.innerText = String(minutes).padStart(2, '0')
    secondsDisplay.innerText = String(seconds).padStart(2, '0')
}

function resetTime() {
    isRunning = false
    clearInterval(interval)
    studyTime = parseInt(studyTimeInput.value)
    breakTime = parseInt(breakTimeInput.value)
    timeLeft = studyTime*60;
    updateDisplay()
}

function updateStatistic() {
    sessionsCompletedDisplay.textContent = sessionsCompleted;
    totalFocusTimeDisplay.textContent = totalFocusTime
}

studyTimeInput.addEventListener('change', () =>{
    studyTime = parseInt(studyTimeInput.value)
    timeLeft = studyTime*60;
    updateDisplay()
})

breakTimeInput.addEventListener('change', ()=>{
    breakTime = parseInt(breakTimeInput.value)
})

resetButton.addEventListener('click', resetTime)
breakButton.addEventListener('click', startBreakTime)
startButton.addEventListener('click', startTimer)

updateDisplay()

const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if(userPrefersDark){
    body.classList.add('dark-mode')
    themeToggleButton.textContent = "☀️ Modo Claro"
}

themeToggleButton.addEventListener('click', ()=>{
    body.classList.toggle('dark-mode')

    if(body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = "☀️ Modo Claro"
    }else {
        themeToggleButton.textContent = "🌙 Modo Escuro"

    }
})