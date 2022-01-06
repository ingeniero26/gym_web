<?php 
require '../../modelo/modelo_usuario.php';

$MU = new ModeloUsuario();

$idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
$usuario_actual = htmlspecialchars($_POST['usuario_actual'],ENT_QUOTES,'UTF-8');
$usuario_nuevo = htmlspecialchars($_POST['usuario_nuevo'],ENT_QUOTES,'UTF-8');
$email_actual = htmlspecialchars($_POST['email_actual'],ENT_QUOTES,'UTF-8');
$email_nuevo = htmlspecialchars($_POST['email_nuevo'],ENT_QUOTES,'UTF-8');
$rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');

$consulta =$MU->Modificar_Datos_Usuario($idusuario,$usuario_actual,$usuario_nuevo,  $email_actual,$email_nuevo,  $rol);
echo $consulta;





 ?>