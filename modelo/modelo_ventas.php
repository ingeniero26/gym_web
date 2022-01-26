<?php 

class Modelo_Ventas {
	 public function __construct()
    {
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    public function listar_ventas($finicio, $ffin)
    {
        $sql = "SELECT
	vt.IDVenta,  	vt.Fecha, 
	vt.IDDeportista, 
	CONCAT_WS(' ',	dp.nombres, 	dp.apellidos) as deportista, 
	vt.tipo_comprobante,  	vt.serie_factura, 	vt.noComprobante, 
	vt.idUsuario, 	us.usuario_nombre, 	vt.tipo_pago, 
	vt.TotalVenta, 	vt.total_dcto, 
	vt.estatus, 	vt.impuesto, 
	vt.porc_impuesto, 	vd.IDVentaDetalle, 
	vd.IDProducto, 	pd.codigo, 
	pd.descripcion, 	vd.Precio, 
	vd.Cantidad, 	vd.dcto, 
	vd.estatus AS estado
FROM
	venta_detalle AS vd
	INNER JOIN 	venta AS vt	ON 		vd.IDventa = vt.IDVenta
	INNER JOIN	deportista AS dp	ON 		vt.IDDeportista = dp.id
	INNER JOIN	usuarios AS us	ON 		vt.idUsuario = us.usuario_id
	INNER JOIN	producto AS pd	ON 		vd.IDProducto = pd.id
		WHERE vt.Fecha BETWEEN '$finicio' AND  '$ffin'";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_vu = mysqli_fetch_assoc($consulta)) {
                $arreglo["data"][] = $consulta_vu;

            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

}