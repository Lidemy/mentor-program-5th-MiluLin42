<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['nickname'])
  ) {
    header('Location: index.php?errCode=1');
    die('請輸入完整資料');
  }

  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];
  $sql = "UPDATE milu_users SET nickname=? WHERE username=?";
  $statement = $conn->prepare($sql);
  $statement->bind_param('ss', $nickname, $username);
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>