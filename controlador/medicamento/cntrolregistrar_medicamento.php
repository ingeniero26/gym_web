<?php 
require '../../modelo/modelo_medicamento.php';

$MD = new ModeloMedicamento();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$alias = htmlspecialchars($_POST['alias'],ENT_QUOTES,'UTF-8');
$stock = htmlspecialchars($_POST['stock'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MD->RegistrarMedicamento($nombre, $alias,$stock, $estatus);
echo $consulta;





 ?>