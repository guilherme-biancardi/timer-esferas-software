// importando as funções do modulo time
import { setDuration, initTimer, setTime, updateTimer, resetTime } from './modules/time.js'

// elementos da página
const [hour, minute, second] = document.querySelectorAll('.inputs input'),
    btnStart = document.querySelector('.btn-start'),
    btnCancel = document.querySelector('.btn-cancel'),
    audio = new Audio('../assets/audio.mp3'),
    btnCloseModal = document.querySelector('.btn-close'),
    numbers = document.querySelectorAll('.numbers h2')

let interval = {}, isPause = false

//funções do programa principal 

// função para facilitação da estilização dinâmica da página
const classList = (element, action, className) =>
    document.querySelector(element).classList[action](className)

// função passada por callback e chamada ao término do timer
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

// função responsável por pausar o timer
const pause = () => {
    clearInterval(interval)
    updateTimer([hour, minute, second])
    classList('.btn-play', 'add', 'mdi-play')
    classList('.btn-play', 'remove', 'mdi-pause')
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
        setTime(hour.value, minute.value, second.value)
        setDuration(numbers)
        interval = initTimer(numbers, stopInterval)
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
    hour.focus()
}

// objeto responsável por atribuir funções as teclas I e P na página
const keys = {
    p: pause,
    i: play
}

// verificando se é a primeira que acessa a página, se sim, mostra o modal de introdução
window.onload = () => {
    if (!localStorage.getItem('firstTime')) {
        classList('.modal-backdrop', 'remove', 'disable')
    }
}

// eventos da página

// evento dos botoões de iniciar e cancelar
btnStart.addEventListener('click', () => {
    isPause ? pause() : play()
    isPause = !isPause
})
btnCancel.addEventListener('click', stop)

// evento para pegar as teclas digitadas na página
document.body.addEventListener('keyup', (e) => {
    if (keys[e.key]) keys[e.key]()
})

// evento do botão de parar o alarme
document.querySelector('.btn-alarm').addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    classList('body', 'remove', 'alarm-animation')
    stop()
})

// evento para caso o alarme toque até o final
audio.addEventListener('ended', () => {
    classList('body', 'remove', 'alarm-animation')
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    stop()
})

// eventos de verificar e mudar os valores quando necessário
const inputs = [hour, minute, second],
    limits = [99, 59, 59]

inputs.forEach((input, index) => {
    /*
    - evento verifica se o valor é maior que o limite, se sim o valor vira 0
    - verica também se o valor é menor que 10, se sim, adiciona um 0 ao valor (ex: 9 => 09)
    */
    input.addEventListener('change', () => {
        let value = parseInt(input.value)
        value = value > limits[index] ? 0 : value
        input.value = value < 10 ? `0${value}` : value
    })

    // evento para limitar o input apenas para números 
    input.addEventListener('input', () => input.value = input.value.replace(/[^0-9]/g, ''))
})

// evento para o click do botão de fechar do modal de introdução
btnCloseModal.addEventListener('click', () => {
    classList('.modal-backdrop', 'add', 'disable')
    localStorage.setItem('firstTime', true)
    hour.focus()
})