const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const arrLength = Number(lines[0])
  for (let i = 1; i <= arrLength; i++) {
    const [a, b, k] = lines[i].split(' ')
    console.log(largerOrSmaller(a, b, k))
  }
}

rl.on('close', () => {
  solve(lines)
})

function largerOrSmaller(a, b, k) {
  const lengthA = a.length
  const lengthB = b.length
  if (a === b) {
    return 'DRAW'
  } else {
    if (k === 1) {
      if (lengthA === lengthB) {
        for (let i = 0; i < lengthA; i++) {
          if (a[i] === b[i]) {
            continue
          } else {
            return a[i] > b[i] ? 'A' : 'B'
          }
        }
      } else {
        return lengthA > lengthB ? 'A' : 'B'
      }
    } else {
      if (lengthA === lengthB) {
        for (let j = 0; j < lengthA; j++) {
          if (a[j] === b[j]) {
            continue
          } else {
            return a[j] < b[j] ? 'A' : 'B'
          }
        }
      } else {
        return lengthA < lengthB ? 'A' : 'B'
      }
    }
  }
}
