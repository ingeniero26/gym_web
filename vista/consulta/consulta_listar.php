
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Consultas Medicas </h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="form-group">
                <div class="col-lg-4">
                  <label for="">Fecha Inicio</label>
                  <input type="date" id="txt_fechainicio" class="form-control">
                </div>

                <div class="col-lg-4">
                    <label for="">Fecha Fin</label>
                    <input type="date" id="txt_fechafin" class="form-control">
                </div>

                <div class="col-lg-2"> 
                  <label for="">&nbsp;</label><br>
                   <button class="btn btn-primary" style="width: 100%" onclick="ListarConsulta()"><i class="fa  fa-search">Buscar</i></button>
                </div>

                 <div class="col-lg-2"> 
                  <label for="">&nbsp;</label><br>
                   <button class="btn btn-primary" style="width: 100%" onclick="AbrirModalRegistro()"><i class="fa fa-plus">Nuevo Registro</i></button>
                </div>
               
              </div>
             <table id="tabla_consulta_medica" class="display responsive nowrap" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Documento</th>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Doctor</th>
                    <th>Especialidad</th>
                    <th>Estatus</th>
                    <th>Acci&oacute;n</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Documento</th>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Doctor</th>
                    <th>Especialidad</th>
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
                <h4 class="modal-title">Registro de Consultas Medicas </h4>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                    <label for="">Paciente:</label>
                    <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_paciente_consulta">  
                  </select> <br> <br>
                </div>

                            

                <div class="col-lg-12">
                    <label for="">Descripción de consulta</label>
                    <textarea id="txt_descripcion_consulta" class="form-control" style="resize: none;"></textarea>
                  </div>
                

                 <div class="col-lg-12">
                    <label for="">Diagnostico de la consulta</label>
                    <textarea id="txt_diagnostico_consulta" class="form-control" style="resize: none;"></textarea>
                  </div>
                </div>
              
            
              </div>
              <div class="modal-footer">
              <button class="btn btn-primary" onclick="Registrar_Consulta()">Registrar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
      </div>
    </div>

</form>







<script type="text/javascript" src="../js/consulta.js"></script>
    
    <script type="text/javascript">
      $('.js-example-basic-single').select2();
        $(document).ready(function() {
      var  n = new Date();
      var y = n.getFullYear();
      var m = n.getMonth()+1;
      var d = n.getDate();
      if(d<10) {

        d ='0' +d;
      }
      if(m <10) {

        m ='0' +m;
      }
      document.getElementById('txt_fechainicio').value=y+"-"+m+"-"+d;
      document.getElementById('txt_fechafin').value=y+"-"+m+"-"+d;
          ListarConsulta();
          listar_combo_paciente_consulta();
          
              $("#modal_registro").on('shown.bs.modal',function(){
             // $("#txt_nombre").focus();
              })
          } );

    

    </script>