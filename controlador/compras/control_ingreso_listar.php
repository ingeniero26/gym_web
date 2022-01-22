<?php 
 include '../../modelo/modelo_compras.php';

 $MCT = new Modelo_Compras();
 $finicio = htmlspecialchars($_POST['finicio'],ENT_QUOTES,'UTF-8');
 $ffin = htmlspecialchars($_POST['ffin'],ENT_QUOTES,'UTF-8');
  
 $consulta =$MCT->listar_compras($finicio,$ffin);
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