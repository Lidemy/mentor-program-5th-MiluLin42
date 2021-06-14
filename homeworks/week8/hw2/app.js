const API_URL = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'mmi8tl6jz6vm8dxy57upcspxfe2wkd'
const STREAM_TEMPLATE = `
<div class="stream">
  <img src="$preview">
  <div class="stream__content">
    <div class="stream__avatar">
      <img src="$logo">
    </div>
    <div class="stream__intro">
      <div class="stream__title">
      $title
      </div>
      <div class="stream__channel">
      $channel
      </div>
    </div>
  </div>
</div>
`

getGames((games) => {
  for (const game of games) {
    const gameList = document.createElement('li')
    gameList.innerText = game.game.name
    document.querySelector('.navbar__list').appendChild(gameList)
  }
  switchGames(games[0].game.name)
})

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText
    switchGames(gameName)
  }
})

function switchGames(gameName) {
  document.querySelector('h1').innerText = gameName
  document.querySelector('.streams').innerHTML = ''
  caughtStreams(gameName, (streams) => {
    for (const stream of streams) {
      appendStream(stream)
    }
    addPlaceholder()
  })
}

function appendStream(stream) {
  const frame = document.createElement('div')
  document.querySelector('.streams').appendChild(frame)
  frame.outerHTML = STREAM_TEMPLATE
    .replace('$preview', stream.preview.large)
    .replace('$logo', stream.channel.logo)
    .replace('$title', stream.channel.status)
    .replace('$channel', stream.channel.name)
}

function getGames(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}/games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      const games = JSON.parse(this.response).top
      callback(games)
    }
  }
  request.send()
}

function caughtStreams(gameName, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}/streams?game=${encodeURIComponent(gameName)}&limit=20`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data
      try {
        data = JSON.parse(this.response).streams
      } catch (err) {
        console.log(err)
        return
      }
      callback(data)
    } else {
      console.log('status:', this.status)
    }
  }
  request.onerror = function() {
    console.log('error')
  }
  request.send()
}

function addPlaceholder() {
  const placeholder = document.createElement('div')
  placeholder.classList.add('stream-empty')
  document.querySelector('.streams').appendChild(placeholder)
}
