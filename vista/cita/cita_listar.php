
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Mantenimiento de Citas </h3>

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
             <table id="tabla_cita" class="display responsive nowrap" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nro</th>
                    <th>Fecha</th>
                    <th>Paciente</th>
                    <th>Medico</th>
                    <th>Descripción</th>
                    <th>Estatus</th>
                    <th>Acci&oacute;n</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Nro</th>
                    <th>Fecha</th>
                    <th>Paciente</th>
                    <th>Medico</th>
                     <th>Descripción</th>
                    <th>Estatus</th>
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
    <div class="modal lg" id="modal_registro" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
           <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Registro de Citas </h4>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                    <label for="">Paciente:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_paciente">  
                  </select> <br> <br>
                </div>

                <div class="col-lg-6">
                    <label for="">Especialidad:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_especialidad">
                  </select> <br> <br>
                </div>

                  <div class="col-lg-6">
                    <label for="">Doctor:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_medico">
                  </select> <br> <br>
                  </div>

                  <div class="col-lg-12">
                    <label for="">Descripción de cita</label>
                    <textarea id="txt_descripcion" class="form-control" style="resize: none;"></textarea>
                  </div>
                </div>
              
               
              </div>
              <div class="modal-footer">
              <button class="btn btn-primary" onclick="Registrar_Cita()">Registrar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
      </div>
    </div>

</form>


 <form  autocomplete="false" onsubmit="return false">
    <div class="modal lg" id="modal_editar" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
           <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Editar Citas </h4>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-lg-4">
                      <input type="text" id="txt_idcita" hidden="">
                    <label for="">Paciente:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_paciente_editar">  
                  </select> <br> <br>
                </div>

                <div class="col-lg-4">
                    <label for="">Especialidad:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_especialidad_editar">
                  </select> <br> <br>
                </div>

                  <div class="col-lg-4">
                    <label for="">Doctor:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_medico_editar">
                  </select> <br> <br>
                  </div>

                  <div class="col-lg-12">
                    <label for="">Descripción de cita</label>
                    <textarea id="txt_descripcion_editar" class="form-control" style="resize: none;"></textarea>
                  </div>

                <div class="col-lg-4">
                  <label for="estatus">Estatus:</label>
                  <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_estatus_editar">
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="CANCELADA">CANCELADA</option>
                  <option value="ATENDIDA">ATENDIDA</option>
                </select> <br> <br>
              </div>
                </div>
              
               
              </div>
              <div class="modal-footer">
              <button class="btn btn-primary" onclick="Modificar_Cita()">Modificar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
      </div>
    </div>

</form>





<script type="text/javascript" src="../js/cita.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
         ListarCita();
         listar_combo_paciente();
         listar_especialidad_combo();
          listar_combo_paciente_editar();
         listar_especialidad_combo_editar();

         $("#cmb_especialidad").change(function() {
           var idmedico =$("#cmb_especialidad").val();
            listar_doctor_combo(idmedico);
          });

         $("#cmb_especialidad_editar").change(function() {
           var idespecialidad =$("#cmb_especialidad_editar").val();
            listar_doctor_combo_editar(idespecialidad,'');
          });


          

            $('.js-example-basic-single').select2();
          
              $("#modal_registro").on('shown.bs.modal',function(){
             // $("#txt_nombre").focus();
              })
          } );

    

    </script>