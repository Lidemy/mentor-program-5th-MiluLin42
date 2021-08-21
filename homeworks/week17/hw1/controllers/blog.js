const blogModel = require('../models/blog')

const blogController = {
  getAll: (req, res) => {
    blogModel.getAll((err, results) => {
      if (err) console.log(err)
      res.render('blog', {
        posts: results
      })
    })
  },
  get: (req, res) => {
    const { id } = req.params.id
    blogModel.get(id, (err, result) => {
      res.render('post', {
        post: result
      })
    })
  },
  add: (req, res) => {
    if (!req.body.title || !req.body.content) {
      return res.redirect('/')
    }
    blogModel.add(req.session.username, req.body.title, req.body.content, (err) => res.redirect('/'))
  },
  update: (req, res) => {
    blogModel.get(req.params.id, (err, result) => {
      res.render('update', {
        post: result
      })
    })
  },
  handleUpdate: (req, res) => {
    blogModel.update(req.session.username, req.params.id, req.body.posts_title, req.body.posts_content, (err) => {
      res.redirect('/')
    })
  },
  delete: (req, res) => {
    blogModel.delete(req.session.username, req.params.id, (err) => {
      res.redirect('/')
    })
  },
  admin: (req, res) => {
    blogModel.getAll((err, results) => {
      if (err) console.log(err)
      res.render('administration', {
        posts: results
      })
    })
  }
}

module.exports = blogController
