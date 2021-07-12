<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (
    empty($_POST['todo'])
  ) {
    $json = array(
      "isSuccess" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];

  $sql = "INSERT INTO milu_todos(todo) VALUES (?)";
  $statement = $conn->prepare($sql);
  $statement->bind_param('s', $todo);
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
    "message" => "Success!",
    "id" => $conn->insert_id
  );

  $response = json_encode($json);
  echo $response;

?>
