<?php
include 'config.php';

$message = $_POST['message'];

$sql = "INSERT INTO messages (message) VALUES ('$message')";

if ($conn->query($sql) === TRUE) {
    echo "Message sent successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
