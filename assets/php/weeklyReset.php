<?php
include 'index.php';

// Only allow CLI or cron execution
if (php_sapi_name() !== 'cli') {
   exit("Forbidden\n");
}

// Reset weekly scores for all users
$sql = "UPDATE users SET oldScore = fullPomoScore";
$conn->query($sql);

$conn->close();
exit(0);
