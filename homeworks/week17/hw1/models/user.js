// eslint-disable-next-line
const db = require('../db')

const userModel = {
  // register
  add: (user, cb) => {
    db.query(
      'INSERT INTO users(username, password) VALUES(?, ?)',
      [user.username, user.password],
      (err, results) => {
        if (err) return cb(err)
        cb(null)
      })
  },
  // login
  get: (username, cb) => {
    db.query(
      'SELECT * FROM users WHERE username= ?', [username],
      (err, results) => {
        if (err) return cb(err)
        cb(null, results[0])
      })
  }
}

module.exports = userModel