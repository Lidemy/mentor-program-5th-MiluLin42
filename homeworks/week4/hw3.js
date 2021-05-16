import request from 'request'

const BASE_URL = 'https://restcountries.eu/rest/v2'
const name = process.argv[2]

function hw() {
  if (!name) {
    return console.log('請輸入國家名稱')
  }

  request(
    `${BASE_URL}/name/${name}`,
    (error, response, body) => {
      if (error) {
        return console.log('Error!', error)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (error) {
        return console.log(error)
      }
      if (data.status === 404) {
        return console.log('找不到國家資訊')
      }
      for (let i = 0; i < data.length; i++) {
        console.log('============')
        console.log(`國家:${data[i].name}`)
        console.log(`首都:${data[i].capital}`)
        console.log(`貨幣:${data[i].currencies[0].code}`)
        console.log(`國碼:${data[i].callingCodes[0]}`)
      }
    })
}

hw()
