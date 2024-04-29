<?php
include 'index.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['username'])) {
   echo json_encode(array('success' => false));
} else {
   $stmt = $conn->prepare("SELECT * FROM tasks WHERE userName = ?");
   $stmt->bind_param("s", $_POST['username']);
   $stmt->execute();

   $result = $stmt->get_result();

   if ($result->num_rows > 0) {
      $data = array();
      while ($row = $result->fetch_assoc()) {
         array_push($data, $row);
      }
      $response['success'] = true;
      $response['username'] = $_POST['username'];
      $response['todos'] = $data;
   } else {
      $response['success'] = false;
      $response['username'] = $_POST['username'];
      $response['error'] = $stmt->error;
   }

   $stmt->close();
   $conn->close();

   header('Content-Type: application/json');
   echo json_encode($response);
}
