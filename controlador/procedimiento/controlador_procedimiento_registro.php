<?php 
require '../../modelo/modelo_procedimiento.php';

$MP = new ModeloProcedimiento();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MP->RegistrarProcedimiento($nombre,$estatus);
echo $consulta;





 ?>