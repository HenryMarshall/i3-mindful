const getIdleTime = require('./getIdleTime')
const questionUser = require('./questionUser')
const options = require('./options')

initialize()

function initialize() {
  timer(Date.now(), () => {
    questionUser(recallTimer)
  })
}

function timer(startTime) {
  getIdleTime(idleTime => {
    const currentTime = Date.now()

    if (idleTime >= options.idleReset) {
      recallTimer()
    }
    else if (options.promptInterval <= currentTime - startTime) {
      callback()
    }
    else {
      recallTimer(startTime)
    }
  })
}

function recallTimer(startTime = Date.now()) {
  setTimeout(() => {
    timer(startTime)
  }, options.loopInterval)
}
