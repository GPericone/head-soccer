<?php 

    session_start();
    include_once './mysql.php';

    if(isset($_SESSION['loggedIn']))
    {
        header("Location: ./inGame.php");
        exit;
    }

    if(isset($_POST['signinButton']))
    {
        if ($stmt = $mysqli->prepare('SELECT username, password FROM utenti WHERE username = ?')) 
        {
            $stmt->bind_param('s', $_POST['username']);
            $stmt->execute();
            $stmt->store_result();

            if($stmt->num_rows > 0)
            {
                $stmt->bind_result($username, $password);
                $stmt->fetch();
                if (password_verify($_POST['password'], $password))
                {
                    session_regenerate_id();
			        $_SESSION['loggedIn'] = TRUE;
			        $_SESSION['username'] = $_POST['username'];
			        header('Location: ./inGame.php');
                }
                else
                {
                    $outcome = "La password inserita non è corretta";
                    header("Location: ./formSignIn.php?outcomeMessage=".$outcome);
                    exit;            
                }
            }
            else
            {
                $outcome = 'Non esiste un utente con questo username!';
                header("Location: ./formSignIn.php?outcomeMessage=".$outcome);
                exit;            
            }
        }
    }




?>