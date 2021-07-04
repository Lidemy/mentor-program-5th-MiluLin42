<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_GET['id'])
  ) {
    header('Location: index.php?errCode=1');
    die('請輸入完整資料');
  }

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  $sql = "update milu_comments set is_deleted=1 where id=? and username =?";
  if (isAdministrator($user)) {
    $sql = "update milu_comments set is_deleted=1 where id=?";
  }
  $statement = $conn->prepare($sql);
  if (isAdministrator($user)) {
    $statement->bind_param('i', $id);
  } else {
    $statement->bind_param('is', $id, $username);
  }
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>