<?php
include 'config.php';

$title = $_POST['title'];
$content = $_POST['content'];

$sql = "INSERT INTO blog_posts (title, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $title, $content);

if ($stmt->execute()) {
    // Redirect to blog.php after successful insertion
    header("Location: blog.php");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
