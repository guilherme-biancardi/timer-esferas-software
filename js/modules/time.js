// variaveis e objetos do timer

let count = 0, timer = 0

// array com a lista de nomes das durações (horas, minutos e segundos)
const arrayTime = ['hour', 'minute', 'second']

// objeto com o valor dos tempos
const time = {
    hour: 0,
    minute: 0,
    second: 0
}   

// objeto com o valor de cada unidade de tempo convertida em milissegundos
// ex: 1 hora = 3.600.000 milissegundos
const durations = {
    hour: 3600000,
    minute: 60000,
    second: 1000
}

/* 
função responsável pela verificação e alteração dos tempos, 
fazendo o timer contar e mostrar o tempo corretamente
*/
// 01:00 => 00:59
const verifyTimer = () => {
    if (time.second <= 0) {
        time.second = 60
        time.minute--
    }
    if (time.minute <= 0 && time.hour > 0) {
        time.minute = 59
        time.hour--
    }
    time.second--
}

// funções para exportação

// função que pega os valores do tempo e os escreve na tela
const setTimeAtNumbers = (numbers) =>
    numbers.forEach((number, index) => {
        const value = parseInt(time[arrayTime[index]])
        number.innerHTML = value < 10 ? `0${value}` : value
    })

/*
função responsável por configurar a duração total do timer.

    - a variavel count é um contador
    - a variavel timer é o tempo total (em milissegundos) a ser percorrido
*/
const setDuration = (numbers) => {
    count = 0
    timer = 0
    Object.values(time).forEach((value, index) => timer += durations[arrayTime[index]] * value)
    setTimeAtNumbers(numbers)
}

/*
função responsável por inicializar o timer, recebendo um callback para ser chamado ao final do timer.

a lógica consiste em 3 partes:
    - o contador recebe + 1000 milissegundos
    - usa a verifyTimer() para atualizar os tempos
    - em seguida joga essas informações na tela com a setTimeAtNumbers()

quando o contador fica com o mesmo valor do timer (total de tempo que deve ser percorrido) ele chama a função de callback que sinaliza o fim do timer
*/
const initTimer = (numbers, stopCallback) => setInterval(() => {
    count += 1000
    verifyTimer()
    setTimeAtNumbers(numbers)
    if (count === timer) stopCallback()
}, 1000)

// função responsável por setar os valores do objeto time
const setTime = (hour, minute, second) => {
    time.hour = hour
    time.minute = minute
    time.second = second
}

// função responsável por atualizar o valor dos inputs quando o usuário pausa o timer
const updateTimer = (inputs) => inputs.forEach((input, index) => input.value = time[arrayTime[index]])

// funcão responsável por resetar os tempos para 0
const resetTime = () => setTime(0, 0, 0)

export { setTime, initTimer, setDuration, updateTimer, resetTime }