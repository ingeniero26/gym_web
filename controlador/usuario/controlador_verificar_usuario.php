<?php 
require '../../modelo/modelo_usuario.php';

$MU = new ModeloUsuario();

$usuario = htmlspecialchars($_POST['user'],ENT_QUOTES,'UTF-8');
$password = htmlspecialchars($_POST['pass'],ENT_QUOTES,'UTF-8');

$consulta =$MU->VerificarUsuario($usuario,$password);
$data =json_encode($consulta);

if(count($consulta)>0) {
	echo $data;
} else {
	echo 0;
}



 ?>