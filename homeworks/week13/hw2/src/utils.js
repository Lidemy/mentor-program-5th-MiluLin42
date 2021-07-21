export function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">(${escapeHTML(comment.id.toString())}) ${escapeHTML(comment.nickname)}</h5>
        <p class="card-text">${escapeHTML(comment.content)}</p>
      </div>
    </div>
  `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}
