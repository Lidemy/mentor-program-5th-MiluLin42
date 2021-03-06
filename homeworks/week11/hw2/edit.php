<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php include_once('navbar.php') ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <div class="edit-post__btn">送出</div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Demo's Blog All Rights Reserved.</footer>
</body>
</html>