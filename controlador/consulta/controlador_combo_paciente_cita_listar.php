<?php 
require '../../modelo/modelo_consulta.php';

$MMC = new ModeloConsulta();
$consulta =$MMC->listar_combo_Paciente();
echo json_encode($consulta);




 ?>