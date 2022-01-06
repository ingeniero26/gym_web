<?php 
require '../../modelo/modelo_deportistas.php';

$MD = new ModeloDeportista();
$consulta =$MD->ListarDeportistas();
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