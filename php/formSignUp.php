<?php

    session_start();
    include_once './mysql.php';
    if(isset($_SESSION['loggedIn']))
    {
        header("Location: ./inGame.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>Registrazione</title>
        <link rel="stylesheet" type="text/css" href="../css/form.css">
        <!-- <script type="text/javscript" src="../JS/formValidation.js"></script> -->
    </head>
    <body>
        <header>
            <a href="../index.php">
                <div id="siteName">
                    <img id="logo" src="../css/img/logo.png" alt="Logo del sito"></img>
                    <h1 id="siteTitle">HeadSoccer</h1>
                </div>
            </a>
            
            <nav>
                <ul>
                    <li><a href="#">Manuale del sito</a></li>
                    <li><a href="./formSignIn.php">Login</a></li>
                    <li><a href="./formSignUp.php">Registrati</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="mainSection">
            <h2>Registrati</h2>
                <div id="signupOutcome">
                <?php

                        if(isset($_GET['outcomeMessage']))
                        {
                            echo '<p>'.$_GET['outcomeMessage'].'</p>';
                        }

                ?>
                </div>
                <form name="formRegistrazione" action="./signup.php" method="POST">
                    <label id="mailLabel">E-Mail</label>
                    <input type="mail" name="mail" placeholder="E-Mail" pattern="[\w\.-]+@[\w\.-]+\.\w{2,}" 
                    title="Inserisci un indirizzo mail valido" required>

                    <label id="usernameLabel">Username</label>
                    <input type="text" name="username" placeholder="Username" pattern=".{3,25}" 
                    title="L'username deve essere lungo tra i 3 e i 25 caratteri" required>

                    <label id="passwordLabel">Password</label>
                    <input type="password" name="password" placeholder="Password" pattern=".{8,}" 
                    title="La password deve essere di almeno 8 caratteri" required>

                    <!-- <label id="confirmPasswordLabel">Conferma la password</label>
                    <input type="password" name="confirmPassword" placeholder="Password" required>
                    -->

                    <button type="submit" name="signupButton">Registrati</button>
                </form>
            </section>
        </main>
        <footer>
        </footer>
    </body>
</html>

