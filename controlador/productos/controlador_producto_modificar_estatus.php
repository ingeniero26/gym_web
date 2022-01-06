<?php 
require '../../modelo/modelo_productos.php';

$MU = new ModeloProductos();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MU->Modificar_Estatus_Producto($id,$estatus);
echo $consulta;





 ?>