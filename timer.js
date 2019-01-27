const compose = (...fns) => x =>
    fns.reduceRight((v, f) => f(v), x)
const print = type => sec =>
    process.stdout.write(`Remaining Time fo ${type}: ` + Math.round(sec / 60) + " Minutes \r")

const pause = (sec = 300) =>
    sec === 0
        ? console.log('\x1b[32m', 'Pause is finished go back to work', '\x1b[0m')
        : print('Pause')(sec) && setTimeout(() => pause(sec - 1), 1000)

const counter = sec =>
    sec === 0
        ? pause()
        : print('Work')(sec) && setTimeout(() => counter(sec - 1), 1000)

counter((process.argv[2] * 60) || 1500)






