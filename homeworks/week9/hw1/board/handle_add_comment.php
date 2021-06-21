<?php
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=1');
    die('請輸入留言內容！');
  }

  $user = getUserFromToken($_COOKIE['token']);
  $nickname = $user['nickname'];
  $content = $_POST['content'];

  $sql = sprintf(
    "insert into milu_comments(nickname, content) values ('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>