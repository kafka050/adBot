const fs = require('fs')
const cp = require('child_process')

function pidIsRunning(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch (e) {
    return false
  }
}
let data
try {
  data = fs.readFileSync('pid.txt')
} catch (e) {
  data = '999999999'
}
const pid = parseInt(data)
if (pidIsRunning(pid)) {
  process.kill(pid, 'SIGINT')
}

const child = cp.fork('src/index.js', {
  detached: true,
  stdio: 'ignore',
})
fs.writeFileSync('pid.txt', child.pid.toString())
child.unref()
process.exit()
