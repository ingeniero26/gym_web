var   tablamedico;

function ListarMedico(){
    tablamedico = $("#tabla_medico").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/medico/controladorlistar_medico.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"medico_nrodocumento"},
            {"data":"medico"},
            {"data":"medico_colegiatura"},
            {"data":"especialidad_nombre"},
            {"data":"medico_direccion"},
           
            {"data":"medico_sexo",
            render: function (data, type, row ) {
                if(data=='M'){
                    return "MASCULINO";                   
                }else{
                  return "FEMENINO";                 
                }
              }
            }, 
             {"data":"medico_movil"},

            {"defaultContent":
            "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"
            }
        ],

        "language":idioma_espanol,
        select: true
    });

        document.getElementById("tabla_medico_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablamedico.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_medico').DataTable().page.info();
        tablamedico.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tabla_medico').on('click','.editar',function(){
        var data = tablamedico.row($(this).parents('tr')).data();

         if(tablamedico.row(this).child.isShown()){
                var data = tablamedico.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_medico").val(data.medico_id);
        $("#txt_nombre_editar").val(data.medico_nombre);
        $("#txt_apepat_editar").val(data.medico_apepat);
        $("#txt_apemat_editar").val(data.medico_apemat);
        $("#txt_direccion_editar").val(data.medico_direccion);
        $("#txt_movil_editar").val(data.medico_movil);
        $("#cmb_sexo_editar").val(data.medico_sexo).trigger("change");
        $("#txt_fnacimiento_editar").val(data.medico_fenac);
        $("#txt_nrodocumento_actual_editar").val(data.medico_nrodocumento);
        $("#txt_nrodocumento_nuevo_editar").val(data.medico_nrodocumento);
        $("#txt_colegiatura_actual_editar").val(data.medico_colegiatura);
        $("#txt_colegiatura_nuevo_editar").val(data.medico_colegiatura);
        $("#cmb_especialidad_editar").val(data.especialidad_id).trigger("change");


        $("#txt_usu_editar").val(data.usu_nombre);
        $("#txtid_usuario").val(data.usu_id);
        $("#cmb_rol_editar").val(data.rol_id).trigger("change");
        $("#txt_email_editar").val(data.usu_email);

    })


    function filterGlobal() {
        $('#tabla_medico').DataTable().search(
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
           // alert(resp);
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {

                for (var i = 0; i < data.length; i++) {
                    if(data[i][0]=='3'){
                     cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                     }
                   
                }
                $('#cmb_rol').html(cadena);
                $('#cmb_rol_editar').html(cadena);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_rol').html(cadena);
                $('#cmb_rol_editar').html(cadena);
            }
         })
    }


    function listar_combo_especialidad() {
        $.ajax({
            url:"../controlador/especialidad/controlador_combo_especialidad_listar.php",
             type:'POST'
        }).done(function(resp){
         // alert(resp);
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
                $('#cmb_especialidad').html(cadena);
                $('#cmb_especialidad_editar').html(cadena);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_especialidad').html(cadena);
                $('#cmb_especialidad_editar').html(cadena);
            }
         })
    }

    function Registrar_Medico(){
     var nombre = $("#txt_nombre").val();
     var apepat = $("#txt_apepat").val();
     var apemat = $("#txt_apemat").val();
     var direccion = $("#txt_direccion").val();
     var movil = $("#txt_movil").val();
     var sexo = $("#cmb_sexo").val();
     var fnac = $("#txt_fnacimiento").val();
     var nrodocumento = $("#txt_nrodocumento").val();
     var colegiatura = $("#txt_colegiatura").val();
     var especialidad = $("#cmb_especialidad").val();
     var usu = $("#txt_usu").val();
     var contra = $("#txt_contra").val();
     var rol = $("#cmb_rol").val();
     var email = $("#txt_email").val();
     var validaremail = $("#validar_email").val();

     if(validaremail=="incorrecto") {
        return Swal.fire('Mensaje de error', 'El correo no tiene formato valido', 'warning'
        );
     }
    

     if(nombre.length == 0 || apepat.length ==0 || apemat==0 ||  direccion.length ==0 || 
        movil ==0 ||  sexo.length ==0 ||   fnac.length ==0 || nrodocumento.length==0 ||
        colegiatura.length ==0 ||   especialidad.length ==0 || usu.length ==0 ||
         contra.length ==0 ||  rol.length ==0 || email.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
    

         $.ajax({
           url:'../controlador/medico/controlmedico_registro.php',
           type:'POST',
           data:{
           nombre:nombre,
           apepat:apepat,
           apemat:apemat,
           direccion:direccion,
           movil:movil,
           sexo:sexo,
           fnac:fnac,
           nrodocumento:nrodocumento,
           colegiatura:colegiatura,
           especialidad,especialidad,
           usu:usu,
           contra:contra,
           rol:rol,
           email:email
    }
   }).done(function(resp){
        if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medico registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedico();
                        LimpiarRegistro();
                    table.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Medico ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Medico no insertado', 'warning'
        );
    }
   })


    }


    function Editar_Medico(){
     var idmedico = $("#txtid_medico").val();
     var nombre = $("#txt_nombre_editar").val();
     var apepat = $("#txt_apepat_editar").val();
     var apemat = $("#txt_apemat_editar").val();
     var direccion = $("#txt_direccion_editar").val();
     var movil = $("#txt_movil_editar").val();
     var sexo = $("#cmb_sexo_editar").val();
     var fnac = $("#txt_fnacimiento_editar").val();
     var nrodocumento_actual = $("#txt_nrodocumento_actual_editar").val();
     var nrodocumento_nuevo = $("#txt_nrodocumento_nuevo_editar").val();
     var colegiatura_actual = $("#txt_colegiatura_actual_editar").val();
     var colegiatura_nuevo = $("#txt_colegiatura_nuevo_editar").val();
     var especialidad = $("#cmb_especialidad_editar").val();
     var idusuario = $("#txtid_usuario").val();
    // var contra = $("#txt_contra_editar").val();
    // var rol = $("#cmb_rol_editar").val();
     var email = $("#txt_email_editar").val();
   

     var validaremail = $("#validar_email_editar").val();

     if(validaremail=="incorrecto") {
        return Swal.fire('Mensaje de error', 'El correo no tiene formato valido', 'warning'
        );
     }
    

     if(nombre.length == 0 || apepat.length ==0 || apemat==0 ||  direccion.length ==0 || 
        movil ==0 ||  sexo.length ==0 ||   fnac.length ==0 || nrodocumento_nuevo.length==0 ||
        colegiatura_nuevo.length ==0 ||   especialidad.length ==0 ||   email.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }      
         $.ajax({
           url:'../controlador/medico/controlmedico_editar.php',
           type:'POST',
           data:{
            idmedico:idmedico,
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fnac:fnac,
            nrodocumento_actual:nrodocumento_actual,
            nrodocumento_nuevo:nrodocumento_nuevo,
            colegiatura_actual:colegiatura_actual,
            colegiatura_nuevo:colegiatura_nuevo,
            especialidad,especialidad,
            idusuario:idusuario,
            email:email
         }
           }).done(function(resp){
            //alert(resp);
        if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medico editado exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedico();
                    LimpiarRegistro();
                    table.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'El documento y /o colegiatura ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Medico no editado', 'warning'
             );
         }
        })


    }





 function LimpiarRegistro() {
    $("#txt_nombre").val("");
    $("#txt_apepat").val("");
    $("#txt_apemat").val("");
    $("#txt_direccion").val("");
    $("#txt_movil").val("");
    $("#cmb_sexo").val("");
    $("#txt_fnacimiento").val("");
    $("#txt_nrodocumento").val("");
    $("#txt_colegiatura").val("");
    $("#cmb_especialidad").val("");
    $("#txt_usu").val("");
    $("#txt_contra").val("");
    $("#cmb_rol").val("");
    $("#txt_email").val("");
 }





