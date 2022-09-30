const arrayTime = ['hour', 'minute', 'second'],
    numbers = document.querySelectorAll('.numbers h2'),
    inputs = document.querySelectorAll('.inputs input')

let cont = 0, timer = 0

const time = {
    hour: 0,
    minute: 0,
    second: 0
}

const verifyTimer = () => {
    if (time.second <= 0) {
        time.second = 60
        time.minute--
    }
    if (time.minute <= 0 && time.hour > 0) {
        time.minute = 59
        time.hour--
    }
    time.second -= 1
}

const durations = {
    hour: 3600000,
    minute: 60000,
    second: 1000
}

const setDuration = () => {
    inputs.forEach((input, index) => {
        time[arrayTime[index]] = parseInt(input?.value)
        timer += durations[arrayTime[index]] * input?.value
    })
    numbers.forEach((number, index) => {
        const value = time[arrayTime[index]]

        number.innerHTML = value < 10 ? `0${value}` : value
    })
}

const initTimer = (stopCallback) => setInterval(() => {
    cont += 1000
    verifyTimer()
    numbers.forEach((number, index) => {
        const value = time[arrayTime[index]]

        number.innerHTML = value < 10 ? `0${value}` : value
    })
    if (cont === timer) stopCallback()
}, 1000)

const setTime = (hour, minute, second) => {
    time.hour = hour
    time.minute = minute
    time.second = second
}

const updateTimer = () => inputs.forEach((input, index) => input.value = time[arrayTime[index]])

const resetTime = () => {
    arrayTime.forEach(timer => time[timer] = 0)
    inputs.forEach(input => input.value = '00')
}

export { setTime, initTimer, setDuration, updateTimer, resetTime }