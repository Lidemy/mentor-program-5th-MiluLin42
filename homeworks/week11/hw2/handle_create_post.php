<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['content']) ||
    empty($_POST['title'])
    ) {
    header('Location: create_post.php?errCode=1');
    die('請檢查標題和內容是否為空白');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  $content = $_POST['content'];
  $title = $_POST['title'];
  $sql = 'insert into milu_posts(username, title, content) values (?, ?, ?)';
  $statement = $conn->prepare($sql);
  $statement->bind_param('sss', $username, $title, $content);
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>