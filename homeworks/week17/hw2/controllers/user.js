// eslint-disable-next-line
const bcrypt = require('bcrypt')
const userModel = require('../models/user')

const userController = {
  login: (req, res) => {
    res.render('user/login')
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '請輸入完整資料')
      return next()
    }
    userModel.get(username, (err, user) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '帳號或密碼錯誤')
          return next()
        }
        req.session.username = user.username
        res.redirect('/')
      })
    })
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}

module.exports = userController
