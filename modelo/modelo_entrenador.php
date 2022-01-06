<?php 

class ModeloEntrenador {
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarEntrenador() {
	 		$sql = "SELECT 	en.id, 	en.IdTipoDocumento, 
	tp.descripcion, 	en.Documento, 
	en.Nombres, 	en.Apellidos, 
	en.Telefono, 	en.Direccion, 
	 	en.FechaNacimiento, 
	en.fregistro,en.estatus,
	en.usuario_id, 	us.usuario_nombre, us.usuario_email,
	us.rol_id, 	r.descripcion as rol
FROM
	entrenador AS en
	INNER JOIN	tipo_documento AS tp	ON 		en.IdTipoDocumento = tp.id
	INNER JOIN	usuarios AS us	ON 		en.usuario_id = us.usuario_id
	INNER JOIN	rol AS r	ON 		us.rol_id = r.id";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 	function listar_combo_tipo_documento() {
 			$sql = "SELECT id, descripcion from
		tipo_documento
		where estatus ='ACTIVO'";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 	}

 	function RegistrarEntrenador($id_tipo_doc,$nrodocumento,$nombre,$apellidos,$telefono,$direccion,$fnac,$usu,$contra,$rol,$email) {
 		$sql = "call  SP_REGISTRAR_ENTRENADOR('$id_tipo_doc','$nrodocumento','$nombre','$apellidos','$telefono','$direccion' ,'$fnac','$usu','$contra','$rol','$email')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
 	}

 	function ModificarEntrenador($identrenador,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre,$apellidos,$fijo,$direccion,$fnac) {
 		$sql = "call  SP_MODIFICAR_ENTRENADOR('$identrenador','$id_tipo_doc','$nrodocumento_actual','$nrodocumento_nuevo','$nombre','$apellidos','$fijo' ,'$direccion', '$fnac')";
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