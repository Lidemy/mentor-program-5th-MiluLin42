const db = require('../models/index')

const { Prize } = db

const prizeController = {
  get: (req, res) => {
    Prize.findAll({
      where: {
        isActive: 1
      }
    }).then((prizes) => {
      res.render('prize', {
        prizes
      })
    })
  },
  lottery: (req, res) => {
    Prize.findAll({
      where: {
        isActive: 1
      }
    }).then((prizes) => {
      const result = []
      let sum = 100
      prizes.forEach((prize) => {
        const { prizeItem } = prize
        let num = Number(prize.probability)
        for (let i = 0; i < prizeItem.length; i++) {
          if (num > 0) {
            result.push(prizeItem)
            num -= 1
            sum -= 1
          }
        }
      })
      if (sum > 0) {
        for (let i = 0; i < sum; i++) {
          result.push('銘謝惠顧')
        }
      }
      const random = Math.floor(Math.random() * 100)
      if (result[random] !== '銘謝惠顧') {
        Prize.findOne({
          where: {
            prizeItem: result[random]
          }
        }).then((prize) => {
          res.render('lottery', {
            prize
          })
        })
      } else {
        res.render('lottery', {
          prize: {
            prizeItem: '銘謝惠顧',
            desc: '很抱歉，您沒有中獎…',
            picUrl: 'https://img.toy-people.com/member/161579847570.png'
          }
        })
      }
    })
  },
  add: (req, res) => {
    res.render('add_prize')
  },
  handleAdd: (req, res) => {
    const { username } = req.session
    const { prizeItem, picUrl, desc, probability } = req.body
    if (!username || !prizeItem || !picUrl || !desc || !probability) {
      return res.redirect('add_prize')
    }
    Prize.create({
      prizeItem,
      picUrl,
      desc,
      probability
    }).then(() => {
      res.redirect('/backstage')
    }).catch((err) => {
      console.log(err)
      res.redirect('/backstage')
    })
  },
  update: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      res.render('update_prize', { prize })
    })
  },
  handleUpdate: (req, res) => {
    const { username } = req.session
    const { prizeItem, picUrl, desc, probability, isActive } = req.body
    if (username) {
      Prize.findOne({
        where: {
          id: req.params.id
        }
      }).then((prize) => {
        prize.update({
          prizeItem,
          picUrl,
          desc,
          probability,
          isActive
        })
      }).then(() => {
        res.redirect('/backstage')
      }).catch(() => {
        res.redirect('/')
      })
    } else {
      res.redirect('/')
    }
  },
  delete: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      prize.update({
        isActive: 0
      })
    }).then(() => {
      res.redirect('/backstage')
    }).catch((err) => {
      console.log(err)
      res.redirect('/backstage')
    })
  },
  backstage: (req, res) => {
    const { username } = req.session
    if (username) {
      Prize.findAll().then((prizes) => {
        res.render('backstage', {
          prizes
        })
      })
    } else {
      res.redirect('/')
    }
  }
}

module.exports = prizeController
