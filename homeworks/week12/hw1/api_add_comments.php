<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (
    empty($_POST['content']) ||
    empty($_POST['nickname']) ||
    empty($_POST['site_key'])
  ) {
    $json = array(
      "isSuccess" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  $sql = "INSERT INTO milu_board(site_key, nickname, content) VALUES (?, ?, ?)";
  $statement = $conn->prepare($sql);
  $statement->bind_param('sss', $site_key, $nickname, $content);
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

  $json = array(
    "isSuccess" => true,
    "message" => "Success!"
  );

  $response = json_encode($json);
  echo $response;

?>
