<?php 

	class ModeloMedico{
		private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

 	function ListarMedico() {
	 		$sql = "call SP_LISTAR_MEDICO()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 		 function listar_combo_especialidad() {
			$sql = "call  SP_LISTAR_COMBO_ESPECIALIDAD()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
		}


		function RegistrarMedico($nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fnac,
			$nrodocumento,$colegiatura,$especialidad,$usu,$contra,$rol,$email) {
			$sql = "call  SP_REGISTRAR_MEDICO('$nombre','$apepat','$apemat','$direccion','$movil','$sexo' ,'$fnac','$nrodocumento','$colegiatura','$especialidad','$usu','$contra','$rol','$email')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
		}

  		 function EditarMedico($idmedico,$nombre,$apepat,$apemat,$direccion,$movil,$sexo,$fnac,
				$nrodocumento_actual,$nrodocumento_nuevo,$colegiatura_actual,$colegiatura_nuevo, $especialidad,$idusuario,$email) {
  	 		$sql = "call  SP_EDITAR_MEDICO('$idmedico','$nombre','$apepat','$apemat','$direccion','$movil','$sexo' ,'$fnac','$nrodocumento_actual','$nrodocumento_nuevo',
  	 		 '$colegiatura_actual','$colegiatura_nuevo', '$especialidad','$idusuario','$email')";
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