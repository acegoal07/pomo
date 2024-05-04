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
   } else {
      switch ($_POST['requestType']) {
            // Get all todos for a specific user
         case 'getTodos':
            if (!isset($_POST['username'])) {
               echo json_encode(array('success' => false));
            } else {
               $stmt = $conn->prepare("SELECT * FROM tasks WHERE userName = ?");
               $stmt->bind_param("s", $_POST['username']);
               if ($stmt->execute()) {
                  $result = $stmt->get_result();
                  $data = array();
                  if ($result->num_rows > 0) {
                     while ($row = $result->fetch_assoc()) {
                        array_push($data, $row);
                     }
                  }
                  $response['success'] = true;
                  $response['username'] = $_POST['username'];
                  $response['todos'] = $data;
                  http_response_code(200);
                  echo json_encode($response);
               } else {
                  http_response_code(500);
                  echo json_encode(array('success' => false));
               }
               $stmt->close();
               $conn->close();
            }
            break;
            // Create a new todo for a user
         case 'createTodo':
            if (!isset($_POST['username']) || !isset($_POST['taskContent'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $username = $_POST['username'];
               $task = $_POST['taskContent'];
               $stmt = $conn->prepare("INSERT INTO tasks (userName, taskName) VALUES (?, ?)");
               $stmt->bind_param("ss", $username, $task);
               if ($stmt->execute()) {
                  $response['success'] = true;
                  $response['taskID'] = $stmt->insert_id;
                  http_response_code(200);
               } else {
                  $response['success'] = false;
                  http_response_code(500);
               }
               $stmt->close();
               $conn->close();
               echo json_encode($response);
            }
            break;
            // Delete a specific todo for a user
         case 'deleteTodo':
            if (!isset($_POST['taskID'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
               $stmt->bind_param("s", $_POST['taskID']);
               if ($stmt->execute()) {
                  $response['success'] = true;
                  http_response_code(200);
               } else {
                  $response['success'] = false;
                  http_response_code(500);
               }
               $stmt->close();
               $conn->close();
               echo json_encode($response);
            }
            break;
            // Edit a specific todo for a user
         case 'editTodo':
            if (!isset($_POST['taskID']) || !isset($_POST['taskContent'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $stmt = $conn->prepare("UPDATE tasks SET taskName = ? WHERE taskID = ?");
               $stmt->bind_param("ss", $_POST['taskContent'], $_POST['taskID']);
               if ($stmt->execute()) {
                  $response['success'] = true;
                  $response['taskID'] = $_POST['taskID'];
                  http_response_code(200);
               } else {
                  $response['success'] = false;
                  http_response_code(500);
               }
               $stmt->close();
               $conn->close();
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
               if ($stmt->execute()) {
                  $result = $stmt->get_result();
                  if ($result->num_rows > 0) {
                     $response['success'] = true;
                  } else {
                     $response['success'] = false;
                  }
                  http_response_code(200);
                  echo json_encode($response);
               } else {
                  http_response_code(500);
                  echo json_encode(array('success' => false));
               }
               $stmt->close();
               $conn->close();
            }
            break;
            // Register a user
         case 'register':
            if (!isset($_POST['username']) || !isset($_POST['password'])) {
               http_response_code(400);
               echo json_encode(array('success' => false));
            } else {
               $username = $_POST['username'];
               $password = $_POST['password'];
               $stmt = $conn->prepare("SELECT * FROM users WHERE userName = ?");
               $stmt->bind_param("s", $username);
               if ($stmt->execute()) {
                  $result = $stmt->get_result();
                  if ($result->num_rows > 0) {
                     $response['success'] = false;
                     $response['message'] = 'Username already exists';
                  } else {
                     $stmt = $conn->prepare("INSERT INTO users (userName, Password) VALUES (?, ?)");
                     $stmt->bind_param("ss", $username, $password);
                     if ($stmt->execute()) {
                        $response['success'] = true;
                        $response['username'] = $username;
                        echo json_encode($response);
                     } else {
                        http_response_code(500);
                        echo json_encode(array('success' => false));
                     }
                  }
               } else {
                  http_response_code(500);
                  echo json_encode(array('success' => false));
               }
               $stmt->close();
               $conn->close();
            }
            // No request type was provided
         default:
            http_response_code(400);
            echo json_encode(array('success' => false));
            break;
      }
   }
}
