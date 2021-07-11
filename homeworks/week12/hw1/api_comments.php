<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_GET["site_key"])
  ) {
    $json = array(
      "isSuccess" => false,
      "message" => "Please add site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET["site_key"];

  $limit = NULL;
  $statement = NULL;

  if (!empty($_GET['limit'])) {
    $limit = $_GET['limit'];
    $statement = $conn->prepare("SELECT * FROM milu_board WHERE site_key = ? ORDER BY id DESC LIMIT ?;");
    $statement->bind_param("si", $site_key, $limit);
  } else {
    $statement = $conn->prepare("SELECT * FROM milu_board WHERE site_key = ? ORDER BY id DESC;");
    $statement->bind_param("s", $site_key);
  }
  
  
  $result = $statement->execute();

  if (!$result) {
    $json = array(
      "isSuccess" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $statement->get_result();
  $comments = array();
  while($row = $result->fetch_assoc()) {
    array_push($comments, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  }

  $json = array(
    "isSuccess" => true,
    "comments" => $comments
  );

  $response = json_encode($json);
  echo $response;
?>
