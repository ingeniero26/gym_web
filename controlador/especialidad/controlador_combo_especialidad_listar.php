<?php 
require '../../modelo/modelo_medico.php';

$MME = new ModeloMedico();
$consulta =$MME->listar_combo_especialidad();
echo json_encode($consulta);




 ?>