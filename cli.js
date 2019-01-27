#!/usr/bin/env node

const { counter } = require('./timer')
counter((process.argv[2] * 60) || 1500)