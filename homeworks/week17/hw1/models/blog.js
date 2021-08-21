// eslint-disable-next-line
const db = require('../db')

const blogModel = {
  getAll: (cb) => {
    db.query(
      'SELECT * FROM milu_posts WHERE is_deleted = 0 ORDER BY id DESC',
      (err, results) => {
        if (err) return cb(err)
        cb(null, results)
      })
  },
  get: (id, cb) => {
    db.query(
      'SELECT * FROM milu_posts WHERE id = ?', [id],
      (err, results) => {
        if (err) return cb(err)
        cb(null, results[0] || {})
      })
  },
  add: (username, title, content, cb) => {
    db.query(
      'INSERT INTO milu_posts(username, title, content) VALUES(?, ?, ?)', [username, title, content],
      (err, results) => {
        if (err) return cb(err)
        cb(null)
      })
  },
  update: (username, id, title, content, cb) => {
    db.query(
      'UPDATE milu_posts SET title = ? ,content = ? WHERE id = ? AND username = ?', [title, content, id, username],
      (err, results) => {
        if (err) return cb(err)
        cb(null)
      })
  },
  delete: (username, id, cb) => {
    db.query(
      'UPDATE milu_posts SET is_deleted = 1 WHERE id = ? AND username = ?', [id, username],
      (err, results) => {
        if (err) return cb(err)
        cb(null)
      })
  }
}

module.exports = blogModel
