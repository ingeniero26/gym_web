<?php 

require '../../modelo/modelo_usuario.php';


$MU = new ModeloUsuario();
$usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
$consulta =$MU->TraerDatosUsuario($usuario);
echo json_encode($consulta);




 ?>