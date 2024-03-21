<?php


$conn = new mysqli($host, $user, $pass, $db, $port);
if ($conn->connect_error) {
   die('<p>Connection failed: ' . $conn->connect_error . '</p>');
} else {
   echo '<p>Connection to MySQL server successfully established.</p>';
}

echo '<script>console.log("Connection to MySQL server successfully established.")</script>';