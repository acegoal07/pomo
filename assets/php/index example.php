<?php
$host = '';
$username = '';
$password = '';
$database = '';
$port = '';

global $conn;
$conn = new mysqli($host, $username, $password, $database, $port);
