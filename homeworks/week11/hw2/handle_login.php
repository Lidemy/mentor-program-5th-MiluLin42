<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['username']) ||
    empty($_POST['password']) 
  ) {
    header('Location: login.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM milu_users WHERE username=?";
  $statement = $conn->prepare($sql);
  $statement->bind_param("s", $username);
  $result = $statement->execute();
  if (!$result) {
    die($conn->error);
  }

  $result = $statement->get_result();
  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }

?>