const getIdleTime = require('./getIdleTime')
const questionUser = require('./questionUser')
const options = require('./options')

initialize()

function initialize() {
  const startTime = Date.now()
  timer(startTime, () => {
    console.log("mah callback!")
    questionUser(recallTimer)
  })
}

function timer(startTime, callback) {
  getIdleTime(idleTime => {
    const currentTime = Date.now()

    if (isIdle(idleTime)) {
      console.log("is idle")
      recallTimer()
    }
    else if (shouldPrompt(startTime, currentTime)) {
      console.log("should prompt")
      callback()
    }
    else {
      console.log("running...")
      recallTimer(startTime)
    }
  })
}

function isIdle(idleTime) {
  return idleTime >= options.idleReset
}

function shouldPrompt(startTime, currentTime) {
  return options.promptInterval <= currentTime - startTime
}

function recallTimer(startTime = Date.now()) {
  setTimeout(() => {
    timer(startTime)
  }, options.loopInterval)
}
