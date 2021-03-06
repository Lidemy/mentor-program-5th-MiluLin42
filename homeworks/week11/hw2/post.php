<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = intval($_GET['id']);

  $statement = $conn->prepare(
    'SELECT ' .
      'P.id AS id, P.content AS content, P.title AS title, ' .
      'P.created_at AS created_at, ' .
      'U.username AS username ' .
    'FROM milu_posts AS P ' .
    'LEFT JOIN milu_users AS U ON P.username = U.username ' .
    'WHERE P.id = ? '
  );
  $statement->bind_param('i', $id);
  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $statement->get_result();
  $row = $result->fetch_assoc();

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php include_once('navbar.php'); ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']); ?></div>
          <div class="post__actions">
            <?php if (!empty($_SESSION['username'])) { ?>
              <a class="post__action" href="edit_post.php?id=<?php echo escape($row['id']); ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']); ?>
        </div>
        <div class="post__content">
          <?php echo escape($row['content']); ?>
        </div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Demo's Blog All Rights Reserved.</footer>
</body>
</html>