<?php 
 class ModeloConsulta {
 	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}
	function ListarConsulta($fechainicio,$fechafin) {
	 	$sql = "call SP_LISTAR_CONSULTA('$fechainicio','$fechafin')";
		    $arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
				}
			return $arreglo;
			$this->conexion->cerrar();
		}
 	}

 	function listar_combo_Paciente() {
 		$sql = "call  SP_LISTAR_PACIENTE_CITA()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 	}

 	function RegistrarConsulta($idpaciente,$descripcion,$diagnostico) {
 		$sql = "call  SP_REGISTRAR_CONSULTA('$idpaciente','$descripcion', 
			'$diagnostico')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
 	    }

 }



















 ?>