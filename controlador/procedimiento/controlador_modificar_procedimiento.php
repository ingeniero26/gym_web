<?php 
require '../../modelo/modelo_procedimiento.php';

$MP = new ModeloProcedimiento();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$nombre_actual = htmlspecialchars($_POST['nombre_actual'],ENT_QUOTES,'UTF-8');
$nombre_nuevo = htmlspecialchars($_POST['nombre_nuevo'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MP->ModificarProcedimiento($id,$nombre_actual, $nombre_nuevo, $estatus);
echo $consulta;





 ?>