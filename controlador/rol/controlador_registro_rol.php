<?php 
require '../../modelo/modelo_rol.php';

$MR = new ModeloRol();
$rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Registrar_Rol($rol);
echo $consulta;





 ?>