<?php 
require '../../modelo/modelo_paciente.php';

$MP= new ModeloPaciente();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apepat = htmlspecialchars($_POST['apepat'],ENT_QUOTES,'UTF-8');
$apemat = htmlspecialchars($_POST['apemat'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$movil = htmlspecialchars($_POST['movil'],ENT_QUOTES,'UTF-8');
$sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
$fenac = htmlspecialchars($_POST['fenac'],ENT_QUOTES,'UTF-8');
$nrodocumento = htmlspecialchars($_POST['nrodocumento'],ENT_QUOTES,'UTF-8');



$consulta =$MP->RegistrarPaciente($nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fenac,
	$nrodocumento);
echo $consulta;





 ?>