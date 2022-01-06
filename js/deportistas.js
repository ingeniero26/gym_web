var   tabladeportista;

function ListarDeportistas(){
    tabladeportista = $("#tabla_deportista").DataTable({
        "ordering":false,
        "paging": false,
       
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/deportistas/control_deportista_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"descripcion"},
            {"data":"documento"},
            {"data":"nombres"},
            {"data":"apellidos"},
            {"data":"sexo",
            render: function (data, type, row ) {
                if(data=='M'){
                    return "MASCULINO";                   
                }else{
                  return "FEMENINO";                 
                }
              }
            }, 

            {"data":"direccion"},
            {"data":"telefono_fijo"},
          
            {"data":"telefono_movil"},
            {"data":"fecha_nacimiento"},
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

        document.getElementById("tabla_deportista_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tabladeportista.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_deportista').DataTable().page.info();
        tabladeportista.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }
    // modificar datos del procedimiento
    $('#tabla_deportista').on('click','.editar',function(){
        var data = tabladeportista.row($(this).parents('tr')).data();

         if(tabladeportista.row(this).child.isShown()){
                var data = tabladeportista.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_iddeportista").val(data.id);
        $("#cmb_tipoDocumento_editar").val(data.idTipoDocumento).trigger("change");
        $("#txt_numero_actual_editar").val(data.documento);
         $("#txt_numero_nuevo_editar").val(data.documento);
         $("#txt_nombre_editar").val(data.nombres);
        $("#txt_apellidos_editar").val(data.apellidos);
         $("#cmb_sexo_editar").val(data.sexo).trigger("change");
        $("#txt_direccion_editar").val(data.direccion);
        $("#txt_celular_editar").val(data.telefono_fijo);
        $("#txt_fijo_editar").val(data.telefono_movil);
       
        $("#txt_fnac_editar").val(data.fecha_nacimiento);
      



    })




// desactivar usuario
    $('#tabla_deportista').on('click','.activar',function(){
        var data = tabladeportista.row($(this).parents('tr')).data();
         if(tabladeportista.row(this).child.isShown()){
                var data = tabladeportista.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de activar el deportista?',
          text: "Una vez ctivado el deportista  podrá ingresar al sistema",
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
    $('#tabla_deportista').on('click','.desactivar',function(){
        var data = tabladeportista.row($(this).parents('tr')).data();
         if(tabladeportista.row(this).child.isShown()){
                var data = tabladeportista.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de desactivar el deportista?',
          text: "Una vez desactivado el deportista no podrá ingresar al sistema",
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
            url:"../controlador/deportistas/controlador_modificar_estatus.php",
             type:'POST',
             data:{
                id:id,
                estatus: estatus,           
             }
        }).done(function(resp){
            //alert(resp);
            if(resp > 0) {
                    Swal.fire("Mensaje  de confirmaciòn","Deportista "+mensaje+" exitosamente",
                    "success")
                .then((value)=>{
                    //LimpiarRegistro();
                    tabladeportista.ajax.reload();
                
                });
            }
            
        })
    }



     function filterGlobal() {
        $('#tabla_deportista').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
       
    }



    function listar_combo_rol() {
    $.ajax({
        url:"../controlador/usuario/controlador_combo_rol_listar.php",
         type:'POST'
    }).done(function(resp){
        //alert(resp);
        var data = JSON.parse(resp);
        //console.log(resp);
         var cadena ="<option value=''>Seleccione...</option>";
        if(data.length>0) {
            for (var i = 0; i < data.length; i++) {
                 if(data[i][0]=='2'){
                     cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
            }
            $('#cmb_rol_Deportista').html(cadena);
            $('#cmb_rol_Deportista_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_rol_Deportista').html(cadena);
            $('#cmb_rol_Deportista_editar').html(cadena);
        }
    })
}


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

 function Registrar_Deportista(){
     var id_tipo_doc = $("#cmb_tipoDocumento").val();
     var nrodocumento = $("#txt_numero").val();
     var nombre = $("#txt_nombre").val();
     var apellidos = $("#txt_apellidos").val();
     var sexo = $("#cmb_sexo").val();
     var direccion = $("#txt_direccion").val();
     var celular = $("#txt_celular").val();
    
     var fijo = $("#txt_fijo").val();
     var fnac = $("#txt_fnac").val();
     var usu = $("#txt_usu").val();
     var contra = $("#txt_contra").val();
     var rol = $("#cmb_rol_Deportista").val();
     var email = $("#txt_email").val();
     var validaremail = $("#validar_email").val();

     if(validaremail=="incorrecto") {
        return Swal.fire('Mensaje de error', 'El correo no tiene formato valido', 'warning'
        );
     }
    

     if(nrodocumento.length == 0 || nombre.length ==0  ||  apellidos.length ==0 || 
        direccion ==0 ||  celular.length ==0 ||   fnac.length ==0 || usu.length ==0 ||
         contra.length ==0 ||  rol.length ==0 || email.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/deportistas/controldeportista_registro.php',
           type:'POST',
           data:{
            id_tipo_doc:id_tipo_doc,
            nrodocumento:nrodocumento,
            nombre:nombre,
            apellidos:apellidos,
            sexo:sexo,
            direccion:direccion,
            celular:celular,
            fijo:fijo,
            fnac:fnac,
            usu:usu,
            contra:contra,
            rol:rol,
            email:email
    }
   }).done(function(resp){
        if(resp > 0) {
            alert(resp);
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Deportista registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarDeportistas();
                        LimpiarRegistro();
                    tabladeportista.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Deportista ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Deportista no insertado', 'warning'
        );
    }
   })


    }



     function Modificar_Deportista(){
        var id_deportista = $("#txt_iddeportista").val();
     var id_tipo_doc = $("#cmb_tipoDocumento_editar").val();
     var nrodocumento_actual = $("#txt_numero_actual_editar").val();
      var nrodocumento_nuevo = $("#txt_numero_nuevo_editar").val();
     var nombre = $("#txt_nombre_editar").val();
     var apellidos = $("#txt_apellidos_editar").val();
     var sexo = $("#cmb_sexo_editar").val();
     var direccion = $("#txt_direccion_editar").val();
     var celular = $("#txt_celular_editar").val();
    
     var fijo = $("#txt_fijo_editar").val();
     var fnac = $("#txt_fnac_editar").val();
   
    

     if(nrodocumento_nuevo.length == 0 || nombre.length ==0  ||  apellidos.length ==0 || 
        direccion ==0 ||  celular.length ==0 ||   fnac.length ==0  ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/deportistas/controldeportista_modificar.php',
           type:'POST',
           data:{
            id_deportista:id_deportista,
            id_tipo_doc:id_tipo_doc,
            nrodocumento_actual:nrodocumento_actual,
            nrodocumento_nuevo:nrodocumento_nuevo,
            nombre:nombre,
            apellidos:apellidos,
            sexo:sexo,
            direccion:direccion,
            celular:celular,
            fijo:fijo,
            fnac:fnac
    }
   }).done(function(resp){
        if(resp > 0) {
            console.log(resp);
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Deportista modificado exitosamente",
                    "success")
                .then((value)=>{
                    ListarDeportistas();
                        LimpiarRegistro();
                    tabladeportista.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Deportista ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Deportista no insertado', 'warning'
        );
    }
   })


    }


     function LimpiarRegistro() {
    $("#txt_nombre_editar").val("");
    $("#txt_apellidos_editar").val("");
    $("#cmb_sexo").val("");
    $("#txt_direccion_editar").val("");
    
    $("#txt_celular_editar").val("");
     $("#txt_fijo_editar").val("");
    $("#txt_numero_nuevo_editar").val("");
    $("#txt_colegiatura").val("");
    $("#cmb_especialidad").val("");
   
 }
