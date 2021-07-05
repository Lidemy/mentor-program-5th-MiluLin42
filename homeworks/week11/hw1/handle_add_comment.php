<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=1');
    die('請輸入留言內容！');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  if (!identification($user, 'addComment', NULL)) {
    header("Location: index.php");
    exit;
  }

  $content = $_POST['content'];
  $sql = "INSERT INTO milu_comments(username, content) VALUES (?, ?)";
  $statement = $conn->prepare($sql);
  $statement->bind_param('ss', $username, $content);
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>