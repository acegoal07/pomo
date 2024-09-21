<?php
include 'index.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type");
   header("Content-Type: application/json");
   exit(0);
}

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

/**
 * Generates a secure ID for a user
 * @param $username The users account name
 * @return string The generated secure ID
 */
function generateUserSecureID($username)
{
   $idLength = 32;
   $permittedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   $input_length = strlen($permittedChars);
   $random_string = '';
   for ($i = 0; $i < $idLength; $i++) {
      $random_character = $permittedChars[mt_rand(0, $input_length - 1)];
      $random_string .= $random_character;
   }
   return "$username-$random_string";
}

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
               ///////////////////////// getTodos //////////////////////////
            case 'getTodos':
               if (!isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ss", $_POST['username'], $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $stmt = $conn->prepare("SELECT taskID, taskContent FROM tasks WHERE username = ?");
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
                     } else {
                        $response['success'] = false;
                        http_response_code(400);
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
               ///////////////////////// createTodo //////////////////////////
            case 'createTodo':
               if (!isset($_POST['username']) || !isset($_POST['taskContent']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $username = $_POST['username'];
                  $task = $_POST['taskContent'];
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ss", $username, $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $stmt = $conn->prepare("INSERT INTO tasks (username, taskContent) VALUES (?, ?)");
                        $stmt->bind_param("ss", $username, $task);
                        if ($stmt->execute()) {
                           $response['success'] = true;
                           $response['taskID'] = $stmt->insert_id;
                           http_response_code(200);
                        } else {
                           $response['success'] = false;
                           http_response_code(500);
                        }
                     } else {
                        $response['success'] = false;
                        http_response_code(400);
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
               ///////////////////////// deleteTodo //////////////////////////
            case 'deleteTodo':
               if (!isset($_POST['taskID']) || !isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ss", $_POST['username'], $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $stmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ?");
                        $stmt->bind_param("s", $_POST['taskID']);
                        if ($stmt->execute()) {
                           $response['success'] = true;
                           http_response_code(200);
                        } else {
                           $response['success'] = false;
                           http_response_code(500);
                        }
                     } else {
                        $response['success'] = false;
                        http_response_code(400);
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
               ///////////////////////// editTodo //////////////////////////
            case 'editTodo':
               if (!isset($_POST['taskID']) || !isset($_POST['taskContent']) || !isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ss", $_POST['username'], $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
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
                     } else {
                        $response['success'] = false;
                        http_response_code(400);
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
               ///////////////////////// Login //////////////////////////
               // Codes:
               // 0 - Success
               // 1 - Username/password does not exist
            case 'login':
               if (!isset($_POST['username']) || !isset($_POST['password'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT fullPomoScore, partialPomoScore, secureID FROM users WHERE username = ? AND password = ?");
                  $password = hash('sha256', $_POST['password']);
                  $stmt->bind_param("ss", $_POST['username'], $password);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $response['success'] = true;
                        $response['code'] = 0;
                        $response['secureID'] = $row['secureID'];
                        $response['partialPomoScore'] = $row['partialPomoScore'];
                        $response['fullPomoScore'] = $row['fullPomoScore'];
                        http_response_code(200);
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
               ///////////////////////// Register //////////////////////////
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
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ?");
                  $stmt->bind_param("s", $username);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $response['success'] = false;
                        $response['code'] = 1;
                        http_response_code(200);
                     } else {
                        if ($_POST['password'] === $_POST['confirmPassword']) {
                           $stmt = $conn->prepare("INSERT INTO users (username, password, secureID) VALUES (?, ?, ?)");
                           $password = hash('sha256', $_POST['password']);
                           $secureID = generateUserSecureID($username);
                           $stmt->bind_param("sss", $username, $password, $secureID);
                           if ($stmt->execute()) {
                              $response['success'] = true;
                              $response['code'] = 0;
                              $response['secureID'] = $secureID;
                              http_response_code(200);
                           } else {
                              $response['success'] = false;
                              http_response_code(500);
                           }
                        } else {
                           $response['success'] = false;
                           $response['code'] = 2;
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
               ///////////////////////// updatePassword //////////////////////////
               // Codes:
               // 0 - Success
               // 1 - Old password is incorrect
               // 2 - New passwords do not match
               // 3 - New password is the same as the old password
            case 'updatePassword':
               if (!isset($_POST['currentPassword']) || !isset($_POST['newPassword']) || !isset($_POST['confirmNewPassword']) || !isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND password = ? AND secureID = ?");
                  $oldPassword = $_POST['currentPassword'];
                  $newPassword = $_POST['newPassword'];
                  $confirmPassword = $_POST['confirmNewPassword'];
                  $username = $_POST['username'];
                  $oldPassword = hash('sha256', $oldPassword);
                  $newPassword = hash('sha256', $newPassword);
                  $confirmPassword = hash('sha256', $confirmPassword);
                  $stmt->bind_param("sss", $username, $oldPassword, $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        if ($newPassword == $confirmPassword) {
                           if ($newPassword == $oldPassword) {
                              $response['success'] = false;
                              $response['code'] = 3;
                              http_response_code(200);
                           } else {
                              $stmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
                              $stmt->bind_param("ss", $newPassword, $username);
                              if ($stmt->execute()) {
                                 $response['success'] = true;
                                 $response['code'] = 0;
                                 http_response_code(200);
                              } else {
                                 $response['success'] = false;
                                 http_response_code(500);
                              }
                           }
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
               ///////////////////////// changeUserName //////////////////////////
               // Codes:
               // 0 - Success
               // 1 - Username already exists
               // 2 - Password is incorrect
            case 'changeUsername':
               if (!isset($_POST['newUsername']) || !isset($_POST['password']) || !isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND password = ? AND secureID = ?");
                  $password = hash('sha256', $_POST['password']);
                  $stmt->bind_param("sss", $_POST['username'], $password, $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $stmt = $conn->prepare("SELECT username FROM users WHERE username = ?");
                        $stmt->bind_param("s", $_POST['newUsername']);
                        if ($stmt->execute()) {
                           $result = $stmt->get_result();
                           if ($result->num_rows > 0) {
                              $response['success'] = false;
                              $response['code'] = 1;
                              http_response_code(200);
                           } else {
                              $stmt = $conn->prepare("UPDATE users SET username = ? WHERE username = ?");
                              $stmt->bind_param("ss", $_POST['newUsername'], $_POST['username']);
                              if ($stmt->execute()) {
                                 $response['success'] = true;
                                 $response['code'] = 0;
                                 http_response_code(200);
                              } else {
                                 $response['success'] = false;
                                 http_response_code(500);
                              }
                           }
                        } else {
                           $response['success'] = false;
                           http_response_code(500);
                        }
                     } else {
                        $response['success'] = false;
                        $response['code'] = 2;
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
               ///////////////////////// deleteAccount //////////////////////////
               // Codes:
               // 0 - Success
               // 1 - Password is incorrect
            case 'deleteAccount':
               if (!isset($_POST['password']) || !isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT username FROM users WHERE username = ? AND password = ? AND secureID = ?");
                  $password = hash('sha256', $_POST['password']);
                  $stmt->bind_param("sss", $_POST['username'], $password, $_POST['secureID']);
                  if ($stmt->execute()) {
                     $result = $stmt->get_result();
                     if ($result->num_rows > 0) {
                        $stmt = $conn->prepare("DELETE FROM users WHERE username = ?");
                        $stmt->bind_param("s", $_POST['username']);
                        if ($stmt->execute()) {
                           $response['success'] = true;
                           $response['code'] = 0;
                           http_response_code(200);
                        } else {
                           $response['success'] = false;
                           http_response_code(500);
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
               ///////////////////////// getPomoScore //////////////////////////
            case 'getPomoScore':
               if (!isset($_POST['username']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("SELECT partialPomoScore, fullPomoScore FROM users WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ss", $_POST['username'], $_POST['secureID']);
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
               ///////////////////////// updatePomoScore //////////////////////////
            case 'updatePomoScore':
               if (!isset($_POST['username']) || !isset($_POST['partialPomoScore']) || !isset($_POST['fullPomoScore']) || !isset($_POST['secureID'])) {
                  http_response_code(400);
                  echo json_encode(array('success' => false));
               } else {
                  $stmt = $conn->prepare("UPDATE users SET partialPomoScore = ?, fullPomoScore = ? WHERE username = ? AND secureID = ?");
                  $stmt->bind_param("ssss", $_POST['partialPomoScore'], $_POST['fullPomoScore'], $_POST['username'], $_POST['secureID']);
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
               ///////////////////////// getAllTimeLeaderboard //////////////////////////
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
               ///////////////////////// getWeeklyLeaderboard //////////////////////////
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
               ///////////////////////// No request //////////////////////////
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
