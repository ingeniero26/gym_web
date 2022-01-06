<?php 
require '../../modelo/modelo_deportistas.php';





$MME = new ModeloDeportista();
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento = htmlspecialchars($_POST['nrodocumento'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apellidos = htmlspecialchars($_POST['apellidos'],ENT_QUOTES,'UTF-8');
$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8');
$fijo = htmlspecialchars($_POST['fijo'],ENT_QUOTES,'UTF-8');
$fnac = htmlspecialchars($_POST['fnac'],ENT_QUOTES,'UTF-8');
$usu = htmlspecialchars($_POST['usu'],ENT_QUOTES,'UTF-8');
$contra =  password_hash($_POST['contra'], PASSWORD_DEFAULT,['cost'=>10]);
$rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');
$email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');

$consulta =$MME->RegistrarDeportista($id_tipo_doc,$nrodocumento,$nombre,$apellidos,$sexo,$direccion,$celular,$fijo,$fnac,$usu,$contra,$rol,$email);
echo $consulta;





 ?>