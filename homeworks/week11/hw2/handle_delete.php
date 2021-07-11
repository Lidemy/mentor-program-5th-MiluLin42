<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_user.php');

  if (
    empty($_GET['id'])
  ) {
    header('Location: admin.php?errCode=1');
    die('資料不齊全');
  }

  $id = $_GET['id'];

  $sql = 'update milu_posts set is_deleted=1 where id=?';
  $statement = $conn->prepare($sql);
  $statement->bind_param('i', $id);
  
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>