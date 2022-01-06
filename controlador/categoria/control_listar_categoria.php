<?php 
require '../../modelo/modelo_categoria.php';

$ME = new ModeloCategoria();
$consulta =$ME->ListarCategoria();
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