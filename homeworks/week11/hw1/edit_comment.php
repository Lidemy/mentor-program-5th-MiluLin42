<?php
  session_start();
  require_once("conn.php");
  require_once('utils.php');

  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
  $sql = 'SELECT * FROM milu_comments WHERE id = ? AND username = ?';
  if (isAdministrator($user)) {
    $sql = 'SELECT * FROM milu_comments WHERE id = ?';
  }
  $statement = $conn->prepare($sql);
  if (isAdministrator($user)) {
    $statement->bind_param('i', $id);
  } else {
    $statement->bind_param('is', $id, $username);
  }
  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $statement->get_result();
  $row = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
    <h1 class="board__title">編輯留言</h1>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '請勿送出空的留言';
        }
        echo '<h2 class="errMsg">錯誤：' . $msg . '</h2>';
      }
    ?>
      <form class="board__form--comments" method="POST" action="handle_edit_comment.php">
        <textarea name="content" rows="5"><?php echo escape($row['content']); ?></textarea>
        <input type="hidden" name="id" value="<?php echo $row['id']; ?>" />
        <input class="board__form--submit" type="submit" />
      </form>

  </main>
</body>
</html>
