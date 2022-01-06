

var   tablahistorial;

function ListarHistorial(){
    var finicio = $("#txt_fechainicio").val();
    var ffin = $("#txt_fechafin").val();

    tablahistorial = $("#tabla_historial").DataTable({
        "ordering":false,
        "paging": false,
        "blengthChange":true,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controlador/historial/control_historial_listar.php",
            type:'POST',
            data:{
                fechainicio:finicio,
                fechafin:ffin
            }
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"fua_fregistro"},
            {"data":"paciente_nrodocumento"},
            {"data":"paciente"},
            {"defaultContent":"<button style='font-size:13px;' type='button' class='diagnostico btn btn-primary'><i class='fa fa-eye'></i></button>"},
            {"defaultContent":"<button style='font-size:13px;' type='button' class='verdetalle btn btn-default'><i class='fa fa-eye'></i></button>"},
 
           
        ],

        "language":idioma_espanol,
        select: true
    });

    
        tablahistorial.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_historial').DataTable().page.info();
        tablahistorial.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
         });
    });

}


   // modificar datos del procedimiento
    $('#tabla_historial').on('click','.editar',function(){
        var data = tablahistorial.row($(this).parents('tr')).data();

         if(tablahistorial.row(this).child.isShown()){
                var data = tablahistorial.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_idconsulta").val(data.consulta_id);
       $("#txt_paciente_consulta_editar").val(data.paciente).trigger("change");
        $("#txt_descripcion_consulta_editar").val(data.consulta_descripcion);
        $("#txt_diagnostico_consulta_editar").val(data.consulta_diagnostico);
      //  $("#cmb_estatus_editar").val(data.cita_estatus).trigger("change");

    })




/* registro historial */
    function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
        ListarHistorialConsulta();
    }


var   tablaconsultahistorial;

function ListarHistorialConsulta(){
alert('ok');
    tablaconsultahistorial = $("#tabla_consulta_historial").DataTable({
        "ordering":false,
        "paging": false,
        "blengthChange":true,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controlador/historial/control_historial_consulta_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"consulta_fregistro"},
            {"data":"paciente_nrodocumento"},
            {"data":"paciente"},
            {"data":"consulta_diagnostico"},
            {"defaultContent":"<button style='font-size:13px;' type='button' class='enviar btn btn-primary'><i class='fa fa-check-squaret'></i>Enviar</button>"},
          
 
           
        ],

        "language":idioma_espanol,
        select: true
    });

    
        tablaconsultahistorial.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_consulta_historial').DataTable().page.info();
        tablaconsultahistorial.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
         });
    });

}
