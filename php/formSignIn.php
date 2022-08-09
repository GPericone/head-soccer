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
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="../css/form.css">
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
                <h2>Login</h2>
                <div id="signinOutcome">
                <?php

                        if(isset($_GET['outcomeMessage']))
                        {
                            echo '<p>'.$_GET['outcomeMessage'].'</p>';
                        }

                ?>
                </div>
                <form name="formLogin" action="./signin.php" method="POST">
                    <label id="usernameLabel">Username</label>
                    <input type="text" name="username" placeholder="Username" required>

                    <label id="passwordLabel">Password</label>
                    <input type="password" name="password" placeholder="Password" required>

                    <button type="submit" name="signinButton">Login</button>
                </form>
             </section>
        </main>
        <footer>
        </footer>
    </body>
</html>

