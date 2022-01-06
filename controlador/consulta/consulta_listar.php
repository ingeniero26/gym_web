<?php 
require '../../modelo/modelo_consulta.php';

$MMC = new ModeloConsulta();

$fechainicio = htmlspecialchars($_POST['fechainicio'],ENT_QUOTES,'UTF-8');
$fechafin = htmlspecialchars($_POST['fechafin'],ENT_QUOTES,'UTF-8');

$consulta =$MMC->ListarConsulta($fechainicio,$fechafin);
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