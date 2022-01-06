<?php 
class ModeloProductos {
	private $conexion;


	function __construct()
	{
		require_once 'modelo_conexion.php';
		$this->conexion = new conexion();
		$this->conexion->conectar();
	}
 function ListarProductos() {
	 		$sql = "SELECT     `producto`.`id`
    , `producto`.`codigo`    , `producto`.`descripcion`
    , `producto`.`idcategoria`    , `categoria`.`descripcion_cat`
    , `producto`.`idmedida`    , `medida`.`nombre_med`
    , `producto`.`precio`    , `producto`.`stock`
    , `producto`.`foto`    , `producto`.`fregistro`
    , `producto`.`estatus`
	FROM
    `producto`
    INNER JOIN `categoria`          ON (`producto`.`idcategoria` = `categoria`.`id`)
    INNER JOIN `medida`         ON (`producto`.`idmedida` = `medida`.`id`);";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_assoc($consulta)) {
						$arreglo["data"][] =$consulta_vu;
					
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
 		}

 	function Modificar_Estatus_Producto($id,$estatus) {
 		$sql = "UPDATE producto SET `estatus` = '$estatus' 
		WHERE id = '$id'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
 	}

  function listar_combo_categoria(){
  	$sql = "SELECT  id, descripcion_cat from categoria  where estatus ='ACTIVO'
		";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
  }

  function listar_combo_medida() {
  	$sql = "select id,nombre_med from medida where estatus ='ACTIVO'
		";
			$arreglo = array();
			if($consulta = $this->conexion->conexion->query($sql)){
				while($consulta_vu = mysqli_fetch_array($consulta)) {
						$arreglo[] =$consulta_vu;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
  }

  function Registrar_Productos($codigo,$descripcion,$categoria_id,$medida_id, $precio, $ruta) {
		$sql = "call  SP_REGISTRAR_PRODUCTO('$codigo','$descripcion','$categoria_id','$medida_id','$precio' , '$ruta')";
			if($consulta = $this->conexion->conexion->query($sql)){
				if($row = mysqli_fetch_array($consulta)) {
					return	$id =trim($row[0]);
				}
				 $arreglo;
				$this->conexion->cerrar();
			}
		}


	function Editar_Foto_Producto($idproducto,$ruta) {
		$sql = "UPDATE producto SET foto ='$ruta' WHERE id ='$idproducto';";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				//$id_retornado = mysqli_insert_ind($this->conexion->conexion);
				return 1;
				
			}else{
				return 0;
			}
	}

	function Modificar_Producto($id_producto,$codigo_actual, $codigo_nuevo,$descripcion_actual,$descripcion_nuevo,$idcategoria, $idunidad,$precio_venta) {
		$sql = "call  SP_MODIFICAR_PRODUCTO('$id_producto','$codigo_actual', '$codigo_nuevo', '$descripcion_actual','$descripcion_nuevo','$idcategoria','$idunidad','$precio_venta')";
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