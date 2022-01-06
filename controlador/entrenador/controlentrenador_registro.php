<?php 
require '../../modelo/modelo_entrenador.php';


$MME = new ModeloEntrenador();
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento = htmlspecialchars($_POST['nrodocumento'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apellidos = htmlspecialchars($_POST['apellidos'],ENT_QUOTES,'UTF-8');
$telefono = htmlspecialchars($_POST['fijo'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');

$fnac = htmlspecialchars($_POST['fnac'],ENT_QUOTES,'UTF-8');
$usu = htmlspecialchars($_POST['usu'],ENT_QUOTES,'UTF-8');
$contra =  password_hash($_POST['contra'], PASSWORD_DEFAULT,['cost'=>10]);
$rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');
$email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');

$consulta =$MME->RegistrarEntrenador($id_tipo_doc,$nrodocumento,$nombre,$apellidos,$telefono,$direccion,$fnac,$usu,$contra,$rol,$email);
echo $consulta;





 ?>