<?php 
require '../../modelo/modelo_medicamento.php';

$MD = new ModeloMedicamento();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$nombre_actual = htmlspecialchars($_POST['nombre_actual'],ENT_QUOTES,'UTF-8');
$nombre_nuevo = htmlspecialchars($_POST['nombre_nuevo'],ENT_QUOTES,'UTF-8');
$alias = htmlspecialchars($_POST['alias'],ENT_QUOTES,'UTF-8');
$stock = htmlspecialchars($_POST['stock'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MD->ModificarMedicamento($id,$nombre_actual,$nombre_nuevo,$alias, $stock ,$estatus);
echo $consulta;





 ?>