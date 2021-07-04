<?php
  session_start();
  require_once("conn.php");
  require_once('utils.php');

  if (
    empty($_GET['id'] || empty($_GET['role']))
  ) {
    die('請輸入完整資料');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_GET['id'];
  $role = $_GET['role'];

  if (!$user || $user['role'] !== 'administrator') {
    header('Location: index.php');
    exit;
  }
  
  $sql = 'update milu_users set role=? where id=?';
  $statement = $conn->prepare($sql);
  $statement->bind_param('si', $role, $id);

  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  
  header('Location: administrator.php');
?>
