<?php


// ive added a user called 'jeff' to database

$conn = new mysqli($host, $user, $pass, $db, $port);
if ($conn->connect_error) {
   die('<script>console.log("Connection Failed")</script>'); 
} else {
   echo '<script>console.log("Connection to MySQL server successfully established")</script>';
}

