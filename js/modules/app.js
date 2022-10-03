// importando as funções do modulo time
import { setDuration, initTimer, setTime, updateTimer, resetTime } from './time.js'

// elementos da página
const [hour, minute, second] = document.querySelectorAll('.inputs input'),
    numbers = document.querySelectorAll('.numbers h2'),
    audio = new Audio('../assets/audio.mp3')

let interval = {}, isPause = false, isAlarm = false

//funções do programa principal 

// função para facilitação da estilização dinâmica da página
const classList = (element, action, className) =>
    document.querySelector(element).classList[action](className)

// função passada por callback e chamada ao término do timer
const stopInterval = () => {
    isAlarm = true
    audio.play()
    clearInterval(interval)
    classList('.btn-play', 'remove', 'mdi-pause')
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-start', 'add', 'disable')
    classList('.btn-alarm', 'remove', 'disable')
    classList('.btn-cancel', 'add', 'disable')
    classList('body', 'add', 'alarm-animation')
}

// função responsável por pausar o timer
const pause = () => {
    clearInterval(interval)
    updateTimer([hour, minute, second])
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-play', 'remove', 'mdi-pause')
    isPause = false
}

// função responsável por iniciar o timer
const play = () => {
    if ([hour, minute, second].every(input => parseInt(input.value) === 0)) {
        classList('.error', 'add', 'active')
        setTimeout(() => classList('.error', 'remove', 'active'), 3500)
    } else {
        classList('.btn-play', 'remove', 'mdi-play')
        classList('.btn-play', 'add', 'mdi-pause')
        classList('.numbers', 'add', 'active-numbers')
        classList('.text', 'add', 'disable')
        classList('.btn-cancel', 'remove', 'disable')
        clearInterval(interval)
        setTime(hour.value, minute.value, second.value)
        setDuration(numbers)
        interval = initTimer(numbers, stopInterval)
        isPause = true
    }
}

// função responsável por cancelar o timer
const stop = () => {
    classList('.numbers', 'remove', 'active-numbers')
    classList('.text', 'remove', 'disable')
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-cancel', 'add', 'disable')
    resetTime()
    clearInterval(interval)
    Array.from([hour, minute, second]).forEach(input => input.value = '00')
    second.focus()
}

// função responsável por parar o alarme (antes de acabar)
const stopAlarm = () => {
    audio.pause();
    audio.currentTime = 0;
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    classList('body', 'remove', 'alarm-animation')
    stop()
    isAlarm = false
}

// verificando se é a primeira vez que o usuário acessa a página, se sim, mostra o modal de introdução
window.onload = () => {
    if (!localStorage.getItem('firstTime')) {
        classList('.modal-backdrop', 'remove', 'disable')
    }
}

export { play, pause, stopAlarm, stop, classList, isPause, isAlarm }