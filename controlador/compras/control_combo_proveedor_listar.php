<?php 
require '../../modelo/modelo_compras.php';

$MCT = new Modelo_Compras();
  
$consulta =$MCT->listar_combo_proveedor();
echo json_encode($consulta);




 ?>