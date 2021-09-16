<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_user.php');

  $page = $_POST['page'];

  if (
    empty($_POST['id']) ||
    empty($_POST['title']) ||
    empty($_POST['content'])
  ) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die('內容不齊全');
  }

  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  $sql = 'UPDATE milu_posts SET title=?, content=? WHERE id=?';
  $statement = $conn->prepare($sql);
  $statement->bind_param('ssi', $title, $content, $id);
  
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: ' . $page);
?>