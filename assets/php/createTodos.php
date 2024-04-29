<?php
include 'index.php';

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
   echo json_encode(array('success' => false));
} else {
   $username = $_POST['username'];
   $task = $_POST['task'];

   $stmt = $conn->prepare("INSERT INTO tasks (userName, task) VALUES (?, ?)");
   $stmt->bind_param("ss", $username, $task);
   $stmt->execute();

   if ($stmt->error) {
      $response['success'] = false;
   } else {
      $response['success'] = true;
      $response['taskID'] = $stmt->insert_id;
   }

   $stmt->close();
   $conn->close();

   header('Content-Type: application/json');
   echo json_encode($response);
}