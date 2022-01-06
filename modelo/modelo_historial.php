<?php 

class ModeloHistorial{

	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

 	function ListarHistorial($fechainicio,$fechafin) {
	 	$sql = "call SP_HISTORIAL_CLINICO('$fechainicio','$fechafin')";
		    $arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
				}
			return $arreglo;
			$this->conexion->cerrar();
		}
 	}


 	function ListarHistorial_Consulta() {
 		$sql = "SELECT     `consulta_medica`.`consulta_id`
    , `consulta_medica`.`consulta_descripcion`
    , `consulta_medica`.`consulta_diagnostico`    ,
    CONCAT_WS(' ', `paciente`.`paciente_nombre`    , `paciente`.`paciente_apepat`) AS paciente
    , `paciente`.`paciente_apemat`
    ,paciente.`paciente_nrodocumento`
    , `historia`.`historia_id`
    , `consulta_medica`.`consulta_fregistro`
	FROM
    `consulta_medica`
    INNER JOIN `cita`       ON (`consulta_medica`.`cita_id` = `cita`.`cita_id`)
    INNER JOIN `paciente`   ON (`cita`.`paciente_id` = `paciente`.`paciente_id`)
    INNER JOIN `historia`         ON (`historia`.`paciente_id` = `paciente`.`paciente_id`)
        WHERE  `consulta_medica`.`consulta_fregistro` = CURDATE();";
		    $arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
				}
			return $arreglo;
			$this->conexion->cerrar();
		}
 	}

}






 ?>