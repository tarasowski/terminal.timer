#!/usr/bin/env node

const { start } = require('./timer')
start((process.argv[2] * 60) || 1500)
