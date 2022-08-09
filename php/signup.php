<?php 

    session_start();
    include_once './mysql.php';

    if(isset($_SESSION['loggedIn']))
    {
        header("Location: ./inGame.php");
        exit;
    }

    if(isset($_POST['signupButton']))
    {
        if ($stmt = $mysqli->prepare('SELECT id FROM utenti WHERE username = ? OR mail = ?')) 
        {
            $stmt->bind_param('ss', $_POST['username'], $_POST['mail']);
            $stmt->execute();
            $stmt->store_result();

            if($stmt->num_rows > 0)
            {
                // Esiste già un utente con questo username o con questa mail
                $outcome = 'Esiste un utente con questo username o con questa password!';
                header("Location: ./formSignUp.php?outcomeMessage=".$outcome);
                exit;
            }
            else
            {
                $record = $mysqli->prepare('INSERT INTO utenti(username, password, mail) VALUES (?, ?, ?)');
                $record->bind_param('sss', $_POST['username'], password_hash($_POST['password'], PASSWORD_DEFAULT), $_POST['mail']);
                $record->execute();
                $_SESSION['loggedIn'] = true;
                $_SESSION['username'] = $_POST['username'];
                header("Location: ./inGame.php");
                exit;                
            }
        }
    }




?>