<?php
  require_once("conn.php");
  require_once('utils.php');

  $username = NULL;
  if (!empty($_COOKIE['token'])) {
    $user = getUserFromToken($_COOKIE['token']);
    $username = $user['username'];
  }

  $result = $conn->query("select * from milu_comments order by id desc");
  if (!$result) {
    die('Error:' . $conn->error);
  }

?>

<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
    <?php if (!$username) { ?>
      <a class="board__register--btn" href="register.php">註冊</a>
      <a class="board__login--btn" href="login.php">登入</a>
    <?php } else { ?>
      <a class="board__logout--btn" href="logout.php">登出</a>
      <h3 class="board__welcome">歡迎回來，<?php echo $username; ?>！</h3>
    <?php } ?>
    <h1 class="board__title">Comments</h1>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '請輸入暱稱與留言內容！';
        }
        echo '<h2 class="errMsg">錯誤：' . $msg . '</h2>';
      }
    ?>
    <?php if ($username) { ?>
      <form class="board__form--comments" method="POST" action="handle_add_comment.php">
        <textarea name="content" rows="5">
        </textarea>
        <input class="board__form--submit" type="submit" />
      </form>
    <?php } else { ?>
      <h3 class="board__notice">請登入以發布留言</h3>
    <?php } ?>
    <div class="board__hr"></div>
    <section>
      <?php
        while($row = $result->fetch_assoc()) {
      ?>
        <div class="card">
          <div class="card__avatar">
          </div>
          <div class="card__text">
            <div class="card__info">
              <span class="card__info--name">
                <?php echo $row['nickname']; ?>
              </span>
              <span class="card__info--time">
                <?php echo $row['created_at']; ?>
              </span>
            </div>
            <p class="card__content"><?php echo $row['content']; ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>

</html>