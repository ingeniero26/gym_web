<?php 
require '../../modelo/modelo_cita.php';

$MC = new ModeloCita();
$consulta =$MC->ListarCita();
if($consulta) {
	echo json_encode($consulta);
} else {
	echo '{
		"sEcho":1,
		"iTotalRecords":"0",
		"iTotalDisplayRecords":"0",
		"aaData":[]
	}';
}



 ?>