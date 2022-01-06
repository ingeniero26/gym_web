var   tb_proveedor;

function ListarProveedor(){
    tb_proveedor = $("#tabla_proveedor").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/proveedor/control_proveedor_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"descripcion"},
            {"data":"Documento"},
            {"data":"NombreComercial"},
            {"data":"NombreContacto"},
            {"data":"ApellidoContacto"},
            {"data":"Direccion"},
            {"data":"Telefono"},
            {"data":"Correo"},
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

             {
                "data": "estatus",
                render: function(data, type, row) {
                    if (data == 'ACTIVO') {
                        return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' ><i class='fa fa-trash' disabled ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";
                    } else {
                        return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled ><i class='fa fa-trash'  ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' ><i class='fa fa-check'></i></button>";
                    }
                }
            },
        ],

        "language":idioma_espanol,
        select: true
    });

        document.getElementById("tabla_proveedor_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tb_proveedor.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_proveedor').DataTable().page.info();
        tb_proveedor.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }
    // modificar datos del procedimiento
    $('#tabla_proveedor').on('click','.editar',function(){
        var data = tb_proveedor.row($(this).parents('tr')).data();

         if(tb_proveedor.row(this).child.isShown()){
                var data = tb_proveedor.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_idproveedor").val(data.IDProveedor);
        $("#cmb_tipoDocumento_editar").val(data.IDTipoDocumento).trigger("change");
        $("#txt_numero_actual_editar").val(data.Documento);
         $("#txt_numero_nuevo_editar").val(data.Documento);
         $("#txt_nombre_comercial_editar").val(data.NombreComercial);
         $("#txt_nombre_contacto_editar").val(data.NombreContacto);
        $("#txt_apellidos_contacto_editar").val(data.ApellidoContacto);
        
        $("#txt_direccion_editar").val(data.Direccion);
        $("#txt_celular_editar").val(data.Telefono);
        $("#txt_email_editar").val(data.Correo);
       
       
      



    })



function listar_combo_tipo_documento() {
    $.ajax({
        url:"../controlador/deportistas/controlador_combo_tipo_documento.php",
         type:'POST'
    }).done(function(resp){
        //alert(resp);
        var data = JSON.parse(resp);
        //console.log(resp);
        var cadena ="<option value=''>Seleccione...</option>";
        if(data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $('#cmb_tipoDocumento').html(cadena);
            $('#cmb_tipoDocumento_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_tipoDocumento').html(cadena);
            $('#cmb_tipoDocumento_editar').html(cadena);
        }
    })
}


function Registrar_Proveedor() {
     var id_tipo_doc = $("#cmb_tipoDocumento").val();
     var nrodocumento = $("#txt_numero").val();
     var nombre_comercial = $("#txt_nombre_comercial").val();
     var nombre_contacto = $("#txt_nombre_contacto").val();
     var apellidos_contacto = $("#txt_apellidos_contacto").val();
    
     var direccion = $("#txt_direccion").val();
     var celular = $("#txt_celular").val();

    
     var email = $("#txt_email").val();
     var validaremail = $("#validar_email").val();

     if(validaremail=="incorrecto") {
        return Swal.fire('Mensaje de error', 'El correo no tiene formato valido', 'warning'
        );
     }
    

     if(nrodocumento.length == 0 || nombre_comercial.length ==0  ||  nombre_contacto.length ==0 || 
        direccion ==0 ||  celular.length ==0 ||   email.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/proveedor/controlproveedor_registro.php',
           type:'POST',
           data:{
            id_tipo_doc:id_tipo_doc,
            nrodocumento:nrodocumento,
            nombre_comercial:nombre_comercial,
            nombre_contacto:nombre_contacto,
            apellidos_contacto:apellidos_contacto,
            direccion:direccion,
            celular:celular,
            email:email
    }
   }).done(function(resp){
        if(resp > 0) {
            alert(resp);
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Proveedor registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProveedor();
                        LimpiarRegistro();
                    tb_proveedor.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Proveedor ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Proveedor no insertado', 'warning'
        );
    }
   })
}



// desactivar usuario
    $('#tabla_proveedor').on('click','.activar',function(){
        var data = tb_proveedor.row($(this).parents('tr')).data();
         if(tb_proveedor.row(this).child.isShown()){
                var data = tb_proveedor.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de activar el proveedor?',
          text: "Una vez ctivado el proveedor  podrá ingresar al sistema",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
             Modificar_Estatus(data.IDProveedor,'ACTIVO');
          }
        })
    })


// function activar usuario
    $('#tabla_proveedor').on('click','.desactivar',function(){
        var data = tb_proveedor.row($(this).parents('tr')).data();
         if(tb_proveedor.row(this).child.isShown()){
                var data = tb_proveedor.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de desactivar el proveedor?',
          text: "Una vez desactivado el proveedor no podrá ingresar al sistema",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
             Modificar_Estatus(data.IDProveedor,'INACTIVO');
          }
        })
    })





    function Modificar_Estatus(IDProveedor,estatus) {
        var mensaje ="";
        if(estatus=='INACTIVO') {
            mensaje="desactivado";
        }else {
            mensaje="activo";
        }
      $.ajax({
            url:"../controlador/proveedor/controlador_modificar_estatus.php",
             type:'POST',
             data:{
                IDProveedor:IDProveedor,
                estatus: estatus,           
             }
        }).done(function(resp){
            //alert(resp);
            if(resp > 0) {
                    Swal.fire("Mensaje  de confirmaciòn","Proveedor "+mensaje+" exitosamente",
                    "success")
                .then((value)=>{
                    //LimpiarRegistro();
                    tb_proveedor.ajax.reload();
                
                });
            }
            
        })
    }


function Modificar_Proveedor() {
      var id_proveedor= $("#txt_idproveedor").val();
     var id_tipo_doc = $("#cmb_tipoDocumento_editar").val();
     var nrodocumento_actual = $("#txt_numero_actual_editar").val();
      var nrodocumento_nuevo = $("#txt_numero_nuevo_editar").val();
     var nombre_comercial = $("#txt_nombre_comercial_editar").val();
     var nombre_contacto = $("#txt_nombre_contacto_editar").val();
     var apellidos_contacto = $("#txt_apellidos_contacto_editar").val();
 
     var direccion = $("#txt_direccion_editar").val();
     var celular = $("#txt_celular_editar").val();
     var correo = $("#txt_email_editar").val();
   

     if(nrodocumento_nuevo.length == 0 || nombre_comercial.length ==0  ||
       nombre_contacto.length ==0 || apellidos_contacto.length ==0 ||
        direccion ==0 ||  correo.length ==0   ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/proveedor/controlproveedor_modificar.php',
           type:'POST',
           data:{
            id_proveedor:id_proveedor,
            id_tipo_doc:id_tipo_doc,
            nrodocumento_actual:nrodocumento_actual,
            nrodocumento_nuevo:nrodocumento_nuevo,
            nombre_comercial:nombre_comercial,
            nombre_contacto:nombre_contacto,
            apellidos_contacto:apellidos_contacto,
            
            direccion:direccion,
            celular:celular,
            correo:correo
    }
   }).done(function(resp){
        if(resp > 0) {
            alert(resp);
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Proveedor modificado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProveedor();
                      //  LimpiarRegistro();
                    tb_proveedor.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Proveedor ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Proveedor no insertado', 'warning'
        );
    }
   })
}