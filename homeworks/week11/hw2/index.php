<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $statement = $conn->prepare(
    'select ' .
      'P.id as id, P.content as content, P.title as title, ' .
      'P.created_at as created_at, ' .
      'U.username as username ' .
    'from milu_posts as P ' .
    'left join milu_users as U on P.username = U.username ' .
    'where P.is_deleted = 0 ' .
    'order by P.id desc ' .
    'limit ? offset ? '
  );
  $statement->bind_param('ii', $items_per_page, $offset);
  $result = $statement->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $statement->get_result()
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
  <?php include_once('navbar.php') ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="posts">
      <?php
          while($row = $result->fetch_assoc()) {
      ?> 
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
            <?php echo substr(escape($row['content']), 0, 120); ?>
          </div>
          <a class="btn-read-more" href="post.php?id=<?php echo escape($row['id']); ?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>
  <div class="board__hr"></div>
    <?php
      $statement = $conn->prepare(
        'select count(id) as count from milu_posts where is_deleted = 0'
      );
      $result = $statement->execute();
      $result = $statement->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_per_page);
    ?>
  <div class="page__info">
      <span>總共有 <?php echo escape($count) ?> 篇文章，目前所在分頁：</span>
      <span><?php echo escape($page) ?> / <?php echo escape($total_page) ?></span>
    </div>
    <div class="paginator">
      <?php if ($page !== 1) { ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo escape($page) - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo escape($page) + 1 ?>">下一頁</a>
        <a href="index.php?page=<?php echo escape($total_page) ?>">最末頁</a>
      <?php } ?>
    </div>
  <footer>Copyright © 2020 Demo's Blog All Rights Reserved.</footer>
</body>
</html>