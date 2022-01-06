<?php 
require '../../modelo/modelo_especialidad.php';

$ME = new ModeloEspecialidad();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$ME->RegistrarEspecialidad($nombre,$estatus);
echo $consulta;





 ?>