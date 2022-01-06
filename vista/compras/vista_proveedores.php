
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Mantenimiento de Proveedores</h3>

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
             <table id="tabla_proveedor" class="display responsive nowrap table-responsive table-bordered" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tipo Documento</th>
                    <th>Número</th>
                    <th>Nombre Comercial </th>
                    <th>Nombre Contacto</th>
                    <th>Apellidos Contacto</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Registro</th>
                    <th>Estatus</th>

                    <th>Acci&oacute;n</th>
                  </tr>
                </thead>
              
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
              <h4 class="modal-title">Registro de Proveedores</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                   <div class="col-lg-6">
                  <label for="">Tipo Documento:</label>
                  <select class="js-example-basic-single" id="cmb_tipoDocumento" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>
              <div class="col-lg-6">
                  <label for="usuario">Numero:</label>
                  <input type="text" id="txt_numero" name="" class="form-control" placeholder="Digite su numero"><br>
              </div>
              

                 <div class="col-lg-12">
                  <label for="usuario">Nombre comercial:</label>
                  <input type="text" id="txt_nombre_comercial" name="" class="form-control" placeholder="Digite su nombre"><br>
              </div>
             <div class="col-lg-6">
                  <label for="usuario">Nombre Contacto:</label>
                  <input type="text" id="txt_nombre_contacto" name="" class="form-control" placeholder="Digite su nombre"><br>
              </div>

               <div class="col-lg-6">
                  <label for="usuario">Apellidos:</label>
                  <input type="text" id="txt_apellidos_contacto" name="" class="form-control" placeholder="Digite su apellidos"><br>
              </div>
               
              <div class="col-lg-4">
                  <label for="usuario">Direccion:</label>
                  <input type="text" id="txt_direccion" name="" class="form-control" placeholder="Digite su direccion"><br>
              </div>

               <div class="col-lg-4">
                  <label for="usuario">Telefono:</label>
                  <input type="text" id="txt_celular" name="" class="form-control" placeholder="Digite su celular"><br>
              </div>

              
              
                <div class="col-lg-4">
                  <label for="">Correo ELectrónico</label>
                  <input type="text" id="txt_email" class="form-control" placeholder="Digite su email">
                   <label for="" id="emailOk" style="color:red;"></label>
                  <input type="text" id="validar_email" hidden="">
                   <br><br>
                </div>

               

            
                </div>
             
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" onclick="Registrar_Proveedor()">Registrar</button>
              
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
              <h4 class="modal-title">Editar Proveedores</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                   <div class="col-lg-6">
                    <input type="text" id="txt_idproveedor" hidden>
                  <label for="">Tipo Documento:</label>
                  <select class="js-example-basic-single" id="cmb_tipoDocumento_editar" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>
          

                 <div class="col-lg-6">
                  <label for="usuario">Numero:</label>
                   <input type="text" id="txt_numero_actual_editar" name="" hidden placeholder="Digite su numero"><br>
                  <input type="text" id="txt_numero_nuevo_editar" name="" class="form-control" placeholder="Digite su numero"><br>
              </div>
              

                 <div class="col-lg-12">
                  <label for="usuario">Nombre comercial:</label>
                  <input type="text" id="txt_nombre_comercial_editar" name="" class="form-control" placeholder="Digite su nombre"><br>
              </div>
             <div class="col-lg-6">
                  <label for="usuario">Nombre Contacto:</label>
                  <input type="text" id="txt_nombre_contacto_editar" name="" class="form-control" placeholder="Digite su nombre"><br>
              </div>

               <div class="col-lg-6">
                  <label for="usuario">Apellidos:</label>
                  <input type="text" id="txt_apellidos_contacto_editar" name="" class="form-control" placeholder="Digite su apellidos"><br>
              </div>
               
              <div class="col-lg-4">
                  <label for="usuario">Direccion:</label>
                  <input type="text" id="txt_direccion_editar" name="" class="form-control" placeholder="Digite su direccion"><br>
              </div>

               <div class="col-lg-4">
                  <label for="usuario">Telefono:</label>
                  <input type="text" id="txt_celular_editar" name="" class="form-control" placeholder="Digite su celular"><br>
              </div>

              
              
                <div class="col-lg-4">
                  <label for="">Correo ELectrónico</label>
                  <input type="text" id="txt_email_editar" class="form-control" placeholder="Digite su email">
                   <label for="" id="emailOk" style="color:red;"></label>
                  <input type="text" id="validar_email_editar" hidden="">
                   <br><br>
                </div>

               

            
                </div>
             
            </div>
            <div class="modal-footer">
              <button class="btn btn-warning" onclick="Modificar_Proveedor()">Modificar</button>
              
            </div>
          </div>
        </div>
      </div>
  </form>


  

<script type="text/javascript" src="../js/proveedor.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
            ListarProveedor();
             listar_combo_tipo_documento();
            // listar_combo_rol();
           //  listar_combo_especialidad();
            $('.js-example-basic-single').select2();
              $("#modal_registro").on('shown.bs.modal',function(){
              $("#txt_nombre").focus();
              })
          } );

       
  document.getElementById('txt_email').addEventListener('input',function(){
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