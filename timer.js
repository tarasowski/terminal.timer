const exec = require('child_process').execSync

const compose = (...fns) => x =>
    fns.reduceRight((v, f) => f(v), x)

const print = type => sec =>
    process.stdout.write(`Remaining Time fo ${type}: ` + Math.round(sec / 60) + " Minutes \r")

const message = msg => () =>
    exec(`osascript -e 'display notification "${msg.message}" with title "${msg.title}" sound name "Submarine"'`)

const pause = (sec) =>
    sec === 0
        ? (message({ title: 'End', message: 'Pause is over!' })(), console.log('\x1b[32m', 'Pause is over!', '\x1b[0m'))
        : print('Pause')(sec) && setTimeout(() => pause(sec - 1), 1000)

const stop = sec => compose(
    message({ title: 'Pause', message: '5 Minutes Pause has been started!' }),
    pause
)(sec)


const counter = sec =>
    sec === 0
        ? stop(300)
        : print('Work')(sec) && setTimeout(() => counter(sec - 1), 1000)

const start = sec => compose(
    message({ title: 'Work', message: '25 Minutes Timer has been started!' }),
    counter
)(sec)


module.exports = { start }







