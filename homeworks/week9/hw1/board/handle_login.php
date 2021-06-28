<?php
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['username']) ||
    empty($_POST['password']) 
  ) {
    header('Location: login.php?errCode=1');
    die('請輸入完整資料');
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
    "select * from milu_users where username='%s' and password='%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  if ($result->num_rows) {
    $token = generateToken();
    $sql = sprintf(
      "insert into milu_tokens(token, username) values ('%s', '%s')",
      $token,
      $username
    );
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }

    $expire = time() + 3600 * 24 *30;
    setcookie("token", $token, $expire);
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }

?>