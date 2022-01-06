<?php 
require '../../modelo/modelo_medico.php';

$MME = new ModeloMedico();
$idmedico = htmlspecialchars($_POST['idmedico'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apepat = htmlspecialchars($_POST['apepat'],ENT_QUOTES,'UTF-8');
$apemat = htmlspecialchars($_POST['apemat'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$movil = htmlspecialchars($_POST['movil'],ENT_QUOTES,'UTF-8');
$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
$fnac = htmlspecialchars($_POST['fnac'],ENT_QUOTES,'UTF-8');
$nrodocumento_actual = htmlspecialchars($_POST['nrodocumento_actual'],ENT_QUOTES,'UTF-8');
$nrodocumento_nuevo = htmlspecialchars($_POST['nrodocumento_nuevo'],ENT_QUOTES,'UTF-8');
$colegiatura_actual = htmlspecialchars($_POST['colegiatura_actual'],ENT_QUOTES,'UTF-8');
$colegiatura_nuevo = htmlspecialchars($_POST['colegiatura_nuevo'],ENT_QUOTES,'UTF-8');
$especialidad = htmlspecialchars($_POST['especialidad'],ENT_QUOTES,'UTF-8');
$idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
$email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');

$consulta =$MME->EditarMedico($idmedico,$nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fnac,
	$nrodocumento_actual,$nrodocumento_nuevo,$colegiatura_actual,$colegiatura_nuevo,
	 $especialidad,$idusuario,$email);
echo $consulta;





 ?>