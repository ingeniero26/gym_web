<?php 
require '../../modelo/modelo_especialidad.php';

$ME = new ModeloEspecialidad();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$nombre_actual = htmlspecialchars($_POST['nombre_actual'],ENT_QUOTES,'UTF-8');
$nombre_nuevo = htmlspecialchars($_POST['nombre_nuevo'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$ME->ModificarEspecialidad($id,$nombre_actual,$nombre_nuevo, $estatus);
echo $consulta;





 ?>