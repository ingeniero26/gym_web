<?php 
require '../../modelo/modelo_insumo.php';

$MI = new ModeloInsumo();
$consulta =$MI->ListarInsumo();
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