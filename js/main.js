import { setDuration, initTimer, setTime, updateTimer, resetTime } from './modules/time.js'

const [hour, minute, second] = document.querySelectorAll('.inputs input'),
    btnStart = document.querySelector('.btn-start'),
    btnCancel = document.querySelector('.btn-cancel'),
    audio = new Audio('../assets/audio.mp3'),
    btnCloseModal = document.querySelector('.btn-close')


let interval = {}, isPause = false

const stopInterval = () => {
    audio.play()
    clearInterval(interval)
    classList('.btn-play', 'remove', 'mdi-pause')
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-start', 'add', 'disable')
    classList('.btn-alarm', 'remove', 'disable')
    classList('.btn-cancel', 'add', 'disable')
    classList('body', 'add', 'alarm-animation')
}

const classList = (element, action, className) =>
    document.querySelector(element).classList[action](className)

const pause = () => {
    clearInterval(interval)
    updateTimer()
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-play', 'remove', 'mdi-pause')
}

const play = () => {
    if ([hour, minute, second].every(input => parseInt(input.value) === 0)) {
        classList('.error', 'add', 'active')
        setTimeout(() => classList('.error', 'remove', 'active'), 3500)
    } else {
        classList('.btn-play', 'remove', 'mdi-play')
        classList('.btn-play', 'add', 'mdi-pause')
        classList('.numbers', 'add', 'active')
        classList('.text', 'add', 'disable')
        classList('.btn-cancel', 'remove', 'disable')
        setTime(hour.value, minute.value, second.value)
        setDuration()
        interval = initTimer(stopInterval)
    }
}

const stop = () => {
    classList('.numbers', 'remove', 'active')
    classList('.text', 'remove', 'disable')
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-cancel', 'add', 'disable')
    clearInterval(interval)
    resetTime()
    hour.focus()
}

const keys = {
    p: pause,
    i: play
}

// checking if it is the first time on site
window.onload = () => {
    if (!localStorage.getItem('firstTime')) {
        classList('.modal-backdrop', 'remove', 'disable')
    }
}

// events
btnStart.addEventListener('click', () => {
    isPause ? pause() : play()
    isPause = !isPause
})
btnCancel.addEventListener('click', stop)

document.body.addEventListener('keyup', (e) => {
    if (keys[e.key]) keys[e.key]()
})

document.querySelector('.btn-alarm').addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    classList('body', 'remove', 'alarm-animation')
    stop()
})

audio.addEventListener('ended', () => {
    classList('body', 'remove', 'alarm-animation')
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    stop()
})

hour.addEventListener('change', () => {
    parseInt(hour.value < 10) ? hour.value = `0${parseInt(hour.value)}` : null
})
minute.addEventListener('change', () => {
    minute.value = parseInt(minute.value) > 59 ? 0 : minute.value
    parseInt(minute.value) < 10 ? minute.value = `0${parseInt(minute.value)}` : null
})
second.addEventListener('change', () => {
    second.value = parseInt(second.value) > 59 ? 0 : second.value
    parseInt(second.value) < 10 ? second.value = `0${parseInt(second.value)}` : null
})

hour.addEventListener('input', () => {
    hour.value = hour.value.replace(/[^0-9]/g, '')
    parseInt(hour.value < 10) ? hour.value = `0${parseInt(hour.value)}` : null
})
second.addEventListener('input', () => { })
minute.addEventListener('input', () => minute.value = minute.value.replace(/[^0-9]/g, ''))

btnCloseModal.addEventListener('click', () => {
    classList('.modal-backdrop', 'add', 'disable')
    localStorage.setItem('firstTime', true)
    hour.focus()
})