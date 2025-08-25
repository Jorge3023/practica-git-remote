<?php
$host = 'localhost'; // O la dirección de tu servidor de base de datos
$dbname = 'proyecto';
$user = 'root'; // Usuario por defecto de phpMyAdmin (cámbialo si es diferente)
$password = ''; // Contraseña por defecto (vacía en XAMPP/WAMP, cámbiala si es diferente)

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Conexión exitosa a la base de datos 'proyecto'."; // Puedes descomentar esto para verificar la conexión
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
?>