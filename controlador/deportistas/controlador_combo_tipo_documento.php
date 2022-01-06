<?php 
require '../../modelo/modelo_deportistas.php';

$MU = new ModeloDeportista();
$consulta =$MU->listar_combo_tipo_documento();
echo json_encode($consulta);




 ?>