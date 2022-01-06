<?php 

class ModeloMedicamento{
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}



	function ListarMedicamento() {
		$sql = "call SP_LISTAR_MEDICAMENTO()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
		}
	}


	function RegistrarMedicamento($nombre, $alias,$stock, $estatus) {
		$sql = "call  SP_REGISTRAR_MEDICAMENTO('$nombre','$alias','$stock','$estatus')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
	}

	 function ModificarMedicamento($id,$nombre_actual,$nombre_nuevo,$alias, $stock ,$estatus) {
	 	$sql = "call  SP_MODIFICAR_MEDICAMENTO('$id','$nombre_actual','$nombre_nuevo', '$alias','$stock','$estatus')";
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