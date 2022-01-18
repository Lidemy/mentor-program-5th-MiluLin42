const db = require('../models')

const { Post } = db

const blogController = {
  getAll: (req, res) => {
    Post.findAll({
      where: {
        is_delete: 0
      }
    }).then((posts) => {
      res.render('blog', {
        posts
      })
    })
  },
  get: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then((post) => {
      res.render('post', { post })
    })
  },
  add: (req, res) => {
    const { username } = req.session
    const { title, content } = req.body
    if (!username || !title || !content) {
      return res.redirect('/newPost')
    }
    Post.create({
      title,
      content
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  },
  update: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then((post) => {
      res.render('update', { post })
    })
  },
  handleUpdate: (req, res) => {
    const { username } = req.session
    const { title, content } = req.body
    if (!username || !title || !content) {
      return res.redirect('/')
    }
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then((post) => post.update({
      title,
      content
    })).then(() => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  },
  delete: (req, res) => {
    const { username } = req.session
    if (username) {
      Post.findOne({
        where: {
          id: req.params.id
        }
      }).then((post) => {
        post.update({
          is_delete: 1
        })
      }).then(() => {
        res.redirect('administration')
      }).catch((err) => {
        console.log(err)
        res.redirect('/')
      })
    } else {
      res.redirect('/')
    }
  },
  admin: (req, res) => {
    const { username } = req.session
    if (username) {
      Post.findAll().then((posts) => {
        res.render('administration', {
          posts
        })
      })
    } else {
      res.redirect('/')
    }
  }
}

module.exports = blogController
