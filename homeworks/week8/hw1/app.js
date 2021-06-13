const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errMessage = '系統不穩定，請再試一次'
function getPrize(callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', apiUrl, true)
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      let data
      try {
        data = JSON.parse(xhr.response)
      } catch (err) {
        callback(errMessage)
        return
      }
      if (!data.prize) {
        callback(errMessage)
        return
      }
      callback(null, data)
    }
  }
  xhr.onerror = function() {
    callback(errMessage)
  }
  xhr.send()
}

document.querySelector('.lottery__info--btn').addEventListener('click', () => {
  getPrize((err, data) => {
    if (err) {
      alert(err)
      return
    }

    const prizes = {
      FIRST: {
        className: 'first-prize',
        title: '恭喜你中頭獎了！日本東京來回雙人遊！'
      },
      SECONDE: {
        className: 'second-prize',
        title: '二獎！90 吋電視一台！'
      },
      THIRD: {
        className: 'third-prize',
        title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
      },
      NONE: {
        className: 'none-prize',
        title: '銘謝惠顧'
      }
    }

    const { className, title } = prizes[data.prize]

    document.querySelector('.lottery').classList.add(className)
    document.querySelector('.lottery__prize--title').innerText = title
    document.querySelector('.lottery__info').classList.add('hide')
    document.querySelector('.lottery__prize').classList.remove('hide')
  })
})
