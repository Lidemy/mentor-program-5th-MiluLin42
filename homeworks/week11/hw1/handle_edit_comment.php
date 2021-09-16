<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['content'])
  ) {
    header('Location: edit_comment.php?errCode=1&id= ' . $_POST['id']);
    die('請輸入完整資料');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_POST['id'];
  $content = $_POST['content'];

  $sql = 'UPDATE milu_comments SET content=? WHERE id=? AND username=?';
  if (isAdministrator($user)) {
    $sql = 'UPDATE milu_comments SET content=? WHERE id=?';
  }
  $statement = $conn->prepare($sql);
  if (isAdministrator($user)) {
    $statement->bind_param('si', $content, $id);
  } else {
    $statement->bind_param('sis', $content, $id, $username);
  }

  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>