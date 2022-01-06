<?php 


class ModeloInsumo{
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}



	function ListarInsumo() {
		$sql = "call SP_LISTAR_INSUMO()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
		}
	}


	 function RegistrarInsumo($nombre,$estatus,$stock) {
	 	$sql = "call  SP_REGISTRAR_INSUMO('$nombre','$stock','$estatus')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}	
	 }


  function ModificarInsumo($id,$nombre_actual,$nombre_nuevo,$stock, $estatus){
  	$sql = "call  SP_MODIFICAR_INSUMO('$id','$nombre_actual','$nombre_nuevo', '$stock','$estatus')";
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