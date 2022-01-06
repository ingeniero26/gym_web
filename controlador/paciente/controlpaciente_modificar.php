<?php 
require '../../modelo/modelo_paciente.php';

$MP = new ModeloPaciente();
$idpaciente = htmlspecialchars($_POST['idpaciente'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apepat = htmlspecialchars($_POST['apepat'],ENT_QUOTES,'UTF-8');
$apemat = htmlspecialchars($_POST['apemat'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$movil = htmlspecialchars($_POST['movil'],ENT_QUOTES,'UTF-8');
$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
$fenac = htmlspecialchars($_POST['fenac'],ENT_QUOTES,'UTF-8');
$nrodocumento_actual = htmlspecialchars($_POST['nrodocumento_actual'],ENT_QUOTES,'UTF-8');
$nrodocumento_nuevo = htmlspecialchars($_POST['nrodocumento_nuevo'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');


$consulta =$MP->EditarPaciente($idpaciente,$nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fenac,
	$nrodocumento_actual,$nrodocumento_nuevo,$estatus);
echo $consulta;





 ?>