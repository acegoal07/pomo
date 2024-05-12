<?php
include 'index.php';
header('Content-Type: application/json');
try {
   if ($conn->connect_error) {
      http_response_code(500);
      echo json_encode(array('success' => false));
   } elseif ($_SERVER['REQUEST_METHOD'] !== "POST") {
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
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT taskID, taskContent FROM tasks WHERE userName = ?");
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
                  } else {
                     $response['success'] = false;
                     http_response_code(500);
                  }
                  $stmt->close();
                  $conn->close();
                  echo json_encode($response);
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
                  $stmt = $conn->prepare("INSERT INTO tasks (userName, taskContent) VALUES (?, ?)");
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
                  $stmt = $conn->prepare("UPDATE tasks SET taskContent = ? WHERE taskID = ?");
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
               // Codes:
               // 0 - Success
               // 1 - Username/password does not exist
            case 'login':
               if (!isset($_POST['username']) || !isset($_POST['password'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT fullPomoScore, partialPomoScore FROM users WHERE userName = ? AND password = ?");
                  $password = hash('sha256', $_POST['password']);
                  $stmt->bind_param("ss", $_POST['username'], $password);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $response['success'] = true;
                        $response['code'] = 0;
                        $response['partialPomoScore'] = $row['partialPomoScore'];
                        $response['fullPomoScore'] = $row['fullPomoScore'];
                        http_response_code(200);
                     } else {
                        $response['success'] = false;
                        $response['code'] = 1;
                        http_response_code(200);
                     }
                  } else {
                     http_response_code(500);
                     $response['success'] = false;
                  }
                  $stmt->close();
                  $conn->close();
                  echo json_encode($response);
               }
               break;
               // Register a user
               // Codes:
               // 0 - Success
               // 1 - Username already exists
               // 2 - Passwords do not match
            case 'register':
               if (!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['confirmPassword'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $username = $_POST['username'];
                  $stmt = $conn->prepare("SELECT userName FROM users WHERE userName = ?");
                  $stmt->bind_param("s", $username);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $response['success'] = false;
                        $response['code'] = 1;
                        $response['message'] = 'Username already exists';
                        http_response_code(200);
                     } else {
                        if ($_POST['password'] === $_POST['confirmPassword']) {
                           $stmt = $conn->prepare("INSERT INTO users (userName, Password) VALUES (?, ?)");
                           $password = hash('sha256', $_POST['password']);
                           $stmt->bind_param("ss", $username, $password);
                           if ($stmt->execute()) {
                              $response['success'] = true;
                              $response['code'] = 0;
                              http_response_code(200);
                           } else {
                              $response['success'] = false;
                              $response['message'] = 'Failed to register user';
                              http_response_code(500);
                           }
                        } else {
                           $response['success'] = false;
                           $response['code'] = 2;
                           $response['message'] = 'Passwords do not match';
                           http_response_code(200);
                        }
                     }
                  } else {
                     $response['success'] = false;
                     http_response_code(500);
                  }
                  $stmt->close();
                  $conn->close();
                  echo json_encode($response);
               }
               break;
               // Update a user's password
               // Codes:
               // 0 - Success
               // 1 - Old password is incorrect
               // 2 - New passwords do not match
            case 'updatePassword':
               if (!isset($_POST['currentPassword']) || !isset($_POST['newPassword']) || !isset($_POST['confirmNewPassword']) || !isset($_POST['username'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT userName FROM users WHERE userName = ? AND Password = ?");
                  $oldPassword = $_POST['currentPassword'];
                  $newPassword = $_POST['newPassword'];
                  $confirmPassword = $_POST['confirmNewPassword'];
                  $username = $_POST['username'];
                  $oldPassword = hash('sha256', $oldPassword);
                  $newPassword = hash('sha256', $newPassword);
                  $confirmPassword = hash('sha256', $confirmPassword);
                  $stmt->bind_param("ss", $username, $oldPassword);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        if ($newPassword == $confirmPassword) {
                           $stmt2 = $conn->prepare("UPDATE users SET Password = ? WHERE userName = ?");
                           $stmt2->bind_param("ss", $newPassword, $username);
                           if ($stmt2->execute()) {
                              $response['success'] = true;
                              $response['code'] = 0;
                              http_response_code(200);
                           } else {
                              $response['success'] = false;
                              http_response_code(500);
                           }
                           $stmt2->close();
                        } else {
                           $response['success'] = false;
                           $response['code'] = 2;
                           http_response_code(200);
                        }
                     } else {
                        $response['success'] = false;
                        $response['code'] = 1;
                        http_response_code(200);
                     }
                  } else {
                     $response['success'] = false;
                     http_response_code(500);
                  }
                  $stmt->close();
                  $conn->close();
                  echo json_encode($response);
               }
               break;
               // Get a user's pomo score
            case 'getPomoScore':
               if (!isset($_POST['username'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT partialPomoScore, fullPomoScore FROM users WHERE userName = ?");
                  $stmt->bind_param("s", $_POST['username']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $response['success'] = true;
                        $response['partialPomoScore'] = $row['partialPomoScore'];
                        $response['fullPomoScore'] = $row['fullPomoScore'];
                     } else {
                        $response['success'] = false;
                     }
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
               // Update a user's pomo score
            case 'updatePomoScore':
               if (!isset($_POST['username']) || !isset($_POST['partialPomoScore']) || !isset($_POST['fullPomoScore'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("UPDATE users SET partialPomoScore = ?, fullPomoScore = ? WHERE userName = ?");
                  $stmt->bind_param("sss", $_POST['partialPomoScore'], $_POST['fullPomoScore'], $_POST['username']);
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
               // Get all time leaderboard
            case 'getAllTimeLeaderboard':
               $stmt = $conn->prepare("SELECT * FROM allTimeLeaderboard");
               if ($stmt->execute()) {
                  $result = $stmt->get_result();
                  $data = array();
                  if ($result->num_rows > 0) {
                     while ($row = $result->fetch_assoc()) {
                        array_push($data, $row);
                     }
                  }
                  $response['success'] = true;
                  $response['leaderboard'] = $data;
                  http_response_code(200);
               } else {
                  $response['success'] = false;
                  http_response_code(500);
               }
               $stmt->close();
               $conn->close();
               echo json_encode($response);
               break;
               // Get weekly leaderboard
            case 'getWeeklyLeaderboard':
               $stmt = $conn->prepare("SELECT * FROM weeklyLeaderboard");
               if ($stmt->execute()) {
                  $result = $stmt->get_result();
                  $data = array();
                  if ($result->num_rows > 0) {
                     while ($row = $result->fetch_assoc()) {
                        array_push($data, $row);
                     }
                  }
                  $response['success'] = true;
                  $response['leaderboard'] = $data;
                  http_response_code(200);
               } else {
                  $response['success'] = false;
                  http_response_code(500);
               }
               $stmt->close();
               $conn->close();
               echo json_encode($response);
               break;
               // No request type was provided
            default:
               http_response_code(400);
               echo json_encode(array('success' => false));
               break;
         }
      }
   }
} catch (ErrorException $e) {
   http_response_code(500);
   $response['success'] = false;
   $response['message'] = $e->getMessage();
   echo json_encode($response);
}
