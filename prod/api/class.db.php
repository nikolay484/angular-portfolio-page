<?php
$host = 'localhost';
$db = 'portfolio';
$user = 'root';
$pass = '490Nikolay490';
$charset = 'utf8';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
try {
    $dbh = new PDO($dsn, $user, $pass);
    
} catch (PDOException $e) {
    die('Подключение не удалось: ' . $e->getMessage());
}

?>