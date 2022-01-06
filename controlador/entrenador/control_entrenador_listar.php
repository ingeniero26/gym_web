<?php 
require '../../modelo/modelo_entrenador.php';

$MD = new ModeloEntrenador();
$consulta =$MD->ListarEntrenador();
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