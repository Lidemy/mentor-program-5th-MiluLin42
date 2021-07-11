const btn = document.querySelector('.board__nickname--btn')
btn.addEventListener('click', () => {
  const form = document.querySelector('.board__nickname--edit')
  form.classList.toggle('hide')
})
