<?php 
require '../../modelo/modelo_medidas.php';

$ME = new ModeloMedidas();
$consulta =$ME->ListarMedidas();
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