export function getLoadMoreButton(className) {
  return `<button class="load-more btn btn-primary ${className} mt-3">載入更多留言</button>`
}

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class="${className} mt-3">
      <div class="form-group mb-3">
        <label>暱稱</label>
        <input type="text" name="nickname" class="form-control">
      </div>        
      <div class="form-group mb-3">
        <label>留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    
    <div class="${commentsClassName}">
    </div>
  </div>`
}
