<?php 
require '../../modelo/modelo_productos.php';

$MU = new ModeloProductos();
$consulta =$MU->ListarProductos();
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