<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_GET["id"])
  ) {
    $json = array(
      "isSuccess" => false,
      "message" => "Please add id in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = intval($_GET["id"]);

  $sql = "SELECT * FROM milu_todos WHERE id = ?";
  $statement = $conn->prepare($sql);
  $statement->bind_param("i", $id);  
  
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
  $row = $result->fetch_assoc();

  $json = array(
    "isSuccess" => true,
    "data" => array(
      "id" => $row["id"],
      "todo" => $row["todo"]
    )
  );

  $response = json_encode($json);
  echo $response;
?>
