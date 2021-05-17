<?php
    $value = $_GET['inputData'];

    $db_host = 'localhost';
    $db_user = 'root';
    $db_password = '19940209';
    $db_name = 'Titan';

    try {
        $connection = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = 'SELECT user_id
            FROM user
            WHERE username = ? OR email = ?';

        $query = $connection->prepare($sql);
        $query->execute(array($value, $value));
        $result = $query->fetch(PDO::FETCH_ASSOC);
        
        if(!$result) {
            echo 'no duplicate';
        } else {
            echo 'exist';
        }
    } catch(PDOException $e) {
        die('Connection failed: ' . $e->getMessage());
    }

    $connection = null;
?>
