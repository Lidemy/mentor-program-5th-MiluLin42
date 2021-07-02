<?php
  session_start();
  require_once("conn.php");
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if ($user === NULL || $user['role'] !== 'administrator') {
    header("Location: index.php");
    exit;
  }

  $statement = $conn->prepare(
    'select id, role, nickname, username from milu_users order by id asc'
  );
  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $statement->get_result()

?>

<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>後臺管理</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
    <section>
      <table>
        <tr>
          <th>id</th>
          <th>role</th>
          <th>nickname</th>
          <th>username</th>
          <th>調整身分</th>
        </tr>
      <?php
        while($row = $result->fetch_assoc()) {
      ?>
        <tr>
          <td><?php echo escape($row['id']); ?></td>
          <td><?php echo escape($row['role']); ?></td>
          <td><?php echo escape($row['nickname']); ?></td>
          <td><?php echo escape($row['username']); ?></td>
          <td>
            <a href="update_role.php?role=administrator&id=<?php echo escape($row['id']); ?>">管理員</a>
            <a href="update_role.php?role=general&id=<?php echo escape($row['id']); ?>">使用者</a>
            <a href="update_role.php?role=suspended&id=<?php echo escape($row['id']); ?>">停權</a>
          </td>
        </tr>
      <?php } ?>
      </table>
    </section>
  </main>
</body>

</html>