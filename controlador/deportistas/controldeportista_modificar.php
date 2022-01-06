<?php 
require '../../modelo/modelo_deportistas.php';




$MME = new ModeloDeportista();
$id_deportista = htmlspecialchars($_POST['id_deportista'],ENT_QUOTES,'UTF-8');
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento_actual = htmlspecialchars($_POST['nrodocumento_actual'],ENT_QUOTES,'UTF-8');
$nrodocumento_nuevo = htmlspecialchars($_POST['nrodocumento_nuevo'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apellidos = htmlspecialchars($_POST['apellidos'],ENT_QUOTES,'UTF-8');
$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8');
$fijo = htmlspecialchars($_POST['fijo'],ENT_QUOTES,'UTF-8');
$fnac = htmlspecialchars($_POST['fnac'],ENT_QUOTES,'UTF-8');


$consulta =$MME->ModificarDeportista($id_deportista,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre,$apellidos,$sexo,$direccion,$celular,$fijo,$fnac);
echo $consulta;





 ?>