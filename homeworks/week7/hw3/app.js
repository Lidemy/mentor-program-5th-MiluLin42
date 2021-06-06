document.querySelector('.btn-add').addEventListener('click', () => {
  const neweventValue = document.querySelector('.todo-input').value
  if (!neweventValue) return
  const newevent = document.createElement('div')
  newevent.classList.add('todo')
  newevent.innerHTML = `
    <input class="todo__check" type="checkbox">
    <div class="todo__item">${escapeHtml(neweventValue)}</div>
    <button class="btn-delete"></button>
    `
  document.querySelector('.todos').appendChild(newevent)
  document.querySelector('.todo-input').value = ''
})

document.querySelector('.todos').addEventListener('click', (e) => {
  const { target } = e
  if (target.classList.contains('btn-delete')) {
    target.parentNode.remove()
    return
  }

  if (target.classList.contains('todo__check')) {
    if (target.checked) {
      target.parentNode.classList.add('done')
    } else {
      target.parentNode.classList.remove('done')
    }
  }
})

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
