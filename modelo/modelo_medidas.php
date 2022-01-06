<?php 
class ModeloMedidas {
		private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarMedidas() {
	 		$sql = "SELECT * FROM medida";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 	function Modificar_Estatus_Unidad($id,$estatus)  {
 		$sql = "UPDATE medida SET  estatus = '$estatus' WHERE id = '$id'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
 	}

 	function RegistrarMedida($nombre,$abreviatura) {
 		$sql = "call  SP_REGISTRAR_MEDIDA('$nombre','$abreviatura')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
		}
 	}
 		function ModificarMedida($id,$nombre_actual,$nombre_nuevo,$abre_editar, $estatus) {
 		$sql = "call  SP_MODIFICAR_MEDIDA('$id','$nombre_actual','$nombre_nuevo','$abre_editar',  '$estatus')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
		}
 	}
}


 ?>