function setHooks(dir_name) {
  return {
    onPrompt: function() {
      console.log("onPrompt")
    },
    onWrite: function() {
      console.log("wrote")
    }
  }
}

module.exports = setHooks
