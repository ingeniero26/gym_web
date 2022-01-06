<?php 


	class ModeloPaciente {
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarPaciente() {
	 		$sql = "call SP_LISTAR_PACIENTE()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 		function RegistrarPaciente($nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fenac,
			$nrodocumento) {
 			$sql = "call  SP_REGISTRAR_PACIENTE('$nombre','$apepat','$apemat','$direccion','$movil','$sexo' ,'$fenac','$nrodocumento')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
 		}


 		function EditarPaciente($idpaciente,$nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fenac,
			$nrodocumento_actual,$nrodocumento_nuevo,$estatus) {
 			$sql = "call  SP_MODIFICAR_PACIENTE('$idpaciente','$nombre','$apepat','$apemat','$direccion','$movil','$sexo' ,'$fenac','$nrodocumento_actual','$nrodocumento_nuevo','$estatus')";
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