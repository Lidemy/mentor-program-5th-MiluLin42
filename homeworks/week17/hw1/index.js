/*  eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./db')

const app = express()
const port = process.env.PORT || 5001

const blogController = require('./controllers/blog')
const userController = require('./controllers/user')

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout, redirectBack)

app.get('/', blogController.getAll)
app.get('/administration', blogController.admin)
app.get('/post/:id', blogController.get)
app.get('/newPost', (req, res) => {
  res.render('newPost')
})
app.post('/newPost', blogController.add)

app.get('/update_posts/:id', blogController.update)
app.post('/update_posts/:id', blogController.handleUpdate)
app.get('/delete_posts/:id', blogController.delete)

app.listen(port, () => {
  db.connect()
  console.log(`Example app listening on port ${port}!`)
})
