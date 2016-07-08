"use strict";
const exec = require('child_process').exec
const path = require('path')

function setHooks(dirName) {
  return {
    onPrompt: function() {
      callHook("onPrompt.sh")
    },
    onWrite: function() {
      callHook("onWrite.sh")
    }
  }

  function callHook(hookName) {
    const hookPath = path.join(__dirname, dirName, hookName)
    exec(`bash ${hookPath}`, (error, stdout, stderr) => {
      if(error) throw error
      if(stderr) throw new Error(stderr)
    })
  }
}


module.exports = setHooks
