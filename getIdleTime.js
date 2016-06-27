const exec = require('child_process').exec

// Callback invoked with params: error, stdout, stderr
module.exports = (callback) => {
  exec('xprintidle', (error, stdout, stderr) => {
    if (error || stderr) {
      const msg = 
        "i3-mindful depends on `xprintidle`. Install with your package manager."
      console.error(msg)
      console.error(error, stderr)
    }
    else {
      callback(Number(stdout))
    }
  })
}
