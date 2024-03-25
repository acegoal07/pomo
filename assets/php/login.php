use assets\php\index;
<?php
//this is what takes the connection from index, keeping it all private etc
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

$response = array();

if ($result->num_rows > 0) {
  //more can be added to the response but i don't know what we need, this will just declare the login was successful
  $response['success'] = true;
} else {
  $response['success'] = false;
  $response['message'] = "This user does not exist, or the password you have entered is incorrect";
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
