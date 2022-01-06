<?php 

 require '../../modelo/modelo_productos.php';
 $MU = new ModeloProductos();
 $codigo = htmlspecialchars($_POST['codigo'],ENT_QUOTES,'UTF-8');
 $descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
 $categoria_id = htmlspecialchars($_POST['categoria_id'],ENT_QUOTES,'UTF-8');
 $medida_id = htmlspecialchars($_POST['medida_id'],ENT_QUOTES,'UTF-8');
  $precio = htmlspecialchars($_POST['precio'],ENT_QUOTES,'UTF-8');
 $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8');
 

 if(is_array($_FILES) && count($_FILES)>0) {
    if(move_uploaded_file($_FILES['foto']['tmp_name'],"img/".$nombrearchivo)) {
        $ruta ='controlador/productos/img/'.$nombrearchivo;
        $consulta = $MU->Registrar_Productos($codigo,$descripcion,$categoria_id,$medida_id, $precio, $ruta);
        echo $consulta;
    } else {
        echo 0;
    }
 }else {
    $ruta ='controlador/productos/img/1.jpg';
        $consulta = $MU->Registrar_Productos($codigo,$descripcion,$categoria_id,$medida_id, $precio, $ruta);
        echo $consulta;
 }





 ?>