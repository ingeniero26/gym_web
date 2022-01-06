<?php 
require '../../modelo/modelo_categoria.php';

$ME = new ModeloCategoria();
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');

$consulta =$ME->RegistrarCategoria($nombre);
echo $consulta;





 ?>