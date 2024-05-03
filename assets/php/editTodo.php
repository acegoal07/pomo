<?php
include 'index.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === "POST" || !isset($_POST['taskID']) || !isset($_POST['taskContent'])) {
   echo json_encode(array('success' => false));
} else {
   $stmt = $conn->prepare("UPDATE tasks SET taskName = ? WHERE taskID = ?");
   $stmt->bind_param("ss", $_POST['taskContent'], $_POST['taskID']);
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

   echo json_encode($response);
}