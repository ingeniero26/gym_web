<?php 
require '../../modelo/modelo_cita.php';
$MC = new ModeloCita();
$idespecialidad = htmlspecialchars($_POST['idespecialidad'],ENT_QUOTES,'UTF-8');
$consulta =$MC->listar_combo_doctor($idespecialidad);
echo json_encode($consulta);




 ?>