<?php 
    session_start();
    include_once './php/mysql.php';
    if(isset($_SESSION['loggedIn']))
    {
        header("Location: ./php/inGame.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>Head Soccer</title>
        <link rel="stylesheet" type="text/css" href="./css/style.css">
    </head>
    <body>
        <header>
            <a href="./index.php">
            <div id="siteName">
                <img id="logo" src="./css/img/logo.png" alt="Logo del sito"></img>
                <h1 id="siteTitle">HeadSoccer</h1>
            </div>
            </a>           
            <nav>
                <ul>
                    <li><a href="#">Manuale del sito</a></li>
                    <li><a href="./php/formSignIn.php">Login</a></li>
                    <li><a href="./php/formSignUp.php">Registrati</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <article id="introduzioneGioco">
                <h3>Una sfida all'ultimo gol</h3>
                <p>Scendi in campo insieme ai personaggi di Head Soccer! Registrati subito ed inizia a giocare 1vs1 contro i tuoi amici!</p>
                <p>Salta, calcia e colpisci di testa, l'obiettivo &egrave; fare pi&ugrave; gol del tuo avversario! </p>
                <div id="wrapperVideo">
                    <video id="introVideo" width="320" height="240" preload="metadata" controls>
                        <source src="./css/video/intro.webm" type="video/webm">
                        <source src="./css/video/intro.mp4" type="video/mp4">
                        Il tuo browser non supporta il tag video.
                    </video>
                </div>
            </article>
        </main>
        <footer>
        </footer>
    </body>
</html>