import $ from 'jquery'
import { getCommentsFromAPI, addComments } from './api'
import { appendCommentToDOM } from './utils'
import { getLoadMoreButton, getForm } from './templates'
/* eslint-disable-next-line */
export function init(options) {
  const { apiURL, siteKey } = options
  let containerElement = null
  let limit = 5
  let total = null
  let count = 0

  const loadMoreClassName = `${siteKey}-load-more`
  const commentsClassName = `${siteKey}-comments`
  const formClassName = `${siteKey}-add-comment-form`
  const commentsSelector = `.${commentsClassName}`
  const loadMoreSelector = `.${loadMoreClassName}`
  const formSelector = `.${formClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  getComments()

  $(commentsSelector).on('click', loadMoreSelector, () => {
    limit += 5
    getComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()

    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)

    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiURL, newCommentData, (data) => {
      if (!data.isSuccess) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')

      if (total === count) {
        count = 0
      }
      getComments()
    })

    if (total === limit) {
      limit += 5
    }
  })

  function getComments() {
    getCommentsFromAPI(apiURL, siteKey, limit, (data) => {
      if (!data.isSuccess) {
        alert(data.message)
        return
      }
      const { comments } = data
      $(commentsSelector).empty()
      if (total === null || comments[0].id > total) {
        total = comments[0].id
      }
      for (const comment of comments) {
        appendCommentToDOM($(commentsSelector), comment, false)
        count++
      }
      if (total > count) {
        const loadMoreButton = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButton)
        count = 0
      }
    })
  }
}
