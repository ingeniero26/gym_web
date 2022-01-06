<?php 

class ModeloCita {
private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

 	function ListarCita() {
	 	$sql = "call SP_LISTAR_CITA()";
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
 		$sql = "call  SP_LISTAR_COMBO_PACIENTE()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 	}



   	 function listar_especialidad_combo() {
		$sql = "call  SP_LISTAR_ESPECIALIDAD_COMBO()";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
		}

		function listar_combo_doctor($idespecialidad){
			$sql = "call  SP_LISTAR_DOCTOR_COMBO('$idespecialidad')";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
		}


		function RegistrarCita($idpaciente,$iddoctor,$idespecialidad,$descripcion,$idusuario){
			$sql = "call  SP_REGISTRAR_CITA('$idpaciente','$iddoctor', 
			'$idespecialidad','$descripcion','$idusuario')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
		}


		function ModificarCita($idcita, $idpaciente,$iddoctor,$idespecialidad,$descripcion,$estatus){
			$sql = "call SP_MODIFICAR_CITA('$idcita','$idpaciente','$iddoctor','$idespecialidad',
			'$descripcion','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
		   }




}

















 ?>