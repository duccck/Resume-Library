<?php
    session_start();

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $db_host = 'localhost';
    $db_user = 'root';
    $db_password = '19940209';
    $db_name = 'Titan';

    try {
        $connection = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO user(username, email, password)
            VALUES(?, ?, ?)";
        
        $query = $connection->prepare($sql);
        if($query->execute(array($username, $email, $password))) {
            $_SESSION['username'] = $username;
            setcookie('username', $username, time() + (86400 * 30), '/');

            echo 'success';
        } else {
            echo 'error';
        }
    } catch(PDOException $e) {
        die('Connection failed: ' . $e->getMessage());
    }

    $connection = null;
?>