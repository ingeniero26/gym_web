<?php 
require '../../modelo/modelo_insumo.php';

$MI = new ModeloInsumo();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$stock = htmlspecialchars($_POST['stock'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MI->RegistrarInsumo($nombre,$estatus,$stock);
echo $consulta;





 ?>