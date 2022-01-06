<?php 

class ModeloDeportista {
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}

	function ListarDeportistas() {
	 		$sql = "SELECT 	dp.id, 	dp.idTipoDocumento, 
	td.descripcion, 	dp.documento, 
	dp.nombres, 	dp.apellidos ,
	dp.sexo, 	dp.direccion, 	dp.telefono_fijo, 
	dp.telefono_movil, 	dp.fecha_nacimiento, 
	dp.usuario_id, 	usuarios.usuario_nombre, 	usuarios.usuario_email, 
	dp.fregistro, 	dp.estatus, 
	usuarios.rol_id, 	rol.descripcion as rol
FROM
	deportista AS dp
	INNER JOIN	tipo_documento AS td	ON 		dp.idTipoDocumento = td.id
	INNER JOIN	usuarios	ON 		dp.usuario_id = usuarios.usuario_id
	INNER JOIN	rol	ON 		usuarios.rol_id = rol.id";
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
 	function RegistrarDeportista($id_tipo_doc,$nrodocumento,$nombre,$apellidos,$sexo,$direccion,$celular,$fijo,$fnac,$usu,$contra,$rol,$email) {
 		$sql = "call  SP_REGISTRAR_DEPORTISTA('$id_tipo_doc','$nrodocumento','$nombre','$apellidos','$sexo','$direccion' ,'$celular','$fijo','$fnac','$usu','$contra','$rol','$email')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
 	}
 	 function ModificarDeportista($id_deportista,$id_tipo_doc,$nrodocumento_actual,
    $nrodocumento_nuevo,$nombre,$apellidos,$sexo,$direccion,$celular,$fijo,$fnac) {
  	 		$sql = "call  SP_MODIFICAR_DEPORTISTA('$id_deportista','$id_tipo_doc','$nrodocumento_actual','$nrodocumento_nuevo','$nombre','$apellidos','$sexo' ,'$direccion','$celular','$fijo', '$fnac')";
   		if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
		}

		function Modificar_Estatus_Deportista($id,$estatus) {
			$sql = "UPDATE deportista SET  estatus = '$estatus' WHERE id = '$id'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
		}
}



 ?>