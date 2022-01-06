<?php 
require '../../modelo/modelo_medico.php';

$MME = new ModeloMedico();
$consulta =$MME->ListarMedico();
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