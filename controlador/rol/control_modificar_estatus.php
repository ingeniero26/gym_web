<?php 
require '../../modelo/modelo_rol.php';

$MR = new ModeloRol();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Modificar_Estatus_Rol($id,$estatus);
echo $consulta;





 ?>