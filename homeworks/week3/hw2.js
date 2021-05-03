const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const temp = lines[0].split(' ')
  const n = Number(temp[0])
  const m = Number(temp[1])
  for (let i = n; i <= m; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

rl.on('close', () => {
  solve(lines)
})

// 判斷為幾位數
function digitsCount(n) {
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}
// 判斷是否為水仙花數
function isNarcissistic(n) {
  let m = n
  const digits = digitsCount(n)
  let sum = 0
  while (m !== 0) {
    const num = m % 10
    sum += num ** digits
    m = Math.floor(m / 10)
  }
  return sum === n
}
