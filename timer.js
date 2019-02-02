const exec = require('child_process').execSync

const compose = (...fns) => x =>
    fns.reduceRight((v, f) => f(v), x)

const print = type => sec =>
    process.stdout.write(`Remaining Time for ${type}: ` + Math.round(sec / 60) + " Minutes \r")
	
const message = msg => () =>
    exec(`osascript -e 'display notification "${msg.message}" with title "${msg.title}" sound name "Submarine"'`)

const messageAlert = msg => () =>
         exec(`osascript -e 'tell application (path to frontmost application as text) to display dialog "${msg}" buttons {"YES", "NO"} with icon caution sound name "Submarine"'`)

const pause = (sec) =>
    sec === 0
        ? exec(`osascript -e 'tell application (path to frontmost application as text) to display dialog "Your Pause is over. Please start another Pomodoro sessions!" buttons {"OK"} with icon caution'`) 
        : print('Pause')(sec) && setTimeout(() => pause(sec - 1), 1000)

const stop = sec => compose(
	message({title: 'Pause', message: '5 Minutes Pause has been started'}),
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







