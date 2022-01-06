<?php 
require '../../modelo/modelo_deportistas.php';

$MU = new ModeloDeportista();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MU->Modificar_Estatus_Deportista($id,$estatus);
echo $consulta;





 ?>