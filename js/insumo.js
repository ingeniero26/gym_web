var   tablainsumo;

function ListarInsumo(){
    tablainsumo = $("#tabla_insumo").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/insumo/contrlinsumo_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"insumo_nombre"},
			{"data":"insumo_stock"},
            {"data":"insumo_fregistro"},
            {"data":"insumo_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";                   
                }
                 if(data=='INACTIVO'){
                    return "<span class='label label-danger'>"+data+"</span>";                   
                } 
                 if(data=='AGOTADO'){
                    return "<span class='label label-black' style='background:#000;'>"+data+"</span>";                   
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

        document.getElementById("tabla_insumo_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablainsumo.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_insumo').DataTable().page.info();
        tablainsumo.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

    function filterGlobal() {
        $('#tabla_insumo').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


 // modificar datos del procedimiento
    $('#tabla_insumo').on('click','.editar',function(){
        var data = tablainsumo.row($(this).parents('tr')).data();

         if(tablainsumo.row(this).child.isShown()){
                var data = tablainsumo.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_insumo").val(data.insumo_id);
        $("#txt_nombre_actual_editar").val(data.insumo_nombre);
        $("#txt_nombre_nuevo_editar").val(data.insumo_nombre);
        $("#txt_stock_editar").val(data.insumo_stock);
        $("#cmb_estatus_editar").val(data.insumo_estatus).trigger("change");

    })


    function Registrar_Insumo() {
        var nombre =$("#txt_nombre").val();
        var stock= $("#txt_stock").val();
        var estatus =$("#cmb_estatus").val();



        if(nombre.length==0 || stock.length ==0 || estatus.length == 0) {
            return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
        }

        if(stock < 0) {
            return Swal.fire('Mensaje de error', 'El stock no debe ser negativo', 'warning'
        ); 
        }


        $.ajax({
            url:"../controlador/insumo/controlregistro_insumo.php",
            type:'POST',
            data:{
                nombre:nombre,
                stock:stock,
                estatus:estatus
            }
        }).done(function(resp){
            if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Insumo registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarInsumo();
                LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Insumo ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Insumo no insertado','warning');
        }
        })
    }

    function Mofificar_Insumo(){
        var id =$("#txtid_insumo").val();
        var nombre_actual =$("#txt_nombre_actual_editar").val();
        var nombre_nuevo =$("#txt_nombre_nuevo_editar").val();
        var stock= $("#txt_stock_editar").val();
        var estatus =$("#cmb_estatus_editar").val();



        if(nombre_nuevo.length==0 || stock.length ==0 || estatus.length == 0) {
            return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
        }

        if(stock < 0) {
            return Swal.fire('Mensaje de error', 'El stock no debe ser negativo', 'warning'
        ); 
        }


        $.ajax({
            url:"../controlador/insumo/controlmodificar_insumo.php",
            type:'POST',
            data:{
                id:id,
                nombre_actual:nombre_actual,
                nombre_nuevo:nombre_nuevo,
                stock:stock,
                estatus:estatus
            }
        }).done(function(resp){
           if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Insumo editdo exitosamente",
                    "success")
                .then((value)=>{
                    ListarInsumo();
                    LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Insumo ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Insumo no editado','warning');
        }
        })
    }





   


    function LimpiarCampos() {
        $("#txt_nombre").val("");
        $("#txt_stock").val("");
    }