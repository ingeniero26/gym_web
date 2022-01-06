<?php 
 include '../../modelo/modelo_productos.php';


 $MP = new ModeloProductos();
$id_producto = htmlspecialchars($_POST['id_producto'],ENT_QUOTES,'UTF-8');
$codigo_actual = htmlspecialchars($_POST['codigo_actual'],ENT_QUOTES,'UTF-8');
$codigo_nuevo = htmlspecialchars($_POST['codigo_nuevo'],ENT_QUOTES,'UTF-8');
$descripcion_actual = htmlspecialchars($_POST['descripcion_actual'],ENT_QUOTES,'UTF-8');
$descripcion_nuevo = htmlspecialchars($_POST['descripcion_nuevo'],ENT_QUOTES,'UTF-8');

$idcategoria = htmlspecialchars($_POST['idcategoria'],ENT_QUOTES,'UTF-8');
$idunidad = htmlspecialchars($_POST['idunidad'],ENT_QUOTES,'UTF-8');
$precio_venta = htmlspecialchars($_POST['precio_venta'],ENT_QUOTES,'UTF-8');



$consulta =$MP->Modificar_Producto($id_producto,$codigo_actual, $codigo_nuevo,$descripcion_actual,$descripcion_nuevo,$idcategoria, $idunidad,$precio_venta);
echo $consulta;





 ?>