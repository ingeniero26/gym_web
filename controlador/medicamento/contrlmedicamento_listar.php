<?php 
require '../../modelo/modelo_medicamento.php';

$MD = new ModeloMedicamento();
$consulta =$MD->ListarMedicamento();
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