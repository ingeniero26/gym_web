var   tablapaciente;

function ListarPaciente(){
    tablapaciente = $("#tabla_paciente").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/paciente/controlpaciente_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"paciente_nrodocumento"},
            {"data":"paciente"},
            {"data":"paciente_direccion"},
            {"data":"paciente_movil"},
            {"data":"paciente_sexo",
            render: function (data, type, row ) {
                if(data=='M'){
                    return "MASCULINO";                   
                }else{
                  return "FEMENINO";                 
                }
              }
            }, 

            {"data":"paciente_fenac"},

            {"data":"paciente_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";                   
                }else{
                  return "<span class='label label-danger'>"+data+"</span>";                 
                }
              }
            },

            {"defaultContent":
            "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"
            }
        ],

        "language":idioma_espanol,
        select: true
    });

        document.getElementById("tabla_paciente_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablapaciente.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_paciente').DataTable().page.info();
        tablapaciente.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }


     function filterGlobal() {
        $('#tabla_paciente').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
       
    }


    function Registrar_Paciente() {
     var nombre = $("#txt_nombre").val();
     var apepat = $("#txt_apepat").val();
     var apemat = $("#txt_apemat").val();
     var direccion = $("#txt_direccion").val();
     var movil = $("#txt_movil").val();
     var sexo = $("#cmb_sexo").val();
     var fenac = $("#txt_fnacimiento").val();
     var nrodocumento = $("#txt_nrodocumento").val();
    

     if(nombre.length==0 || apepat.length==0 || apemat.length==0 || direccion.length==0 ||
     movil.length==0 || fenac.length==0 || nrodocumento.length==0 ) {
         return Swal.fire('Mensaje de error', 'Digite los campos vacios', 'warning'
        );
     }

     $.ajax({
           url:'../controlador/paciente/controlpaciente_registro.php',
           type:'POST',
           data:{
           nombre:nombre,
           apepat:apepat,
           apemat:apemat,
           direccion:direccion,
           movil:movil,
           sexo:sexo,
           fenac:fenac,
           nrodocumento:nrodocumento
          
        }
   }).done(function(resp){
    if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Paciente registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarPaciente();
                     LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Paciente ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Paciente no insertado', 'warning'
        );
    }
   })

    }




// modificar datos del procedimiento
    $('#tabla_paciente').on('click','.editar',function(){
        var data = tablapaciente.row($(this).parents('tr')).data();

         if(tablapaciente.row(this).child.isShown()){
                var data = tablapaciente.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_paciente").val(data.paciente_id);
        $("#txt_nombre_editar").val(data.paciente_nombre);
        $("#txt_apepat_editar").val(data.paciente_apepat);
        $("#txt_apemat_editar").val(data.paciente_apemat);
        $("#txt_direccion_editar").val(data.paciente_direccion);
        $("#txt_movil_editar").val(data.paciente_movil);
        $("#cmb_sexo_editar").val(data.paciente_sexo).trigger("change");
        $("#txt_fnacimiento_editar").val(data.paciente_fenac);
        $("#txt_nrodocumento_actual_editar").val(data.paciente_nrodocumento);
        $("#txt_nrodocumento_nuevo_editar").val(data.paciente_nrodocumento);
       
        $("#cmb_estatus_editar").val(data.paciente_estatus).trigger("change");

    })


    function Modificar_Paciente() {
     var idpaciente = $("#txtid_paciente").val();
     var nombre = $("#txt_nombre_editar").val();
     var apepat = $("#txt_apepat_editar").val();
     var apemat = $("#txt_apemat_editar").val();
     var direccion = $("#txt_direccion_editar").val();
     var movil = $("#txt_movil_editar").val();
     var sexo =  $("#cmb_sexo_editar").val();
     var fenac = $("#txt_fnacimiento_editar").val();
     var nrodocumento_actual = $("#txt_nrodocumento_actual_editar").val();
     var nrodocumento_nuevo = $("#txt_nrodocumento_nuevo_editar").val();
     var estatus =$("#cmb_estatus_editar").val();
       if(nombre.length == 0 || apepat.length ==0 || apemat==0 ||  direccion.length ==0 || 
        movil ==0 ||  sexo.length ==0 ||   fenac.length ==0 || nrodocumento_nuevo.length==0 ||
          estatus.length ==0    ) {
             return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
     }

     $.ajax({
        url:"../controlador/paciente/controlpaciente_modificar.php",
        type:'POST',
        data:{
            idpaciente:idpaciente,
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fenac:fenac,
            nrodocumento_actual:nrodocumento_actual,
            nrodocumento_nuevo:nrodocumento_nuevo,
            estatus:estatus
        }
     }).done(function(resp){
         if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Paciente modificado exitosamente",
                    "success")
                .then((value)=>{
                    ListarPaciente();
                     LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Paciente ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Paciente no insertado','warning');
        }
     })
    }





function LimpiarCampos() {
    $("#txt_nombre").val("");
    $("#txt_apepat").val("");
    $("#txt_apemat").val("");
    $("#txt_direccion").val("");
    $("#txt_movil").val("");
   // $("#cmb_sexo").val();
    $("#txt_fnacimiento").val("");
    $("#txt_nrodocumento").val("");
    $("#txt_nombre_editar").val("");
    $("#txt_apepat_editar").val("");
    $("#txt_apemat_editar").val("");
    $("#txt_direccion_editar").val("");
    $("#txt_movil_editar").val("");
    $("#txt_fnacimiento_editar").val("");
}