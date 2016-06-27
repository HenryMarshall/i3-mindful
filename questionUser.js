const fs = require('fs')
const os = require('os')
const path = require('path')
const process = require('process')

const prompt = require('prompt')
const options = require('./options')

module.exports = questionUser

prompt.start()
function questionUser(callback) {
  const prompts = options.questions.map(question => {
    return {
      name: question.name,
      description: question.description + `\n>`
    }
  })

  prompt.get(prompts, function(error, answers) {
    if (error) { throw error }
    writeAnswers(answers, callback)
  })
}

function writeAnswers(answers, callback) {
  if (!options.savePath) { throw new Error("options.savePath must be defined") }
  const absoluteSavePath = path.join(os.homedir(), options.savePath)
  fs.appendFile(absoluteSavePath, buildMessage(answers), (error) => {
    if (error) { throw error }
    provideFeedback()
    callback()
  })
}

function buildMessage(answers) {
  const now = new Date().toISOString()
  const log = options.questions.map((question) => {
    return `##${question.description}\n${answers[question.name]}`
  }).join('\n')
  return `#${now}\n${log}\n\n`
}

function provideFeedback() {
  process.stdout.write('\033c')
  const minutes = Math.round(options.promptInterval / (60 * 1000))
  console.log(
    `Output written. Will prompt again after ${minutes} minutes of activity`
  )
}
