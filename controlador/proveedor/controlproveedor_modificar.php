<?php 
require '../../modelo/modelo_proveedor.php';




$MME = new ModeloProveedores();
$id_proveedor = htmlspecialchars($_POST['id_proveedor'],ENT_QUOTES,'UTF-8');
$id_tipo_doc = htmlspecialchars($_POST['id_tipo_doc'],ENT_QUOTES,'UTF-8');
$nrodocumento_actual = htmlspecialchars($_POST['nrodocumento_actual'],ENT_QUOTES,'UTF-8');
$nrodocumento_nuevo = htmlspecialchars($_POST['nrodocumento_nuevo'],ENT_QUOTES,'UTF-8');
$nombre_comercial = htmlspecialchars($_POST['nombre_comercial'],ENT_QUOTES,'UTF-8');
$nombre_contacto = htmlspecialchars($_POST['nombre_contacto'],ENT_QUOTES,'UTF-8');
$apellidos_contacto = htmlspecialchars($_POST['apellidos_contacto'],ENT_QUOTES,'UTF-8');
$direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
$celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8');

$correo = htmlspecialchars($_POST['correo'],ENT_QUOTES,'UTF-8');


$consulta =$MME->ModificarProveedor($id_proveedor,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre_comercial, $nombre_contacto, $apellidos_contacto,$direccion,$celular,$correo);
echo $consulta;





 ?>