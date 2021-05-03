const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    const n = Number(lines[i])
    if (isPrime(n)) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

rl.on('close', () => {
  solve(lines)
})

function isPrime(n) {
  if (n === 1) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
