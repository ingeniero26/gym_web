 <?php

class Modelo_Compras
{
    public function __construct()
    {
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    public function listar_compras($finicio, $ffin)
    {
        $sql = " SELECT 	c.IDCompra, 	c.Fecha,c.tipo_comprobante, 	c.noFactura, c.serie_factura,   c.IDProveedor,
	pr.NombreComercial, 	c.TotalCompra, c.`total_dscto`,	c.idUsuario, 	us.usuario_nombre,
	c.TipoPago, 	c.impuesto, 	c.estatus, 	c.porc_impuesto, 	cd.IDCompraDetalle,
	cd.IDProducto, 	producto.codigo,
	cd.Precio, 	cd.Cantidad,
	cd.estatus AS estado,
	cd.dcto
	FROM
	compra AS c
	INNER JOIN 	compra_detalle AS cd	ON 		c.IDCompra = cd.IDCompra
	INNER JOIN	proveedor AS pr	ON 		c.IDProveedor = pr.IDProveedor
	INNER JOIN	usuarios AS us	ON 		c.idUsuario = us.usuario_id
	INNER JOIN	producto	ON 		cd.IDProducto = producto.id
		WHERE c.Fecha BETWEEN '$finicio' AND  '$ffin'";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_vu = mysqli_fetch_assoc($consulta)) {
                $arreglo["data"][] = $consulta_vu;

            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    public function listar_combo_proveedor()
    {
        $sql = "SELECT IDProveedor,Documento,NombreComercial
				from proveedor
				WHERE proveedor.estatus ='ACTIVO'";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_vu = mysqli_fetch_array($consulta)) {
                $arreglo[] = $consulta_vu;

            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    public function listar_combo_producto()
    {
        $sql = "SELECT id,codigo,descripcion
				 from producto
				where producto.estatus ='ACTIVO'";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_vu = mysqli_fetch_array($consulta)) {
                $arreglo[] = $consulta_vu;

            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

    public function Registrar_Compra($fecha_compra, $idproveedor, $tipo_comprobante,
     $serie_comprobante, $num_comprobante, $idusuario, $tipo_pago, $impuesto, $porcentaje, $total,
      $decto, $estado)
    {
        $sql = "call  SP_REGISTRAR_COMPRA('$fecha_compra','$idproveedor','$tipo_comprobante',
        '$serie_comprobante','$num_comprobante','$idusuario','$tipo_pago','$impuesto','$porcentaje','$total','$decto','$estado')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                return $id = trim($row[0]);
            }
            $arreglo;
            $this->conexion->cerrar();
        }
    }

  	function Registrar_Compra_Detalle($id,$array_producto,$array_cantidad,$array_precio,$array_dcto) {
		$sql = "call  SP_REGISTRAR_COMPRA_DETALLE('$id','$array_producto','$array_cantidad','$array_precio','$array_dcto')";
			if($consulta = $this->conexion->conexion->query($sql)){
					return 1;
				} else {
					return 0;
				}
				$this->conexion->cerrar();
		}

}

?>