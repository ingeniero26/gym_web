<?php 

 require '../../modelo/modelo_usuario.php';
 $MU = new ModeloUsuario();
 $usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
 $contra =  password_hash($_POST['contra'], PASSWORD_DEFAULT,['cost'=>10]);
 $idrol = htmlspecialchars($_POST['idrol'],ENT_QUOTES,'UTF-8');
 $email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');
 $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8');
 

 if(is_array($_FILES) && count($_FILES)>0) {
    if(move_uploaded_file($_FILES['foto']['tmp_name'],"img/".$nombrearchivo)) {
        $ruta ='controlador/usuario/img/'.$nombrearchivo;
        $consulta = $MU->Registrar_Usuario($usuario,$contra,$idrol,$email,$ruta);
        echo $consulta;
    } else {
        echo 0;
    }
 }else {
    $ruta ='controlador/usuario/img/avatar.png';
        $consulta = $MU->Registrar_Usuario($usuario,$contra,$idrol,$email,$ruta);
        echo $consulta;
 }





 ?>