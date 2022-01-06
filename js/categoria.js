var   tabla_categoria;

function ListarCategoria(){
    tabla_categoria = $("#tabla_categoria").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/categoria/control_listar_categoria.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"descripcion_cat"},
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

        document.getElementById("tabla_categoria_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tabla_categoria.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_categoria').DataTable().page.info();
        tabla_categoria.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tabla_categoria').on('click','.editar',function(){
        var data = tabla_categoria.row($(this).parents('tr')).data();

         if(tabla_categoria.row(this).child.isShown()){
                var data = tabla_categoria.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_categoria").val(data.id);
        $("#txt_nombre_actual_editar").val(data.descripcion_cat);
        $("#txt_nombre_nuevo_editar").val(data.descripcion_cat);
        //$("#txt_nombre_editar").val(data.insumo_nombre);
       
        $("#cmb_estatus_editar").val(data.estatus).trigger("change");

    })


/*desactivar y activar categoria*/ 
 $('#tabla_categoria').on('click', '.activar', function() {
        var data = tabla_categoria.row($(this).parents('tr')).data();
        if (tabla_categoria.row(this).child.isShown()) {
            var data = tabla_categoria.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de activar  la categoria?',
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
    $('#tabla_categoria').on('click', '.desactivar', function() {
        var data = tabla_categoria.row($(this).parents('tr')).data();
        if (tabla_categoria.row(this).child.isShown()) {
            var data = tabla_categoria.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de desactivar la categoria?',
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
            url: "../controlador/categoria/control_modificar_estatus.php",
            type: 'POST',
            data: {
                id: id,
                estatus: estatus,
            }
        }).done(function(resp) {
           alert(resp);
            if (resp > 0) {
                Swal.fire("Mensaje  de confirmaciòn", "Categoria " + mensaje + " exitosamente",
                        "success")
                    .then((value) => {
                        //LimpiarRegistro();
                        tabla_categoria.ajax.reload();

                    });
            }

        })
    }









    function filterGlobal() {
        $('#tabla_categoria').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


     function Registrar_Categoria() {
        var nombre = $('#txt_nombre').val();
       
        if(nombre.length==0 ) { 
            return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
            );
        }

          $.ajax({
        url:'../controlador/categoria/cntrlregistro_categoria.php',
        type:'POST',
        data:{
            nombre:nombre
        }
             }).done(function(resp){
         if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Categoria registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarCategoria();
                LimpiarCampos();
                    tabla_categoria.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Categoria ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Categoria no insertado','warning');
        }
    })
 }

function Modificar_Especialidad() {
    var id =$("#txtid_categoria").val();
    var nombre_actual =  $("#txt_nombre_actual_editar").val();
    var nombre_nuevo =$("#txt_nombre_nuevo_editar").val();
    var estatus =$("#cmb_estatus_editar").val();

    if(nombre_nuevo.length == 0) {
         return Swal.fire('Mensaje de error','LLene los campos','warning');
    }

    $.ajax({
        url:'../controlador/categoria/ctrlmodificar_categoria.php',
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
                Swal.fire("Mensaje  de confirmaciòn","Categoria editada exitosamente",
                    "success")
                .then((value)=>{
                    ListarCategoria();
                LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Categoria ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Categoria no editada','warning');
        }
    })
}










 function LimpiarCampos() {
    $('#txt_nombre').val("");
 }