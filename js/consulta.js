var   tablaconsulta;

function ListarConsulta(){
    var finicio = $("#txt_fechainicio").val();
    var ffin = $("#txt_fechafin").val();

    tablaconsulta = $("#tabla_consulta_medica").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/consulta/consulta_listar.php",
            type:'POST',
            data:{
                fechainicio:finicio,
                fechafin:ffin
            }
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"paciente_nrodocumento"},
            {"data":"paciente"},
            {"data":"consulta_fregistro"},
            {"data":"medico"},
            {"data":"especialidad_nombre"},
            {"data":"consulta_estatus",
            render: function (data, type, row ) {
                if(data=='PENDIENTE'){
                    return "<span class='label label-primary'>"+data+"</span>";                   
                } else if(data=='CANCELADA'){
                  return "<span class='label label-danger'>"+data+"</span>";                 
                } else {
                 return "<span class='label label-success'>"+data+"</span>";
                }
              }
            }, 

            {"defaultContent":
            "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button> <button style='font-size:13px;' type='button' class='imprimir btn btn-danger'><i class='fa fa-print'></i></button>"
            }
        ],

        "language":idioma_espanol,
        select: true
    });

    
        tablaconsulta.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_consulta_medica').DataTable().page.info();
        tablaconsulta.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tabla_consulta_medica').on('click','.editar',function(){
        var data = tablaconsulta.row($(this).parents('tr')).data();

         if(tablaconsulta.row(this).child.isShown()){
                var data = tablaconsulta.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
      //  $("#txt_idcita").val(data.cita_id);
      //  $("#cmb_paciente_editar").val(data.paciente_id).trigger("change");
       // $("#cmb_especialidad_editar").val(data.especialidad_id).trigger("change");
      //  listar_doctor_combo_editar(data.especialidad_id,data.medico_id);
        //$("#cmb_medico_editar").val(data.medico_id).trigger("change");
      //  $("#txt_descripcion_editar").val(data.cita_descripcion);
      //  $("#cmb_estatus_editar").val(data.cita_estatus).trigger("change");

    })

      $('#tabla_consulta').on('click','.imprimir',function(){
        var data = tablaconsulta.row($(this).parents('tr')).data();

         if(tablaconsulta.row(this).child.isShown()){
                var data = tablaconsulta.row(this).data();
            }
            window.open("../vista/libreportes/reportes/generar_ticket.php?id="
             +parseInt(data.cita_id)+"#zoom=100%","Ticket","scrollbars=NO");
    })


 
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


    function listar_combo_paciente_consulta() {
         $.ajax({
            url:"../controlador/consulta/controlador_combo_paciente_cita_listar.php",
             type:'POST'
         }).done(function(resp){
        // alert(resp);
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>Nro Atencion:"
                    +data[i][1]+"- Paciente:"+data[i][2]+"</option>";
                }
                $('#cmb_paciente_consulta').html(cadena);
              //  $('#cmb_paciente_editar').html(cadena);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_paciente_consulta').html(cadena);
            //   $('#cmb_paciente_editar').html(cadena);
            }
         })
    } 



 function Registrar_Consulta() {
            var idpaciente = $('#cmb_paciente_consulta').val();
            var descripcion = $('#txt_descripcion_consulta').val();   
            var diagnostico = $('#txt_diagnostico_consulta').val();
            
            if(idpaciente.length==0 || descripcion.length==0 || diagnostico.length==0 ) { 
                return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
                );
            }

              $.ajax({
                 url:'../controlador/consulta/control_registro_consulta.php',
                 type:'POST',
                 data:{
                    idpaciente:idpaciente,
                    descripcion:descripcion,
                    diagnostico:diagnostico
                    }
                 }).done(function(resp){
              alert(resp);
               // console.log(resp);
                if(resp > 0) {
                     $('#modal_registro').modal('hide');
                     ListarConsulta();
                Swal.fire("Mensaje de confirmacion","Consulta registrada con exito", "success");
                     }else {
                   return Swal.fire('Mensaje de error','Consulta no insertada','warning');
                  }
             })
     }
