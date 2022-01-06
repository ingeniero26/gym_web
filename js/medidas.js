var   tabla_medidas;

function ListarMedidas(){
    tabla_medidas = $("#tb_medidas").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/medidas/control_listar_medidas.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"nombre_med"},
             {"data":"abreviatura"},
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

        document.getElementById("tb_medidas_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tabla_medidas.on( 'draw.dt', function () {
        var PageInfo = $('#tb_medidas').DataTable().page.info();
        tabla_medidas.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tb_medidas').on('click','.editar',function(){
        var data = tabla_medidas.row($(this).parents('tr')).data();

         if(tabla_medidas.row(this).child.isShown()){
                var data = tabla_medidas.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_medida").val(data.id);
        $("#txt_nombre_actual_editar").val(data.nombre_med);
        $("#txt_nombre_nuevo_editar").val(data.nombre_med);
        $("#txt_abreviatura_editar").val(data.abreviatura);
       
        $("#cmb_estatus_editar").val(data.estatus).trigger("change");

    })


/*desactivar y activar categoria*/ 
 $('#tb_medidas').on('click', '.activar', function() {
        var data = tabla_medidas.row($(this).parents('tr')).data();
        if (tabla_medidas.row(this).child.isShown()) {
            var data = tabla_medidas.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de activar  la medida?',
            text: "Activacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                Modificar_Estatus(data.id, 'ACTIVO');
            }
        })
    })
 // function activar usuario
    $('#tb_medidas').on('click', '.desactivar', function() {
        var data = tabla_medidas.row($(this).parents('tr')).data();
        if (tabla_medidas.row(this).child.isShown()) {
            var data = tabla_medidas.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de desactivar la medida?',
            text: "Una vez desactivado  no podra hacer otros registros",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                Modificar_Estatus(data.id, 'INACTIVO');
            }
        })
    })

    function Modificar_Estatus(id, estatus) {
        var mensaje = "";
        if (estatus == 'INACTIVO') {
            mensaje = "desactivado";
        } else {
            mensaje = "activo";
        }
        $.ajax({
            url: "../controlador/medidas/control_modificar_estatus.php",
            type: 'POST',
            data: {
                id: id,
                estatus: estatus,
            }
        }).done(function(resp) {
           alert(resp);
            if (resp > 0) {
                Swal.fire("Mensaje  de confirmaciòn", "Medida " + mensaje + " exitosamente",
                        "success")
                    .then((value) => {
                        //LimpiarRegistro();
                        tabla_medidas.ajax.reload();

                    });
            }

        })
    }









    function filterGlobal() {
        $('#tb_medidas').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


     function Registrar_Medida() {
        var nombre = $('#txt_nombre').val();
         var abreviatura = $('#txt_abreviatura').val();
       
        if(nombre.length==0 ) { 
            return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
            );
        }

          $.ajax({
        url:'../controlador/medidas/cntrlregistro_medida.php',
        type:'POST',
        data:{
            nombre:nombre,
            abreviatura:abreviatura
        }
             }).done(function(resp){
         if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medida registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedidas();
                LimpiarCampos();
                    tabla_medidas.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Medida ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Medida no insertado','warning');
        }
    })
 }

function Modificar_Medida() {
    var id =$("#txtid_medida").val();
    var nombre_actual =  $("#txt_nombre_actual_editar").val();
    var nombre_nuevo =$("#txt_nombre_nuevo_editar").val();
     var abre_editar =$("#txt_abreviatura_editar").val();
    var estatus =$("#cmb_estatus_editar").val();

    if(nombre_nuevo.length == 0) {
         return Swal.fire('Mensaje de error','LLene los campos','warning');
    }

    $.ajax({
        url:'../controlador/medidas/ctrlmodificar_medida.php',
        type:'POST',
        data:{
            id:id,
            nombre_actual:nombre_actual,
            nombre_nuevo:nombre_nuevo,
            abre_editar:abre_editar,
            estatus:estatus
        }
    }).done(function(resp){
        //alert(resp);
          if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medida editada exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedidas();
                LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Medida ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Medida no editada','warning');
        }
    })
}










 function LimpiarCampos() {
    $('#txt_nombre').val("");
 }