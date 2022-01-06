<?php 
require '../../modelo/modelo_especialidad.php';

$ME = new ModeloEspecialidad();
$consulta =$ME->ListarEspecialidad();
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