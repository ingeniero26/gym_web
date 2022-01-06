<?php 
require '../../modelo/modelo_usuario.php';

$MU = new ModeloUsuario();
$usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
$consulta =$MU->Modificar_Intento_Usuario($usuario);
echo $consulta;





 ?>