// eslint-disable-next-line
const db = require('../db')

const userModel = {
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
