<?php 
require '../../modelo/modelo_proveedor.php';

$MU = new ModeloProveedores();
$IDProveedor = htmlspecialchars($_POST['IDProveedor'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MU->Modificar_Estatus_Proveedor($IDProveedor,$estatus);
echo $consulta;





 ?>