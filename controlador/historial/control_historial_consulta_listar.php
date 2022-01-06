<?php 
require '../../modelo/modelo_historial.php';
$MH = new ModeloHistorial();
$consulta =$MH->ListarHistorial_Consulta();
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