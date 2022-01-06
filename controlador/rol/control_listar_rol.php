<?php 
require '../../modelo/modelo_rol.php';

$ME = new ModeloRol();
$consulta =$ME->ListarRol();
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