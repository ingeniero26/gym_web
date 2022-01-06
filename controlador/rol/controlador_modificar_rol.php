<?php 
require '../../modelo/modelo_rol.php';

$MR = new Modelo_Rol();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$rol_actual = htmlspecialchars($_POST['rol_actual'],ENT_QUOTES,'UTF-8');
$rol_nuevo = htmlspecialchars($_POST['rol_nuevo'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MR->Modificar_Rol($id,$rol_actual,$rol_nuevo, $estatus);
echo $consulta;





 ?>