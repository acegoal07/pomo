<?php
include 'index.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE userName = ? AND Password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
   $response['success'] = true;
   $response['message'] = "Login successful";
   $response['username'] = $result->fetch_assoc()["userName"];
} else {
   $response['success'] = false;
   $response['message'] = "This user does not exist, or the password you have entered is incorrect";
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
