<?php 
require '../../modelo/modelo_categoria.php';

$MR = new ModeloCategoria();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Modificar_Estatus_Categoria($id,$estatus);
echo $consulta;





 ?>