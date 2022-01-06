//alert('ok');
var t_productos
function ListarProductos(){
     t_productos = $("#tabla_productos").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controlador/productos/controlador_productos_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"codigo"},
			{"data":"descripcion"},
			{"data":"descripcion_cat"},
            {"data":"nombre_med"},
            {"data":"precio"},
            {"data":"stock"},
			{"data":"foto",
            render: function (data, type, row ) {
            	 return '<img src="../'+data+'" class="img-circle" style="width:28px">';
            	}
        	},
			{"data":"fregistro"},
            {"data":"estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";                   
                }else{
                  return "<span class='label label-danger'>"+data+"</span>";                 
                }
              }
            },  
               {"data":"estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' ><i class='fa fa-trash' disabled ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";                   
                }else{
                    return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled ><i class='fa fa-trash'  ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' ><i class='fa fa-check'></i></button>";                   
                }
              }
            }, 
        ],



        "language":idioma_espanol,
        select: true
    });

     t_productos.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_productos').DataTable().page.info();
        t_productos.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );
  

    document.getElementById("tabla_productos_filter").style.display="none";

	      $('input.global_filter').on( 'keyup click', function () {
	        filterGlobal();
	    } );
	    $('input.column_filter').on( 'keyup click', function () {
	        filterColumn( $(this).parents('tr').attr('data-column') );
	    });

// modificar datos usuario
    $('#tabla_productos').on('click','.editar',function(){
    	var data = t_productos.row($(this).parents('tr')).data();
    	 if(t_productos.row(this).child.isShown()){
		        var data = t_productos.row(this).data();
		    }
    	$("#modal_editar").modal({backdrop:'static',keyboard:false})
		$('#modal_editar').modal('show');
		$('#txt_idproducto').val(data.id);
		$('#txt_codigo_actual_editar').val(data.codigo);
        $('#txt_codigo_nuevo_editar').val(data.codigo);
		$('#txt_descripcion_actual_editar').val(data.descripcion);
        $('#txt_descripcion_nuevo_editar').val(data.descripcion);
		
		$('#cmb_categoria_editar').val(data.idcategoria).trigger("change");
        $('#cmb_medida_editar').val(data.idmedida).trigger("change");

        $('#txt_Precio_editar').val(data.precio);

    })

}




// desactivar usuario
    $('#tabla_productos').on('click','.activar',function(){
        var data = t_productos.row($(this).parents('tr')).data();
         if(t_productos.row(this).child.isShown()){
                var data = t_productos.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de desactivar el productos?',
          text: "Una vez desactivado el productos  podrá hacer compras y ventas",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
             Modificar_Estatus(data.id,'ACTIVO');
          }
        })
    })


// function activar usuario
    $('#tabla_productos').on('click','.desactivar',function(){
        var data = t_productos.row($(this).parents('tr')).data();
         if(t_productos.row(this).child.isShown()){
                var data = t_productos.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de activar el producto?',
          text: "Una vez desactivado el producto no podrá hacer compras y ventas",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
             Modificar_Estatus(data.id,'INACTIVO');
          }
        })
    })





    function Modificar_Estatus(id,estatus) {
        var mensaje ="";
        if(estatus=='INACTIVO') {
            mensaje="desactivado";
        }else {
            mensaje="activo";
        }
      $.ajax({
            url:"../controlador/productos/controlador_producto_modificar_estatus.php",
             type:'POST',
             data:{
                id:id,
                estatus: estatus         
             }
        }).done(function(resp){
            //alert(resp);
            if(resp > 0) {
                    Swal.fire("Mensaje  de confirmaciòn","Producto "+mensaje+" exitosamente",
                    "success")
                .then((value)=>{
                    //LimpiarRegistro();
                    t_productos.ajax.reload();
                
                });
            }
            
        })
    }



    function filterGlobal() {
        $('#tabla_productos').DataTable().search(
            $('#global_filter').val(),
        ).draw();
    }



function AbrirModalRegistro() {
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $('#modal_registro').modal('show');
}


function listar_categoria_combo() {
    $.ajax({
        url:'../controlador/productos/control_listar_categoria_combo.php',
        type:'POST',
        }).done(function(resp){
        var data = JSON.parse(resp);
        //alert(resp);
        var cadena ="<option value=''>Seleccione...</option>";
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            } 
            $('#cmb_categoria').html(cadena);
            $('#cmb_categoria_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_categoria').html(cadena);
            $('#cmb_categoria_editar').html(cadena);
        }
    })
}

function listar_combo_medida() {
    $.ajax({
        url:'../controlador/productos/control_listar_medida_combo.php',
        type:'POST',
        }).done(function(resp){
        var data = JSON.parse(resp);
        //alert(resp);
        var cadena ="<option value=''>Seleccione...</option>";
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            } 
            $('#cmb_medida').html(cadena);
            $('#cmb_medida_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_medida').html(cadena);
            $('#cmb_medida_editar').html(cadena);
        }
    })
}



function Registrar_Producto() {


    var codigo = $('#txt_codigo').val();
    var descripcion =$('#txt_descripcion').val();
    var categoria_id = $('#cmb_categoria').val();
    var medida_id =$('#cmb_medida').val();
     var precio =$('#txt_Precio').val();
    var archivo = $('#imagen').val();
   

    if(codigo.length==0 || descripcion.length==0 || categoria_id.length==0|| 
        medida_id.length ==0 ) { 
        return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
        );
    }
    var f = new Date();
    var extension = archivo.split('.').pop();
    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+
    f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
 
    var formData = new FormData();
    var foto = $("#imagen")[0].files[0];
    formData.append('codigo',codigo);
    formData.append('descripcion',descripcion);
    formData.append('categoria_id',categoria_id);
    formData.append('medida_id',medida_id);
    formData.append('precio',precio);
    
    formData.append('foto',foto);
    formData.append('nombrearchivo',nombrearchivo);

    $.ajax({
        url:'../controlador/productos/controlador_registro_productos.php',
        type:'POST',
        data:formData,
        contentType:false,
        processData:false,
        success:function(resp) {
            if(resp != 0) {
                alert(resp);
                if(resp > 0) {
                 if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Producto registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProductos();
               LimpiarCampos();
                    t_productos.ajax.reload();
                
                });
            } else {
             LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Producto ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Producto no insertado','warning');
        }
            }
        
        }

    });
    return false;
}


function Editar_Foto_Producto() {
     var idproducto =$('#txt_idproducto').val();
    var archivo = $('#imagen_editar').val();
    var f = new Date();
    var extension = archivo.split('.').pop();
    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+
    f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
 
    var formData = new FormData();
    var foto = $("#imagen_editar")[0].files[0];
    if(archivo.length==0) { 
        return Swal.fire('Mensaje de error','Debe seleccionar un archivo', 'warning'
        );
    }
    
    formData.append('idproducto',idproducto);
    formData.append('foto',foto);
    formData.append('nombrearchivo',nombrearchivo);

    $.ajax({
        url:'../controlador/productos/controlador_producto_editar_foto.php',
        type:'POST',
        data:formData,
        contentType:false,
        processData:false,
        success:function(resp){
            alert(resp);
            if(resp!=0){
               if(resp==1){
                t_productos.ajax.reload();
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Foto Actualizada exitosamente","success");  
                 } 
            }
        
        }

    });
    return false;
}


 function Modificar_Producto() {
    var id_producto = $('#txt_idproducto').val();
    var codigo_actual = $('#txt_codigo_actual_editar').val();
    var codigo_nuevo = $('#txt_codigo_nuevo_editar').val();
    var descripcion_actual = $('#txt_descripcion_actual_editar').val();
    var descripcion_nuevo = $('#txt_descripcion_nuevo_editar').val();   
    var idcategoria =$('#cmb_categoria_editar').val();
    var idunidad =$('#cmb_medida_editar').val();
   
    var precio_venta =$('#txt_Precio_editar').val();
  
  
    if(codigo_nuevo.length==0
     || descripcion_nuevo.length==0 
     || idcategoria.length ==0 
     ||  idunidad.length==0 
     || precio_venta.length ==0) { 
      return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
      );
    }

$.ajax({
      url:'../controlador/productos/controlador_modificar_producto.php',
      type:'POST',
      data:{
        id_producto:id_producto,
        codigo_actual:codigo_actual,
        codigo_nuevo:codigo_nuevo,
         descripcion_actual:descripcion_actual,
        descripcion_nuevo:descripcion_nuevo,
        idcategoria:idcategoria,
        idunidad:idunidad,
        precio_venta:precio_venta
        
      }
    }).done(function(resp){
 //alert(resp);
      if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Producto editado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProductos();
               // LimpiarCampos();
                    t_productos.ajax.reload();
                
                });
            } else {
               // LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Producto ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Producto no modificado','warning');
        }
    })
 


}
