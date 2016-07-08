"use strict";

const leftPad = require('left-pad')

const getIdleTime = require('./getIdleTime')
const questionUser = require('./questionUser')
const hooks = require('./hooks')("i3")

class Timer {
  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key]
    })

    this.startTime = Date.now()
  }

  takeAction() {
    getIdleTime(idleTime => {
      this.idleTime = idleTime
      this.determineAction()
    })
  }

  determineAction() {
    if (this.shouldPrompt()) {
      hooks.onPrompt()
      questionUser(callback.bind(this))

      function callback() {
        this.startTime = Date.now()
        this.delayedAction()
        hooks.onWrite()
      }
    }
    else {
      if (this.isIdle()) {
        const currentTime = Date.now()
        this.startTime = currentTime
      }
      this.logCountdown()
      this.delayedAction()
    }
  }

  logCountdown() {
    // clear the console and reset the cursor
    console.log('\x1B[2J\x1B[0f')
    console.log("Mindfulness Time")
    // There is intentionally no space after `next prompt`, and a space after
    // `idle reset` to line up the countdowns
    console.log(
      "Time til next prompt:",
      this.humanReadableTime(this.promptInterval - this.timeTilPrompt())
    )
    console.log(
      "Time til idle reset: ",
      this.humanReadableTime(Math.max(this.idleReset - this.idleTime + 999), 0)
    )
  }

  humanReadableTime(ms) {
    const date = new Date(ms)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds()

    return [hh, mm, ss]
      .map(number => leftPad(number, 2, 0))
      .join(':')
  }

  timeTilPrompt() {
    const currentTime = Date.now()
    return currentTime - this.startTime
  }

  shouldPrompt() {
    return this.promptInterval <= this.timeTilPrompt()
  }

  isIdle() {
    return this.idleTime >= this.idleReset
  }

  delayedAction() {
    // We must avoid `this` taking the scope of setTimeout
    const takeAction = this.takeAction.bind(this)
    setTimeout(takeAction, this.loopInterval)
  }
}

module.exports = Timer
