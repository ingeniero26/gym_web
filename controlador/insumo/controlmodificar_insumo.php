<?php 
require '../../modelo/modelo_insumo.php';

$MI = new ModeloInsumo();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$nombre_actual = htmlspecialchars($_POST['nombre_actual'],ENT_QUOTES,'UTF-8');
$nombre_nuevo = htmlspecialchars($_POST['nombre_nuevo'],ENT_QUOTES,'UTF-8');
$stock = htmlspecialchars($_POST['stock'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MI->ModificarInsumo($id,$nombre_actual,$nombre_nuevo, $stock ,$estatus);
echo $consulta;





 ?>