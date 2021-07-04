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
    <a class="board__register--btn" href="index.php">返回</a>
    <a class="board__login--btn" href="login.php">登入</a>
    <h1 class="board__title">註冊</h1>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '請輸入完整資料';
        } else if ($code === '2') {
          $msg = '帳號已被註冊';
        }
        echo '<h2 class="errMsg">錯誤：' . $msg . '</h2>';
      }
    ?>
    <form class="board__form--comments" method="POST" action="handle_register.php">
      <div class="board__login">
        <span>暱稱：</span>
        <input type="text" name="nickname" />
      </div>
        <div class="board__login">
        <span>帳號：</span>
        <input type="text" name="username" />
      </div>
      <div class="board__login">
        <span>密碼：</span>
        <input type="password" name="password" />
      </div>
      <input class="board__form--submit" type="submit" />
    </form>
  </main>
</body>

</html>