<?php 
require '../../modelo/modelo_cita.php';

$MC = new ModeloCita();
$consulta =$MC->listar_combo_Paciente();
echo json_encode($consulta);




 ?>