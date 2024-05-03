<?php
include 'index.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
   http_response_code(400);
   echo json_encode(array('success' => false));
} else {
   if (!isset($_POST['requestType'])) {
      http_response_code(400);
      echo json_encode(array('success' => false));
      exit();
   } else {
      switch ($_POST['requestType']) {
            // Get all todos for a specific user
         case 'getTodos':
            if (!isset($_POST['username'])) {
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

               http_response_code(200);
               echo json_encode($response);
            }
            break;
            // Create a new todos for a user
         case 'createTodo':
            if (!isset($_POST['username']) || !isset($_POST['taskContent'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $username = $_POST['username'];
               $task = $_POST['taskContent'];

               $stmt = $conn->prepare("INSERT INTO tasks (userName, taskName) VALUES (?, ?)");
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

               http_response_code(200);
               echo json_encode($response);
            }
            break;
            // Delete a specific todos for a user
         case 'deleteTodos':
            if (!isset($_POST['taskID'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
               $stmt->bind_param("s", $_POST['taskID']);
               $stmt->execute();

               if ($stmt->error) {
                  $response['success'] = false;
               } else {
                  $response['success'] = true;
               }

               $stmt->close();
               $conn->close();

               http_response_code(200);
               echo json_encode($response);
            }
            break;
            // Login a user
         case 'login':
            if (!isset($_POST['username']) || !isset($_POST['password'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $stmt = $conn->prepare("SELECT * FROM users WHERE userName = ? AND password = ?");
               $stmt->bind_param("ss", $_POST['username'], $_POST['password']);
               $stmt->execute();

               $result = $stmt->get_result();

               if ($result->num_rows > 0) {
                  $response['success'] = true;
               } else {
                  $response['success'] = false;
               }

               $stmt->close();
               $conn->close();

               http_response_code(200);
               echo json_encode($response);
            }
            break;
            // No request type was provided
         default:
            http_response_code(400);
            echo json_encode(array('success' => false));
            break;
      }
   }
}
