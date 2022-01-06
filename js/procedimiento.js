var   tablaprocedimiento;

function ListarProcedimiento(){
    tablaprocedimiento = $("#tabla_procedimiento").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/procedimiento/controlador_procedimiento_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"procedimiento_nombre"},
			{"data":"procedimiento_fregistro"},
            {"data":"procedimiento_estatus",
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

        document.getElementById("tabla_procedimiento_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablaprocedimiento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_procedimiento').DataTable().page.info();
        tablaprocedimiento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

    function filterGlobal() {
        $('#tabla_procedimiento').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }

    function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }



// registro de usuarios

function Registrar_Procedimiento() {
    var nombre = $('#txt_nombre_proc').val();
    var estatus = $('#cmb_estatus').val();
    if(nombre.length==0 ) { 
        return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
        );
    }

    $.ajax({
        url:"../controlador/procedimiento/controlador_procedimiento_registro.php",
         type:'POST',
         data:{
            nombre:nombre,
            estatus: estatus
            
         }
    }).done(function(resp){
      // alert(resp);
        if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Procedimiento registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProcedimiento();
                   LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire( 'Mensaje de error',  'Procedimiento ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Procedimiento no insertado', 'warning'
        );
        }
    })

}

  function LimpiarCampos() {
        $("#txt_nombre_proc").val("");
        
    }


// modificar datos del procedimiento
    $('#tabla_procedimiento').on('click','.editar',function(){
        var data = tablaprocedimiento.row($(this).parents('tr')).data();

         if(tablaprocedimiento.row(this).child.isShown()){
                var data = tablaprocedimiento.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_idprocedimiento").val(data.procedimiento_id);
        $("#txt_nombre_actual_editar").val(data.procedimiento_nombre);
        $("#txt_nombre_nuevo_editar").val(data.procedimiento_nombre);
        $("#cmb_estatus_editar").val(data.procedimiento_estatus).trigger("change");

    })



function ModificarProcedimiento() {
    var id= $("#txt_idprocedimiento").val();
    var nombre_actual = $('#txt_nombre_actual_editar').val();
    var nombre_nuevo =  $("#txt_nombre_nuevo_editar").val();
    var estatus = $('#cmb_estatus_editar').val();

    if(id.length==0 ) { 
         Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
        );
    }

     if(nombre_nuevo.length==0 ) { 
         Swal.fire( 'Mensaje de error',  'Digite un nombre del procedimiento', 'warning'
        );
    }
    $.ajax({
        url:'../controlador/procedimiento/controlador_modificar_procedimiento.php',
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
                Swal.fire("Mensaje  de confirmaciòn","Procedimiento modificado exitosamente",
                    "success")
                .then((value)=>{
                    ListarProcedimiento();
                //LimpiarRegistro();
                    table.ajax.reload();
                
                });
            } else {
                return Swal.fire( 'Mensaje de error',  'Procedimiento ya existe en el sistema, utilice otro', 'warning'
        );
            }
        }else {
            return Swal.fire( 'Mensaje de error',  'Procedimiento no modificado', 'warning'
        );
        }
    })
}