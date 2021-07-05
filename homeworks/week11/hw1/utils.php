<?php
  require_once('conn.php');

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      "SELECT * FROM milu_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function identification($user, $action, $comment) {
    if ($user['role'] === 'administrator') {
      return true;
    }
    if ($user['role'] === 'general') {
      if ($action === 'addComment') return true;
      return $comment['username'] === $user['username'];
    }
    if ($user['role'] === 'suspended') {
      return $action !== 'addComment';
    }
  }

  function isAdministrator($user) {
    return $user['role'] === 'administrator';
  }
?>
