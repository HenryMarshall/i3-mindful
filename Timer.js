"use strict";

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
      this.delayedAction()
    }
  }

  shouldPrompt() {
    const currentTime = Date.now()
    return this.promptInterval <= currentTime - this.startTime
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
