const request = require('request')

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

request(
  `${API_ENDPOINT}/books?_limit=10`,
  (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    let books
    try {
      books = JSON.parse(body)
    } catch (err) {
      return console.log(err)
    }
    for (let i = 0; i < books.length; i++) {
      console.log(`${books[i].id} ${books[i].name}`)
    }
  })
