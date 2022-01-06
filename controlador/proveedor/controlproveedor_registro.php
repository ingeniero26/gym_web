<?php 
require '../../modelo/modelo_proveedor.php';



$MME = new ModeloProveedores();
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento = htmlspecialchars($_POST['nrodocumento'],ENT_QUOTES,'UTF-8');
$nombre_comercial = htmlspecialchars($_POST['nombre_comercial'],ENT_QUOTES,'UTF-8');
$nombre_contacto = htmlspecialchars($_POST['nombre_contacto'],ENT_QUOTES,'UTF-8');
$apellidos_contacto = htmlspecialchars($_POST['apellidos_contacto'],ENT_QUOTES,'UTF-8');

$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8');

$email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');

$consulta =$MME->RegistrarProveedor($id_tipo_doc,$nrodocumento,$nombre_comercial,$nombre_contacto, $apellidos_contacto,$direccion,$celular,$email);
echo $consulta;





 ?>