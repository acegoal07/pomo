<?php
include 'index.php';

$username = $_POST['username'];

$stmt = $conn->prepare("SELECT * FROM todos WHERE userName = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
   $response['success'] = true;
   $response['message'] = "Todos retrieved successfully";
   $response['todos'] = array($result);
} else {
   $response['success'] = false;
   $response['message'] = "Failed to retrieve todos";
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
