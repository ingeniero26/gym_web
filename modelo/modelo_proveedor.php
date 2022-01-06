<?php 

	class ModeloProveedores {
		private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarProveedores() {
	 		$sql = "SELECT 	pr.IDProveedor, 	pr.IDTipoDocumento, 
			td.descripcion, 	pr.Documento, 
			pr.NombreComercial, 	pr.NombreContacto, 
			pr.ApellidoContacto, 	pr.Direccion, 
			pr.Telefono, 	pr.Correo, 
			pr.fregistro, 	pr.estatus
			FROM	proveedor
			AS pr	INNER JOIN	tipo_documento AS td	ON  		pr.IDTipoDocumento = td.id";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

function RegistrarProveedor($id_tipo_doc,$nrodocumento,$nombre_comercial,$nombre_contacto, $apellidos_contacto,$direccion,$celular,$email) {
	$sql = "call  SP_REGISTRAR_PROVEEDOR('$id_tipo_doc','$nrodocumento','$nombre_comercial','$nombre_contacto','$apellidos_contacto','$direccion' ,'$celular','$email')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
		}

	function ModificarProveedor($id_proveedor,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre_comercial, $nombre_contacto, $apellidos_contacto,$direccion,$celular,$correo) {
		$sql = "call  SP_MODIFICAR_PROVEEDOR('$id_proveedor','$id_tipo_doc','$nrodocumento_actual','$nrodocumento_nuevo','$nombre_comercial','$nombre_contacto','$apellidos_contacto' ,'$direccion','$celular','$correo')";
   		if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
    }	


	function Modificar_Estatus_Proveedor($IDProveedor,$estatus) {
		$sql = "UPDATE proveedor SET  estatus = '$estatus' WHERE IDProveedor = '$IDProveedor'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
	}	




	}

 ?>