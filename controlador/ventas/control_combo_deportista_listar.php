<?php 
require '../../modelo/modelo_ventas.php';

$MCT = new Modelo_Ventas();
  
$consulta =$MCT->listar_combo_deportista();
echo json_encode($consulta);




 ?>