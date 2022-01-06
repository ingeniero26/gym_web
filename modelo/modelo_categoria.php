<?php 
class ModeloCategoria {
		private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarCategoria() {
	 		$sql = "SELECT * FROM categoria";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 	function RegistrarCategoria($nombre) {
		$sql = "call  SP_REGISTRAR_CATEGORIA('$nombre')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
		}
 		}

 	function ModificarCategoria($id,$nombre_actual,$nombre_nuevo, $estatus) {
 		$sql = "call  SP_MODIFICAR_CATEGORIA('$id','$nombre_actual','$nombre_nuevo','$estatus')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
		}
 	}

 	function Modificar_Estatus_Categoria($id,$estatus)  {
 		$sql = "UPDATE categoria SET  estatus = '$estatus' WHERE id = '$id'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
 	}
}

 ?>