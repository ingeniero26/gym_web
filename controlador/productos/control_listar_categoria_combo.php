<?php 
require '../../modelo/modelo_productos.php';

$MPR = new ModeloProductos();
$consulta =$MPR->listar_combo_categoria();
echo json_encode($consulta);




 ?>