<?php
include 'index.php';

$stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
$stmt->bind_param("s", $_POST['taskID']);
$stmt->execute();

if ($stmt->error) {
   $response['success'] = false;
   $response['taskID'] = $_POST['taskID'];
   $response['error'] = $stmt->error;
} else {
   $response['success'] = true;
   $response['taskID'] = $_POST['taskID'];
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
