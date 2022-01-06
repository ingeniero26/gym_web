<?php 
require '../../modelo/modelo_cita.php';

$MC = new ModeloCita();
$consulta =$MC->listar_especialidad_combo();
echo json_encode($consulta);




 ?>