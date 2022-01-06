
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Mantenimiento de Medicos</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="form-group">
                <div class="col-lg-10">
                  <div class="input-group">
                   <input type="text" class="global_filter form-control" id="global_filter" placeholder="Buscar  ">
                   <span class="input-group-addon"><i class="fa fa-search"></i></span>
                 </div> <br><br>
                </div>

                 <div class="col-lg-2"> 
                   <button class="btn btn-primary" style="width: 100%" onclick="AbrirModalRegistro()"><i class="fa fa-plus">Nuevo Registro</i></button>
                </div>
               
              </div>
             <table id="tabla_medico" class="display responsive nowrap" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nro Doc</th>
                    <th>Medico </th>
                    <th>Colegiatura</th>
                    <th>Especialidad</th>
                    <th>Dirección</th>
                    <th>Sexo</th>
                    <th>Movil</th>
                    <th>Acci&oacute;n</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                   <th>#</th>
                    <th>Nro Doc</th>
                    <th>Medico </th>
                    <th>Colegiatura</th>
                    <th>Especialidad</th>
                    <th>Dirección</th>
                    <th>Sexo</th>
                    <th>Movil</th>
                    <th>Acci&oacute;n</th>
                  </tr>
                </tfoot>
                </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
 <form  autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_registro" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Registro de Medicos </h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-12">
                  <input type="text" >
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="txt_nombre" name="" class="form-control" placeholder="Digite nombre"><br>
                </div>

                  <div class="col-lg-6">
                    <label for="">Ape Paterno:</label>
                    <input type="text" id="txt_apepat" name="" class="form-control" placeholder="Digite paterno"><br>
                </div>

                 <div class="col-lg-6">
                    <label for="">Ape Materno:</label>
                    <input type="text" id="txt_apemat" name="" class="form-control" placeholder="Digite Materno"><br>
                </div>
                   <div class="col-lg-12"></div>
                 <div class="col-lg-12">
                    <label for="">Dirección:</label>
                    <input type="text" id="txt_direccion" name="" class="form-control" placeholder="Digite dir"><br>
                </div>
                 
                <div class="col-lg-4">
                    <label for="">Teléfono:</label>
                    <input type="text" id="txt_movil" name="" class="form-control" placeholder="Digite tel" onkeypress="return soloNumeros(event)"><br> <br>
                </div>


                <div class="col-lg-4">
                    <label for="estatus">Sexo:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_sexo">
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                  </select> <br> <br>
                </div>

                <div class="col-lg-4">
                    <label for="">Fecha Nacimiento:</label>
                    <input type="date" id="txt_fnacimiento" name="" class="form-control" placeholder="fecha nac"><br><br>
                </div>
             
                <div class="col-lg-4">
                    <label for="">Documento:</label>
                    <input type="text" id="txt_nrodocumento" name="" class="form-control" placeholder="Digite No Documento"><br>
                </div>
                 <div class="col-lg-4">
                    <label for="">Colegiatura:</label>
                    <input type="text" id="txt_colegiatura" name="" class="form-control" placeholder="Digite No Tarjeta"><br>
                </div>

                  <div class="col-lg-4">
                    <label for="estatus">Especialidad:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_especialidad">
                  </select> <br> <br>
                </div>

                <div class="col-lg-12" style="text-align: center;">
                  <b>DATOS DEL USUARIO</b><br>
                </div>
                  <div class="col-lg-4">
                    <label for="">Usuario:</label>
                    <input type="text" id="txt_usu" name="" class="form-control" placeholder="Digite usuario"><br>
                </div>
                 <div class="col-lg-4">
                    <label for="">Contraseña:</label>
                    <input type="password" id="txt_contra" name="" class="form-control" placeholder="Digite Clave"><br>
                </div>

                <div class="col-lg-4">
                    <label for="">Rol:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_rol">
                   </select> <br>
                </div>

                <div class="col-lg-12">
                  <label for="">Correo ELectrónico</label>
                  <input type="text" id="txt_email" class="form-control" placeholder="Digite su email">
                   <label for="" id="emailOk" style="color:red;"></label>
                  <input type="text" id="validar_email" hidden="">
                   <br><br>
                </div>

            </div>
           </div>
            <div class="modal-footer">
            <button class="btn btn-primary" onclick="Registrar_Medico()">Registrar</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
    </div>
  </div>
</form>
 <form  autocomplete="false" onsubmit="return false">
   <div class="modal fade" id="modal_editar" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Editar Medicos </h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-12">
                  <input type="text" id="txtid_medico" hidden="">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="txt_nombre_editar" name="" class="form-control" placeholder="Digite nombre"><br>
                </div>

                  <div class="col-lg-6">
                    <label for="">Ape Paterno:</label>
                    <input type="text" id="txt_apepat_editar" name="" class="form-control" placeholder="Digite paterno"><br>
                </div>

                 <div class="col-lg-6">
                    <label for="">Ape Materno:</label>
                    <input type="text" id="txt_apemat_editar" name="" class="form-control" placeholder="Digite Materno"><br>
                </div>
                   <div class="col-lg-12"></div>
                 <div class="col-lg-12">
                    <label for="">Dirección:</label>
                    <input type="text" id="txt_direccion_editar" name="" class="form-control" placeholder="Digite dir"><br>
                </div>
                 
                <div class="col-lg-4">
                    <label for="">Teléfono:</label>
                    <input type="text" id="txt_movil_editar" name="" class="form-control" placeholder="Digite tel" onkeypress="return soloNumeros(event)"><br> <br>
                </div>


                <div class="col-lg-4">
                    <label for="estatus">Sexo:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_sexo_editar">
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                  </select> <br> <br>
                </div>

                <div class="col-lg-4">
                    <label for="">Fecha Nacimiento:</label>
                    <input type="date" id="txt_fnacimiento_editar" name="" class="form-control" placeholder="fecha nac_editar"><br><br>
                </div>
             
                <div class="col-lg-4">
                    <label for="">Documento:</label>
                    <input type="text" id="txt_nrodocumento_actual_editar" hidden="" placeholder="Digite No Documento">
                     <input type="text" id="txt_nrodocumento_nuevo_editar" name="" class="form-control" placeholder="Digite No Documento">
                    <br>
                </div>
                 <div class="col-lg-4">
                    <label for="">Colegiatura:</label>
                     <input type="text" id="txt_colegiatura_actual_editar" hidden="" placeholder="Digite No Tarjeta">
                      <input type="text" id="txt_colegiatura_nuevo_editar" name="" class="form-control" placeholder="Digite No Tarjeta">
                     <br>
                </div>

                  <div class="col-lg-4">
                    <label for="estatus">Especialidad:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_especialidad_editar">
                  </select> <br> <br>
                </div>

                <div class="col-lg-12" style="text-align: center;">
                  <b>DATOS DEL USUARIO</b><br>
                </div>
                  <div class="col-lg-6">
                    <input type="text" id="txtid_usuario" hidden="">
                    <label for="">Usuario:</label>
                    <input type="text" id="txt_usu_editar" name="" class="form-control" placeholder="Digite usuario" disabled=""><br>
                </div>
                

                <div class="col-lg-6">
                    <label for="">Rol:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" 
                    id="cmb_rol_editar" disabled="">
                   </select> <br>
                </div>

                <div class="col-lg-12">
                  <label for="">Correo ELectrónico</label>
                  <input type="text" id="txt_email_editar" class="form-control" placeholder="Digite su email">
                   <label for="" id="emailOk_editar" style="color:red;"></label>
                  <input type="text" id="validar_email_editar" hidden="">
                   <br><br>
                </div>

            </div>
           </div>
            <div class="modal-footer">
            <button class="btn btn-primary" onclick="Editar_Medico()">Modificar</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
    </div>
  </div>

 </form>





<script type="text/javascript" src="../js/medico.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
            ListarMedico();
             listar_combo_rol();
             listar_combo_especialidad();
            $('.js-example-basic-single').select2();
              $("#modal_registro").on('shown.bs.modal',function(){
              $("#txt_nombre").focus();
              })
          } );

        /*valida email*/
  document.getElementById('txt_email_editar').addEventListener('input',function(){
   campo=event.target;
      emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(emailRegex.test(campo.value)) {
            $(this).css("border","");
            $("#emailOk").html("");
            $("#validar_email").val("correcto");
          }  else {
            $(this).css("border","1px solid red");
             $("#emailOk").html("Email Incorrecto");
              $("#validar_email").val("incorrecto");
          }
       })

   document.getElementById('txt_email_editar').addEventListener('input',function(){
   campo=event.target;
      emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(emailRegex.test(campo.value)) {
            $(this).css("border","");
            $("#emailOk_editar").html("");
            $("#validar_email_editar").val("correcto");
          }  else {
            $(this).css("border","1px solid red");
             $("#emailOk_editar").html("Email Incorrecto");
              $("#validar_email_editar").val("incorrecto");
          }
       })
    </script>