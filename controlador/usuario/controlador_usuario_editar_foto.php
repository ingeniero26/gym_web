<?php 

 require '../../modelo/modelo_usuario.php';
 $MU = new ModeloUsuario();
 $idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
 $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8');
 if(is_array($_FILES) && count($_FILES)>0) {
 	if(move_uploaded_file($_FILES['foto']['tmp_name'],"img/".$nombrearchivo)) {
 		$ruta ='controlador/usuario/img/'.$nombrearchivo;
 		$consulta = $MU->Modificar_Foto($idusuario,$ruta);
 		echo $consulta;
 	} else {
 		echo 0;
 	}
 }else {
 	
 		echo 0;
 }





 ?>