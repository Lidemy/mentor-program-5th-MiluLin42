const request = require('request')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]

if (action === 'list') {
  listBooks()
} else if (action === 'read') {
  readBook(process.argv[3])
} else if (action === 'delete') {
  deleteBook(process.argv[3])
} else if (action === 'create') {
  createBook(process.argv[3])
} else if (action === 'update') {
  updateBook(process.argv[3], process.argv[4])
} else {
  console.log('Unknown Action!')
}

function listBooks() {
  request(
    `${BASE_URL}/books?_limit=20`,
    (err, res, body) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return console.log('發生錯誤', res.statusCode)
      }
      if (err) {
        return console.log('Error!', err)
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
}

function readBook(id) {
  request(
    `${BASE_URL}/books/${id}`,
    (err, res, body) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return console.log('發生錯誤', res.statusCode)
      }
      if (err) {
        return console.log('error', err)
      }
      let book
      try {
        book = JSON.parse(body)
      } catch (err) {
        return console.log(err)
      }
      return console.log(book.name)
    })
}

function deleteBook(id) {
  request.delete(
    `${BASE_URL}/books/${id}`,
    (err, res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return console.log('發生錯誤', res.statusCode)
      }
      if (err) {
        return console.log('刪除失敗', err)
      }
      console.log('刪除成功!')
    })
}

function createBook(name) {
  request.post({
    url: `${BASE_URL}/books`,
    form: {
      name
    }
  }, (err, res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return console.log('發生錯誤', res.statusCode)
    }
    if (err) {
      return console.log('新增失敗', err)
    }
    console.log('新增成功!')
  })
}

function updateBook(id, name) {
  request.patch({
    url: `${BASE_URL}/books/${id}`,
    form: {
      name
    }
  }, (err, res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return console.log('發生錯誤', res.statusCode)
    }
    if (err) {
      return console.log('更新失敗', err)
    }
    console.log('更新成功!')
  })
}
