<?php 
require '../../modelo/modelo_usuario.php';

$MU = new ModeloUsuario();
$consulta =$MU->listar_combo_rol();
echo json_encode($consulta);




 ?>