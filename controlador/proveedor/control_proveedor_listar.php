<?php 
require '../../modelo/modelo_proveedor.php';

$MD = new ModeloProveedores();
$consulta =$MD->ListarProveedores();
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