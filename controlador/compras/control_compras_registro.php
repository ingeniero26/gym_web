<?php 
require '../../modelo/modelo_compras.php';
                  

$MCP = new Modelo_Compras();
$fecha_compra = htmlspecialchars($_POST['fecha_compra'],ENT_QUOTES,'UTF-8');
$idproveedor = htmlspecialchars($_POST['idproveedor'],ENT_QUOTES,'UTF-8');
$tipo_comprobante = htmlspecialchars($_POST['tipo_comprobante'],ENT_QUOTES,'UTF-8');
$serie_comprobante = htmlspecialchars($_POST['serie_comprobante'],ENT_QUOTES,'UTF-8');
$num_comprobante = htmlspecialchars($_POST['num_comprobante'],ENT_QUOTES,'UTF-8');
$idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
$tipo_pago = htmlspecialchars($_POST['tipo_pago'],ENT_QUOTES,'UTF-8');
$impuesto = htmlspecialchars($_POST['impuesto'],ENT_QUOTES,'UTF-8');
$porcentaje_imp = htmlspecialchars($_POST['porcentaje_imp'],ENT_QUOTES,'UTF-8');
$total = htmlspecialchars($_POST['total'],ENT_QUOTES,'UTF-8');
$decto = htmlspecialchars($_POST['decto'],ENT_QUOTES,'UTF-8');
$estado = htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8');





$consulta =$MCP->Registrar_Compra($fecha_compra,$idproveedor, $tipo_comprobante,$serie_comprobante,  $num_comprobante , $idusuario,$tipo_pago,$impuesto ,$porcentaje_imp,$total,$decto,$estado);
echo $consulta;





 ?>