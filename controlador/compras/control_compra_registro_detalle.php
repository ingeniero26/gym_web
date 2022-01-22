<?php 
require '../../modelo/modelo_compras.php';

$MCP = new Modelo_Compras();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$producto = htmlspecialchars($_POST['producto'],ENT_QUOTES,'UTF-8');
$cantidad = htmlspecialchars($_POST['cantidad'],ENT_QUOTES,'UTF-8');
$precio = htmlspecialchars($_POST['precio'],ENT_QUOTES,'UTF-8');
$dcto = htmlspecialchars($_POST['dcto'],ENT_QUOTES,'UTF-8');

$array_producto = explode(",", $producto);
$array_cantidad = explode(",", $cantidad);
$array_precio = explode(",", $precio);
$array_dcto = explode(",", $dcto);

for ($i=0; $i < count($array_producto); $i++) { 
 $consulta =$MCP->Registrar_Compra_Detalle($id,$array_producto[$i],$array_cantidad[$i],$array_precio[$i],$array_dcto[$i]);
}


echo $consulta;





 ?>