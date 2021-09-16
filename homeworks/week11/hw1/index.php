<?php
  session_start();
  require_once("conn.php");
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $statement = $conn->prepare(
    'SELECT ' .
      'C.id AS id, C.content AS content, C.created_at AS created_at, ' .
      'U.nickname AS nickname, U.username AS username ' .
    'FROM milu_comments AS C ' .
    'LEFT JOIN milu_users AS U ON C.username = U.username ' .
    'WHERE C.is_deleted = 0 ' .
    'ORDER BY C.id DESC ' .
    'LIMIT ? OFFSET ? '
  );
  $statement->bind_param('ii', $items_per_page, $offset);
  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $statement->get_result()

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
      <span class="board__nickname--btn">編輯暱稱</span>
      <?php if ($user && $user['role'] === 'administrator') { ?>
        <a class="board__admin--btn" href="administrator.php">管理後臺</a>
      <?php } ?>
      <form class="hide board__nickname--edit board__form--comments" method="POST" action="edit_user.php">
        <div class="board__login">
          <span>修改暱稱：</span>
          <input type="text" name="nickname" />
        </div>
        <input class="board__form--submit" type="submit" />
      </form>
      <h3 class="board__welcome">歡迎回來，<?php echo escape($user['nickname']); ?>！</h3>
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

    <form class="board__form--comments" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5"></textarea>
      <?php if ($username && !identification($user, 'addComment', NULL)) { ?>
        <h3 class="board__notice">你已被停權</h3>
      <?php } else if ($username) { ?>
        <input class="board__form--submit" type="submit" />
      <?php } else { ?>
        <h3 class="board__notice">請登入以發布留言</h3>
      <?php } ?>
    </form>
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
                <?php echo escape($row['nickname']); ?>
                (@<?php echo escape($row['username']); ?>)
              </span>
              <span class="card__info--time">
                <?php echo escape($row['created_at']); ?>
              </span>
              <?php if (identification ($user, 'edit', $row)) { ?>
                <a href="edit_comment.php?id=<?php echo escape($row['id']) ?>">編輯</a>
                <a href="handle_delete_comment.php?id=<?php echo escape($row['id']) ?>">刪除</a>
              <? } ?>
            </div>
            <p class="card__content"><?php echo escape($row['content']); ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
    <div class="board__hr"></div>
    <?php
      $statement = $conn->prepare(
        'select count(id) as count from milu_comments where is_deleted is NULL'
      );
      $result = $statement->execute();
      $result = $statement->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_per_page);
    ?>
    <div class="page__info">
      <span>總共有 <?php echo escape($count) ?> 筆留言，分頁：</span>
      <span><?php echo escape($page) ?> / <?php echo escape($total_page) ?></span>
    </div>
    <div class="paginator">
      <?php if ($page !== 1) { ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo escape($page) - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo escape($page) + 1 ?>">下一頁</a>
        <a href="index.php?page=<?php echo escape($total_page) ?>">最末頁</a>
      <?php } ?>
    </div>
  </main>
  <script src="./app.js"></script>
</body>

</html>