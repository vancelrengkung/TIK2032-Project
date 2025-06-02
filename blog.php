<?php include "db.php"; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Website Saya</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navigasi -->
    <nav>
        <a href="index.html">Home</a>
        <a href="gallery.html">Gallery</a>
        <a href="blog.php">Blog</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Search Bar -->
    <div style="margin: 20px 0;">
        <input type="text" id="blog-search" placeholder="Cari artikel..." style="padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 5px;">
    </div>

    <h1>Blog</h1>
    <div class="blog-container">
        <?php
        $sql = "SELECT * FROM artikel ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);

        while ($row = mysqli_fetch_assoc($result)):
        ?>
        <article>
            <h2><?= htmlspecialchars($row['judul']) ?></h2>
            <p><?= nl2br(htmlspecialchars($row['isi'])) ?></p>

            <?php if (!empty($row['link'])): ?>
                <a href="<?= htmlspecialchars($row['link']) ?>" target="_blank" class="read-more">Baca Selengkapnya</a>
            <?php endif; ?>

            <div class="article-meta" style="margin-top: 15px; font-size: 12px; color: #777;">
                <span>Diterbitkan: <?= htmlspecialchars($row['tanggal']) ?></span>
            </div>
        </article>
        <?php endwhile; ?>
    </div>

    <!-- Theme Switcher Button -->
    <button class="theme-switcher">🌙</button>

    <script src="script.js"></script>
</body>
</html>
