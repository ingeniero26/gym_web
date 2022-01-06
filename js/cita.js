var   tablacita;

function ListarCita(){
    tablacita = $("#tabla_cita").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        ajax:{
            url:"../controlador/cita/controladorlistar_cita.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"cita_nroatencion"},
            {"data":"cita_feregistro"},
            {"data":"paciente"},
            {"data":"medico"},
            {"data":"cita_descripcion"},
            {"data":"cita_estatus",
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

        document.getElementById("tabla_cita_filter").style.display="none";

          $('input.global_filter').on( 'keyup click', function () {
            filterGlobal();
        } );
        $('input.column_filter').on( 'keyup click', function () {
            filterColumn( $(this).parents('tr').attr('data-column') );
        });

        tablacita.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_cita').DataTable().page.info();
        tablacita.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

    }

// modificar datos del procedimiento
    $('#tabla_cita').on('click','.editar',function(){
        var data = tablacita.row($(this).parents('tr')).data();

         if(tablacita.row(this).child.isShown()){
                var data = tablacita.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_idcita").val(data.cita_id);
        $("#cmb_paciente_editar").val(data.paciente_id).trigger("change");
        $("#cmb_especialidad_editar").val(data.especialidad_id).trigger("change");
        listar_doctor_combo_editar(data.especialidad_id,data.medico_id);
        //$("#cmb_medico_editar").val(data.medico_id).trigger("change");
        $("#txt_descripcion_editar").val(data.cita_descripcion);
        $("#cmb_estatus_editar").val(data.cita_estatus).trigger("change");

    })

      $('#tabla_cita').on('click','.imprimir',function(){
        var data = tablacita.row($(this).parents('tr')).data();

         if(tablacita.row(this).child.isShown()){
                var data = tablacita.row(this).data();
            }
            window.open("../vista/libreportes/reportes/generar_ticket.php?id="
             +parseInt(data.cita_id)+"#zoom=100%","Ticket","scrollbars=NO");
    })


    function filterGlobal() {
        $('#tabla_cita').DataTable().search(
        $('#global_filter').val(),
        ).draw();
    }
   function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }


    function listar_combo_paciente() {
         $.ajax({
            url:"../controlador/cita/controlador_combo_paciente_listar.php",
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
                $('#cmb_paciente').html(cadena);
              //  $('#cmb_paciente_editar').html(cadena);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_paciente').html(cadena);
            //   $('#cmb_paciente_editar').html(cadena);
            }
         })
    }   

    function listar_especialidad_combo() {
        $.ajax({
            url:"../controlador/cita/control_combo_especialidad.php",
             type:'POST'
        }).done(function(resp){
          //alert(resp);
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
                $('#cmb_especialidad').html(cadena);
               var idespecialidad = $("#cmb_especialidad").val();
               listar_doctor_combo(idespecialidad);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_especialidad').html(cadena);
              
            }
         })
    } 


     function listar_doctor_combo(idespecialidad) {
          $.ajax({
            url:"../controlador/cita/control_combo_doctor.php",
             type:'POST',
             data:{
                idespecialidad:idespecialidad
             }
         }).done(function(resp){
       
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
                $('#cmb_medico').html(cadena);
               // $('#cmb_especialidad_editar').html(cadena);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_medico').html(cadena);
              //  $('#cmb_especialidad_editar').html(cadena);
            }
         })
    } 


     function Registrar_Cita() {
            var idpaciente = $('#cmb_paciente').val();
            var iddoctor = $('#cmb_medico').val();   
            var idespecialidad = $('#cmb_especialidad').val();
            var descripcion = $('#txt_descripcion').val();
            var idusuario = $('#txtidprincipal').val();
            if(idpaciente.length==0 || iddoctor.length==0 || descripcion.length==0 ) { 
                return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
                );
            }

              $.ajax({
                 url:'../controlador/cita/control_registro_cita.php',
                 type:'POST',
                 data:{
                    idpaciente:idpaciente,
                    iddoctor:iddoctor,
                    idespecialidad:idespecialidad,
                    descripcion:descripcion,
                    idusuario:idusuario
                    }
                 }).done(function(resp){
              // alert(resp);
               // console.log(resp);
                if(resp > 0) {
                    Swal.fire({
                      title: 'Cita registrada correctamente',
                      text: "Datos de Confirmación",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Imprimir ticket'
                    }).then((result) => {
                      if (result.value) {
                       window.open("../vista/libreportes/reportes/generar_ticket.php?id="
                        +parseInt(resp)+"#zoom=100%","Ticket","scrollbars=NO");
                        //$('#modal_registro').modal('hide');
                         $('#modal_registro').modal('hide');
                         ListarCita();
                      } else {
                         $('#modal_registro').modal('hide');
                         ListarCita();
                      }
                    })
            }else {
                   return Swal.fire('Mensaje de error','Cita no insertado','warning');
                  }
             })
     }



    function listar_combo_paciente_editar() {
         $.ajax({
            url:"../controlador/cita/controlador_combo_paciente_listar.php",
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
                $('#cmb_paciente_editar').html(cadena);
             
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_paciente_editar').html(cadena);
            
            }
         })
    }   

    function listar_especialidad_combo_editar() {
        $.ajax({
            "url":"../controlador/cita/control_combo_especialidad.php",
             type:'POST'
        }).done(function(resp){
     //  alert(resp);
            var data = JSON.parse(resp);
            
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
                $('#cmb_especialidad_editar').html(cadena);
               var idespecialidad = $("#cmb_especialidad_editar").val();
               listar_doctor_combo_editar(idespecialidad);
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_especialidad_editar').html(cadena);
              
            }
         })
    } 


   function listar_doctor_combo_editar(idespecialidad, idmedico) {
          
          $.ajax({
            url:"../controlador/cita/control_combo_doctor.php",
             type:'POST',
             data:{
                idespecialidad:idespecialidad
             }
         }).done(function(resp){
        //alert(resp);
            var data = JSON.parse(resp);
            //console.log(resp);
            var cadena ="";
            if(data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
                $('#cmb_medico_editar').html(cadena);
                if(idmedico!='') {
                     $("#cmb_medico_editar").val(idmedico).trigger("change")
                }
             
            } else {
                cadena+="<option value=''> No Hay datos</option>";
                $('#cmb_medico_editar').html(cadena);
             
            }
         })
    } 










 function Modificar_Cita() {
       var idcita =$('#txt_idcita').val();
        var idpaciente = $('#cmb_paciente_editar').val();
        var iddoctor = $('#cmb_medico_editar').val();
        var descripcion = $('#txt_descripcion_editar').val();
        var idespecialidad = $('#cmb_especialidad_editar').val();
        var estatus = $('#cmb_estatus_editar').val();
        if(idcita.length==0 ||   idpaciente.length==0 || iddoctor.length==0 || 
            descripcion.length==0 ||idespecialidad.length==0 ) { 
            return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
            );
        }

          $.ajax({
             url:'../controlador/cita/control_modificar_cita.php',
             type:'POST',
             data:{
                idcita:idcita,
                idpaciente:idpaciente,
                iddoctor:iddoctor,
                idespecialidad:idespecialidad,
                 descripcion:descripcion,
                 estatus:estatus
                  }
             }).done(function(resp){
             alert(resp);
            if(resp > 0) {
                Swal.fire({
                  title: 'Cita modificada correctamente',
                  text: "Datos de Confirmación",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Imprimir ticket'
                }).then((result) => {
                  if (result.value) {
                   window.open("../vista/libreportes/reportes/generar_ticket.php?id="
                    +parseInt(idcita)+"#zoom=100%","Ticket","scrollbars=NO");
                    $('#modal_registro').modal('hide');
                  } else {
                     $('#modal_registro').modal('hide');
                     ListarCita();
                  }
                })
        }else {
               return Swal.fire('Mensaje de error','Cita no insertado','warning');
              }
         })
 }







