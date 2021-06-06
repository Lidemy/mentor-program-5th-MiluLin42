const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let hasError = false
  const values = {}
  const elements = document.querySelectorAll('.required')
  for (const element of elements) {
    const radios = element.querySelectorAll('input[type=radio]')
    const input = element.querySelector('input[type=text]')
    let isValid = true
    if (input) {
      values[input.name] = input.value
      if (!input.value) {
        isValid = false
      }
    } else if (radios.length) {
      isValid = [...radios].some((radio) => radio.checked)
      if (isValid) {
        const selection = element.querySelector('input[type=radio]:checked')
        values[selection.name] = selection.value
      }
    } else {
      continue
    }
    if (!isValid) {
      element.classList.remove('hide-error')
      hasError = true
    } else {
      element.classList.add('hide-error')
    }
  }
  if (!hasError) {
    alert(`
    暱稱: ${values.nickname}
    電子郵件: ${values.email}
    手機號碼: ${values.cellphone}
    報名類型: Type${values.selection}
    怎麼知道這個活動的: ${values.howtoknow}
    請確認以上資料填寫無誤!
    `)
  }
})
