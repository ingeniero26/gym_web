<?php 
require '../../modelo/modelo_cita.php';

$MC = new ModeloCita();
$idpaciente = htmlspecialchars($_POST['idpaciente'],ENT_QUOTES,'UTF-8');
$iddoctor = htmlspecialchars($_POST['iddoctor'],ENT_QUOTES,'UTF-8');
$idespecialidad = htmlspecialchars($_POST['idespecialidad'],ENT_QUOTES,'UTF-8');
$descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
$idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
$consulta =$MC->RegistrarCita($idpaciente,$iddoctor,$idespecialidad,$descripcion,$idusuario);
echo $consulta;





 ?>