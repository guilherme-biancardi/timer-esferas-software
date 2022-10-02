// importando as funções do modulo app
import { isAlarm, isPause, pause, play, stop, stopAlarm, classList } from "./modules/app.js"

// elementos da página
const btnStart = document.querySelector('.btn-start'),
    btnCancel = document.querySelector('.btn-cancel'),
    btnCloseModal = document.querySelector('.btn-close'),
    audio = new Audio('../assets/audio.mp3')

// objeto responsável por atribuir funções as teclas I e P na página
// há também as funções de parar e encerrar o alarme
const keys = {
    'p': () => isAlarm ? null : pause(),
    'i': () => isAlarm ? null : play(),
    'Delete': stop,
    'End': stopAlarm,
}

// eventos da página

// evento dos botoões de iniciar e cancelar
btnStart.addEventListener('click', () => isPause ? pause() : play())
btnCancel.addEventListener('click', stop)

// evento para pegar as teclas digitadas na página
document.body.addEventListener('keyup', (event) => keys[event.key] ? keys[event.key]() : null)

// evento do botão de parar o alarme
document.querySelector('.btn-alarm').addEventListener('click', stopAlarm)

// evento para caso o alarme toque até o final
audio.addEventListener('ended', () => {
    isAlarm = false
    classList('body', 'remove', 'alarm-animation')
    classList('.btn-alarm', 'add', 'disable')
    classList('.btn-start', 'remove', 'disable')
    stop()
})

// eventos de verificar e mudar os valores quando necessário
const inputs = document.querySelectorAll('.inputs input'),
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
})