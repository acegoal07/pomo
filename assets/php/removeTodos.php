<?php
include 'index.php';

$stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
$stmt->bind_param("s", $_POST['taskID']);
$stmt->execute();

if ($stmt->error) {
   $response['success'] = false;
} else {
   $response['success'] = true;
}

$stmt->close();
echo json_encode($response);
