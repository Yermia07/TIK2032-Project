<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yermia Turangan - Gallery</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include 'header.php'; ?>
    <nav>
        <a href="index.html">Home</a>
        <a href="gallery.php" class="active">Gallery</a>
        <a href="blog.php">Blog</a>
        <a href="contact.html">Contact</a>
    </nav>

     <h2 style="text-align: center">Gallery Saya</h2>

    <!-- Tombol untuk menambahkan gambar baru -->
    <div style="text-align: center; margin-bottom: 20px;">
        <a href="tambah_gambar.html" class="button">Post foto kamu!!</a>
    </div>

    <section class="gallery">
        <?php
        $sql = "SELECT image_path, description FROM gallery ORDER BY id DESC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='image'>";
                echo "<img src='" . $row["image_path"] . "' alt='Image'>";
                echo "<p>" . $row["description"] . "</p>";
                echo "</div>";
            }
        } else {
            echo "No images found.";
        }
        $conn->close();
        ?>
    </section>


    <?php include 'footer.php'; ?>
    <script src="script.js"></script>
</body>
</html>
