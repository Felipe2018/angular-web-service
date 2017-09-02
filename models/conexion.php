<?php
define('_HOST_NAME', 'localhost');
define('_DATABASE_NAME', 'db_name');
define('_DATABASE_USER_NAME', 'db_user_name');
define('_DATABASE_PASSWORD', 'db_user_password');
//variable conn para dejar el estado de la conexion
$conn = new MySQLi(_HOST_NAME, _DATABASE_USER_NAME, _DATABASE_PASSWORD, _DATABASE_NAME);
//devualve el código de error de la última llamada a MySQli_connect()
if($conn->connect_errno) {
	//die equivalente al exit enviando un mensaje
	die("ERROR : -> ".$conn->connect_error); 
}
?>