var   tablaentrenador;

function ListarEntrenador(){
    tablaentrenador = $("#tabla_entrenador").DataTable({
        "ordering":false,
        "paging": false,
       
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/entrenador/control_entrenador_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"descripcion"},
            {"data":"Documento"},
            {"data":"Nombres"},
            {"data":"Apellidos"},
       
            {"data":"Telefono"},
            {"data":"Direccion"},
            {"data":"usuario_email"},
               
            {"data":"FechaNacimiento"},
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

        document.getElementById("tabla_entrenador_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablaentrenador.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_entrenador').DataTable().page.info();
        tablaentrenador.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }
    // modificar datos del procedimiento
    $('#tabla_entrenador').on('click','.editar',function(){
        var data = tablaentrenador.row($(this).parents('tr')).data();

         if(tablaentrenador.row(this).child.isShown()){
                var data = tablaentrenador.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_identrenador").val(data.id);
        $("#cmb_tipoDocumento_editar").val(data.id).trigger("change");
        $("#txt_numero_actual_editar").val(data.Documento);
         $("#txt_numero_nuevo_editar").val(data.Documento);
         $("#txt_nombre_editar").val(data.Nombres);
        $("#txt_apellidos_editar").val(data.Apellidos);
         $("#txt_fijo_editar").val(data.Telefono);
        
        $("#txt_direccion_editar").val(data.Direccion);
       
       
       
        $("#txt_fnac_editar").val(data.FechaNacimiento);
      



    })




// desactivar usuario
    $('#tabla_entrenador').on('click','.activar',function(){
        var data = tablaentrenador.row($(this).parents('tr')).data();
         if(tablaentrenador.row(this).child.isShown()){
                var data = tablaentrenador.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de activar el entrenador?',
          text: "Una vez ctivado el entrenador  podrá ingresar al sistema",
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
    $('#tabla_entrenador').on('click','.desactivar',function(){
        var data = tablaentrenador.row($(this).parents('tr')).data();
         if(tablaentrenador.row(this).child.isShown()){
                var data = tablaentrenador.row(this).data();
            }
        Swal.fire({
          title: 'Está seguro de desactivar el entrenador?',
          text: "Una vez desactivado el entrenador no podrá ingresar al sistema",
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
                    tablaentrenador.ajax.reload();
                
                });
            }
            
        })
    }



     function filterGlobal() {
        $('#tabla_entrenador').DataTable().search(
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
                 if(data[i][0]=='3'){
                     cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
            }
            $('#cmb_rol_entrenador').html(cadena);
            $('#cmb_rol_Deportista_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_rol_entrenador').html(cadena);
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
            $('#cmb_tipodocumento_entrendor').html(cadena);
          $('#cmb_tipoDocumento_editar').html(cadena);
        } else {
            cadena+="<option value=''> No Hay datos</option>";
            $('#cmb_tipodocumento_entrendor').html(cadena);
           $('#cmb_tipoDocumento_editar').html(cadena);
        }
    })
}

 function Registrar_Entrenador(){
     var id_tipo_doc = $("#cmb_tipodocumento_entrendor").val();
     var nrodocumento = $("#txt_numero").val();
     var nombre = $("#txt_nombre").val();
     var apellidos = $("#txt_apellidos").val();
     var telefono = $("#txt_fijo").val();
     var direccion = $("#txt_direccion").val();

 
     var fnac = $("#txt_fnac").val();
     var usu = $("#txt_usu").val();
     var contra = $("#txt_contra").val();
     var rol = $("#cmb_rol_entrenador").val();
     var email = $("#txt_email").val();
     var validaremail = $("#validar_email").val();

     if(validaremail=="incorrecto") {
        return Swal.fire('Mensaje de error', 'El correo no tiene formato valido', 'warning'
        );
     }
    

     if(nrodocumento.length == 0 || nombre.length ==0  ||  apellidos.length ==0 || 
        direccion ==0 ||  telefono.length ==0 ||   fnac.length ==0 || usu.length ==0 ||
         contra.length ==0 ||  rol.length ==0 || email.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/entrenador/controlentrenador_registro.php',
           type:'POST',
           data:{
            id_tipo_doc:id_tipo_doc,
            nrodocumento:nrodocumento,
            nombre:nombre,
            apellidos:apellidos,
            telefono:telefono,
            direccion:direccion,
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
                    tablaentrenador.ajax.reload();
                
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



     function Modificar_Entrenador(){
        var identrenador = $("#txt_identrenador").val();
        var id_tipo_doc = $("#cmb_tipoDocumento_editar").val();
         var nrodocumento_actual = $("#txt_numero_actual_editar").val();
          var nrodocumento_nuevo = $("#txt_numero_nuevo_editar").val();
         var nombre = $("#txt_nombre_editar").val();
         var apellidos = $("#txt_apellidos_editar").val();
       var fijo = $("#txt_fijo_editar").val();
     var direccion = $("#txt_direccion_editar").val();
     
   
     var fnac = $("#txt_fnac_editar").val();
   
    

     if(nrodocumento_nuevo.length == 0 || nombre.length ==0  ||  apellidos.length ==0 || 
        direccion ==0 ||    fnac.length ==0  ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/entrenador/controlentrenador_modificar.php',
           type:'POST',
           data:{
            identrenador:identrenador,
            id_tipo_doc:id_tipo_doc,
            nrodocumento_actual:nrodocumento_actual,
            nrodocumento_nuevo:nrodocumento_nuevo,
            nombre:nombre,
            apellidos:apellidos,
            fijo:fijo, 
            direccion:direccion,
            fnac:fnac
    }
   }).done(function(resp){
        if(resp > 0) {
            alert(resp);
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Entrenador modificado exitosamente",
                    "success")
                .then((value)=>{
                    ListarEntrenador();
                        LimpiarRegistro();
                    tablaentrenador.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Entrenador ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Entrenador no insertado', 'warning'
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
