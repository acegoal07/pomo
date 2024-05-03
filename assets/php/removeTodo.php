<?php
include 'index.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['taskID'])) {
   echo json_encode(array('success' => false));
} else {
   $stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
   $stmt->bind_param("s", $_POST['taskID']);
   $stmt->execute();

   if ($stmt->error) {
      $response['success'] = false;
      $response['taskID'] = $_POST['taskID'];
   } else {
      $response['success'] = true;
      $response['taskID'] = $_POST['taskID'];
   }

   $stmt->close();
   $conn->close();

   header('Content-Type: application/json');
   echo json_encode($response);
}
