// eslint-disable-next-line
const bcrypt = require('bcrypt')

const userModel = require('../models/user')

const saltRounds = 10

const userController = {
  register: (req, res) => {
    res.render('user/register')
  },
  handleRegister: (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return req.flash('errorMessage', '請填寫完整資料')
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return req.flash('errorMessage', err.toString())
      }
      userModel.add({
        username,
        password: hash
      }, (err) => {
        if (err) {
          return req.flash('errorMessage', err.toString())
        }
        req.session.username = username
        res.redirect('/')
      })
    })
  },
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
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
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
