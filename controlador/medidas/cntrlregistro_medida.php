<?php 
require '../../modelo/modelo_medidas.php';

$ME = new ModeloMedidas();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$abreviatura = htmlspecialchars($_POST['abreviatura'],ENT_QUOTES,'UTF-8');
$consulta =$ME->RegistrarMedida($nombre,$abreviatura);
echo $consulta;





 ?>