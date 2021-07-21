import $ from 'jquery'

export function getCommentsFromAPI(apiURL, siteKey, limit, cb) {
  $.ajax({
    type: 'GET',
    url: `${apiURL}/api_comments.php?site_key=${siteKey}&limit=${limit}`
  }).done((data) => {
    cb(data)
  })
}

export function addComments(apiURL, newComment, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiURL}/api_add_comments.php`,
    data: newComment
  }).done((data) => {
    cb(data)
  })
}
