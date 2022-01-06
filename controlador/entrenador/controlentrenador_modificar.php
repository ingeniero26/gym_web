<?php 
require '../../modelo/modelo_entrenador.php';



$MME = new ModeloEntrenador();
$identrenador = htmlspecialchars($_POST['identrenador'],ENT_QUOTES,'UTF-8');
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento_actual = htmlspecialchars($_POST['nrodocumento_actual'],ENT_QUOTES,'UTF-8');
$nrodocumento_nuevo = htmlspecialchars($_POST['nrodocumento_nuevo'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apellidos = htmlspecialchars($_POST['apellidos'],ENT_QUOTES,'UTF-8');
$fijo = htmlspecialchars($_POST['fijo'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$fnac = htmlspecialchars($_POST['fnac'],ENT_QUOTES,'UTF-8');


$consulta =$MME->ModificarEntrenador($identrenador,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre,$apellidos,$fijo,$direccion,$fnac);
echo $consulta;





 ?>