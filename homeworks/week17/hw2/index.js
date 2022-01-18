/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001

const prizeController = require('./controllers/prize')
const userController = require('./controllers/user')

app.use(express.static('public'))

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

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.get('/prize', prizeController.get)
app.get('/backstage', prizeController.backstage)
app.get('/lottery', prizeController.lottery)

app.get('/add_prize', prizeController.add)
app.post('/add_prize', prizeController.handleAdd)
app.get('/update_prize/:id', prizeController.update)
app.post('/update_prize/:id', prizeController.handleUpdate)
app.get('/delete_prize/:id', prizeController.delete)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
