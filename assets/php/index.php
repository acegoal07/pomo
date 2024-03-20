<?php
  $conn = new 

   die('<p>Connection failed: ' . $conn->connect_error . '</p>');
} else {
   echo '<p>Connection to MySQL server successfully established.</p>';
}

echo '<script>console.log("Connection to MySQL server successfully established.")</script>';

?>