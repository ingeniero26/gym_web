var   tablamedicamento;

function ListarMedicamento(){
    tablamedicamento = $("#tabla_medicamento").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/medicamento/contrlmedicamento_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"medicamento_nombre"},
            {"data":"medicamento_alias"},
			{"data":"medicamento_stock"},
            {"data":"medicamento_fregistro"},
            {"data":"medicamento_estatus",
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

        document.getElementById("tabla_medicamento_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablamedicamento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_medicamento').DataTable().page.info();
        tablamedicamento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

    function filterGlobal() {
        $('#tabla_medicamento').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


function Registrar_Medicamento() {
    var nombre =$("#txt_nombre").val();
    var alias =$("#txt_alias").val();
    var stock= $("#txt_stock").val();
    var estatus =$("#cmb_estatus").val();



    if(nombre.length==0 || alias.length==0 || stock.length ==0 ||  estatus.length == 0) {
        return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
        }

    if(stock < 0) {
     return Swal.fire('Mensaje de error', 'El stock no debe ser negativo', 'warning'
        ); 
        }

        $.ajax({
            url:'../controlador/medicamento/cntrolregistrar_medicamento.php',
            type:'POST',
            data:{
                nombre:nombre,
                alias:alias,
                stock:stock,
                estatus:estatus
            }
        }).done(function(resp){
             if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medicamento registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedicamento();
                     LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
                LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Medicamento ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Medicamento no insertado','warning');
        }
        })
}


 // modificar datos del procedimiento
    $('#tabla_medicamento').on('click','.editar',function(){
        var data = tablamedicamento.row($(this).parents('tr')).data();

         if(tablamedicamento.row(this).child.isShown()){
                var data = tablamedicamento.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txtid_medicamento").val(data.medicamento_id);
        $("#txt_nombre_actual_editar").val(data.medicamento_nombre);
        $("#txt_nombre_nuevo_editar").val(data.medicamento_nombre);
        $("#txt_alias_editar").val(data.medicamento_alias);
      //  $("#txt_nombre_nuevo_editar").val(data.insumo_nombre);
        $("#txt_stock_editar").val(data.medicamento_stock);
        $("#cmb_estatus_editar").val(data.medicamento_estatus).trigger("change");

    })


function LimpiarCampos() {
    $("#txt_nombre").val("");
    $("#txt_alias").val("");
}

function Modificar_Medicamento() {
    var id = $("#txtid_medicamento").val();
    var nombre_actual =$("#txt_nombre_actual_editar").val();
    var nombre_nuevo =$("#txt_nombre_nuevo_editar").val();
    var alias =$("#txt_alias_editar").val();
    var stock =  $("#txt_stock_editar").val();
    var estatus =$("#cmb_estatus_editar").val();


    if(nombre_nuevo.length==0 || alias.length==0 || stock.length ==0 ||  estatus.length == 0) {
        return Swal.fire('Mensaje de error', 'Digite los campos estan vacios', 'warning'
        );
        }

    if(stock < 0) {
     return Swal.fire('Mensaje de error', 'El stock no debe ser negativo','warning'  ); 
        }

        $.ajax({
            url:"../controlador/medicamento/controlmodificar_medicamento.php",
            type:'POST',
            data:{
                id:id,
                nombre_actual:nombre_actual,
                nombre_nuevo:nombre_nuevo,
                alias:alias,
                stock:stock,
                estatus:estatus
            }
        }).done(function(resp){
            if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Medicamento editdo exitosamente",
                    "success")
                .then((value)=>{
                    ListarMedicamento();
                    //LimpiarCampos();
                    table.ajax.reload();
                
                });
            } else {
               // LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Medicamento ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Medicamento no editado','warning');
        }
        })
}