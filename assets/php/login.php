<?php
include 'index.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['username']) || !isset($_POST['password'])) {
   echo json_encode(array('success' => false));
} else {
   $username = $_POST['username'];
   $password = $_POST['password'];

   $stmt = $conn->prepare("SELECT * FROM users WHERE userName = ? AND Password = ?");
   $stmt->bind_param("ss", $username, $password);
   $stmt->execute();

   $result = $stmt->get_result();

   if ($result->num_rows > 0) {
      $response['success'] = true;
      $response['username'] = $result->fetch_assoc()["userName"];
   } else {
      $response['success'] = false;
   }

   $stmt->close();
   $conn->close();

   header('Content-Type: application/json');
   echo json_encode($response);
}
