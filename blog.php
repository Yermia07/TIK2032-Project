<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yermia Turangan - Blog</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include 'header.php'; ?>
    <nav>
        <a href="index.html">Home</a>
        <a href="gallery.php">Gallery</a>
        <a href="blog.php" class="active">Blog</a>
        <a href="contact.html">Contact</a>
    </nav>

    <section>
        <h2>Blog</h2>
        <a href="tambah_post.html" class="button">Post blog baru!!!</a>
        <?php
        $sql = "SELECT title, content, created_at FROM blog_posts ORDER BY created_at DESC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<article>";
                echo "<h3>" . $row["title"] . "</h3>";
                echo "<p>" . $row["content"] . "</p>";
                echo "<p><small>Posted on " . $row["created_at"] . "</small></p>";
                echo "</article>";
            }
        } else {
            echo "No posts found.";
        }
        $conn->close();
        ?>
    </section>

    <?php include 'footer.php'; ?>
    <script src="script.js"></script>
</body>
</html>
