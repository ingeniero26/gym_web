<?php 
require '../../modelo/modelo_usuario.php';

$MU = new ModeloUsuario();
$usuario_id = htmlspecialchars($_POST['usuario_id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MU->Modificar_Estatus_Usuario($usuario_id,$estatus);
echo $consulta;





 ?>