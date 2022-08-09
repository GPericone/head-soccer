<?php

    session_start();
    include_once './mysql.php';
    if(!isset($_SESSION['loggedIn']))
    {
        header("Location: ../index.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>HeadSoccer</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        <script type="text/javascript" src="../JS/game.js"></script>
        <script type="text/javascript" src="../JS/pitch.js"></script>
        <script type="text/javascript" src="../JS/ball-backup.js"></script>
        <script type="text/javascript" src="../JS/player-backup.js"></script>
        <script type="text/javascript" src="../JS/constants.js"></script>
    </head>
    <body onLoad ="begin()">
        <header>
            <a href="./inGame.php">
                <div id="siteName">
                    <img id="logo" src="../css/img/logo.png" alt="Logo del sito"></img>
                    <h1 id="siteTitle">HeadSoccer</h1>
                </div>
            </a>
            
            <nav>
                <ul>
                    <li><a href="#">Manuale del sito</a></li>
                    <li><a href="./logout.php?">Logout</a></li>
                </ul>
            </nav>
        </header>
        <main id="main">       
        </main>
        <footer>
        </footer>
    </body>
</html>