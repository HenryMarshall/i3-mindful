"use strict";

const Timer = require('./Timer')
const options = require('./options')

const timer = new Timer(options)
console.log("Initialized Mindfulness Timer")
timer.takeAction()
