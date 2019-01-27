const exec = require('child_process').execSync

const message = msg => () =>
    exec(`osascript -e 'display notification "${msg}" with title "Terminal Timer" sound name "Submarine"'`)

message('Hello message 1')()
message('Hello message 2')()