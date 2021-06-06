document.querySelector('.faq-block').addEventListener('click', (e) => {
  const element = e.target.closest('.faq-item')
  if (element) {
    element.classList.toggle('hide-answer')
  }
})
