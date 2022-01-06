<?php 
require '../../modelo/modelo_historial.php';
$MH = new ModeloHistorial();
$fechainicio = htmlspecialchars($_POST['fechainicio'],ENT_QUOTES,'UTF-8');
$fechafin = htmlspecialchars($_POST['fechafin'],ENT_QUOTES,'UTF-8');
$consulta =$MH->ListarHistorial($fechainicio,$fechafin);
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