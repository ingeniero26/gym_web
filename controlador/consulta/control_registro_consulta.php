<?php 
require '../../modelo/modelo_consulta.php';

$MMC = new ModeloConsulta();
$idpaciente = htmlspecialchars($_POST['idpaciente'],ENT_QUOTES,'UTF-8');
$descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
$diagnostico = htmlspecialchars($_POST['diagnostico'],ENT_QUOTES,'UTF-8');

$consulta =$MMC->RegistrarConsulta($idpaciente,$descripcion,$diagnostico);
echo $consulta;





 ?>