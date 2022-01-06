<?php 
require '../../modelo/modelo_procedimiento.php';

$MP = new ModeloProcedimiento();
$consulta =$MP->ListarProcedimiento();
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