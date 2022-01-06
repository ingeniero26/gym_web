<?php 
require '../../modelo/modelo_medidas.php';

$MR = new ModeloMedidas();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Modificar_Estatus_Unidad($id,$estatus);
echo $consulta;





 ?>