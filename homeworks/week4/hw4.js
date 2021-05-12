import request from 'request'

const CLIENT_ID = 'mmi8tl6jz6vm8dxy57upcspxfe2wkd'
const BASE_URL = 'https://api.twitch.tv/kraken'

request({
  method: 'GET',
  url: `${BASE_URL}/games/top`,
  headers: {
    'Client-ID': CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json'
  }
},
(err, res, body) => {
  if (err) {
    return console.log(err)
  }

  const data = JSON.parse(body)
  const gameBoard = data.top
  for (const game of gameBoard) {
    console.log(`${game.viewers} ${game.game.name}`)
  }
})
