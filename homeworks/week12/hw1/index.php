<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>Week12 留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./normalize.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    function escapeHTML(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function getCommentsAPI(siteKey, limit, cb) {
      $.ajax({
          type: 'GET',
          url: `http://mentor-program.co/mtr04group5/milu/Week12-Board/api_comments.php?site_key=${siteKey}&limit=${limit}`,
      }).done((data) => {
        if (!data.isSuccess) {
          alert(data.message)
          return
        }
        cb(data.comments)
      });
    }

    function addNewComment(newComment) {
      $.ajax({
        type: 'POST',
        url: 'http://mentor-program.co/mtr04group5/milu/Week12-Board/api_add_comments.php',
        data: newComment,
      }).done((data) => {
        if (!data.isSuccess) {
          alert(data.message)
          return
        }

        $('input[name=nickname]').val('')
        $('textarea[name=content]').val('')

        if (total === count) {
          count = 0
        }
        getComments()
      });
    }

    function getComments() {
      getCommentsAPI(siteKey, limit, (comments) => {
        $('.comments').empty()

        if (total === null || comments[0].id > total) {
          total = comments[0].id
        }
      
        for (let comment of comments) {
          appendCommentToDOM($('.comments'), comment, false)
          count++
        }
        if (total > count) {
          $('.comments').append(loadMoreButton)
          count = 0
        }
      });
    }

    function appendCommentToDOM(container, comment, isPrepend) {
      const html = `
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">(${escapeHTML(comment.id.toString())}) ${escapeHTML(comment.nickname)}</h5>
            <p class="card-text">${escapeHTML(comment.content)}</p>
          </div>
        </div>
      `
      if (isPrepend) {
        $('.comments').prepend(html)
      } else {
        $('.comments').append(html)
      }
    }

    const siteKey = "Week12"
    const loadMoreButton = `<button class="load-more btn btn-primary mt-3">載入更多留言</button>`
    let limit = 5
    let total = null
    let count = 0

    $(document).ready(() => {
      getComments()

      $('.comments').on('click', '.load-more', () => {
        limit += 5
        getComments()
      })

      $('.add-comment-form').submit((e) => {
        e.preventDefault();
        const newComment = {
          site_key: siteKey,
          nickname: $('input[name=nickname]').val(),
          content: $('textarea[name=content]').val()
        }
        addNewComment(newComment)
        if (total === limit) {
          limit +=5
        }
      })
  })

  </script>
</head>

<body>
  <div class="container">
    <form class="add-comment-form mt-3">
      <div class="mb-3">
        <label for="form-nickname" class="form-label">暱稱</label>
        <input type="text" name="nickname" class="form-control" id="form-nickname">
      </div>
      
      <div class="mb-3">
        <label for="form-content" class="form-label">留言內容</label>
        <textarea name="content" class="form-control" id="form-content" rows="3"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    
    <div class="comments mb-3">

    </div>
  </div>

</body>

</html>