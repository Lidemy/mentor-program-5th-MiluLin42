const API_URL = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'mmi8tl6jz6vm8dxy57upcspxfe2wkd'
const STREAM_TEMPLATE = `<div class="stream">
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
</div>`

async function runGetGames() {
  try {
    const json = await getGames()
    const games = json.top
    for (const game of games) {
      const gameList = document.createElement('li')
      gameList.innerText = game.game.name
      document.querySelector('.navbar__list').appendChild(gameList)
    }
    switchGames(games[0].game.name)
  } catch (err) {
    console.log('err', err)
  }
}
runGetGames()

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText
    switchGames(gameName)
  }
})

function switchGames(gameName) {
  document.querySelector('h1').innerText = gameName
  document.querySelector('.streams').innerHTML = ''
  async function runGetStreams() {
    try {
      const json = await getStreams(gameName)
      const { streams } = json
      for (const stream of streams) {
        appendStream(stream)
      }
    } catch (err) {
      console.log('err', err)
    }
  }
  runGetStreams()
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

async function getGames() {
  const response = await fetch(`${API_URL}/games/top?limit=5`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  })
  const data = await response.json()
  return data
}

async function getStreams(gameName) {
  const response = await fetch(`${API_URL}/streams?game=${encodeURIComponent(gameName)}&limit=20`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  })
  const data = await response.json()
  return data
}
