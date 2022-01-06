var   tablaespecialidad;

function ListarEspecialidad(){
    tablaespecialidad = $("#tabla_especialidad").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/especialidad/controladorlistar_especialidad.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"especialidad_nombre"},
            {"data":"especialidad_fregistro"},
            {"data":"especialidad_estatus",
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

        document.getElementById("tabla_especialidad_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablaespecialidad.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_especialidad').DataTable().page.info();
        tablaespecialidad.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tabla_especialidad').on('click','.editar',function(){
        var data = tablaespecialidad.row($(this).parents('tr')).data();

         if(tablaespecialidad.row(this).child.isShown()){
                var data = tablaespecialidad.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_especialidad").val(data.especialidad_id);
        $("#txt_nombre_actual_editar").val(data.especialidad_nombre);
        $("#txt_nombre_nuevo_editar").val(data.especialidad_nombre);
        //$("#txt_nombre_editar").val(data.insumo_nombre);
       
        $("#cmb_estatus_editar").val(data.especialidad_estatus).trigger("change");

    })


    function filterGlobal() {
        $('#tabla_especialidad').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


     function Registrar_Especialidad() {
        var nombre = $('#txt_nombre').val();
        var estatus = $('#cmb_estatus').val();
        if(nombre.length==0 ) { 
            return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
            );
        }

          $.ajax({
        url:'../controlador/especialidad/cntrlregistro_especialidad.php',
        type:'POST',
        data:{
            nombre:nombre,
            estatus:estatus
        }
             }).done(function(resp){
         if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Especialidad registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarEspecialidad();
                LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Especialidad ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Especialidad no insertado','warning');
        }
    })
 }

function Modificar_Especialidad() {
    var id =$("#txtid_especialidad").val();
    var nombre_actual =  $("#txt_nombre_actual_editar").val();
    var nombre_nuevo =$("#txt_nombre_nuevo_editar").val();
    var estatus =$("#cmb_estatus_editar").val();

    if(nombre_nuevo.length == 0) {
         return Swal.fire('Mensaje de error','LLene los campos','warning');
    }

    $.ajax({
        url:'../controlador/especialidad/ctrlmodificar_especialidad.php',
        type:'POST',
        data:{
            id:id,
            nombre_actual:nombre_actual,
            nombre_nuevo:nombre_nuevo,
            estatus:estatus
        }
    }).done(function(resp){
          if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Especialidad editada exitosamente",
                    "success")
                .then((value)=>{
                    ListarEspecialidad();
                LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Especialidad ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Especialidad no editada','warning');
        }
    })
}










 function LimpiarCampos() {
    $('#txt_nombre').val("");
 }