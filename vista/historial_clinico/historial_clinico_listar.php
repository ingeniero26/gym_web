
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Historial Clinico </h3>

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
                   <button class="btn btn-primary" style="width: 100%" onclick="ListarHistorial()"><i class="fa  fa-search">Buscar</i></button> <br> <br>
                </div>

                 <div class="col-lg-2"> 
                  <label for="">&nbsp;</label><br>
                   <button class="btn btn-primary" style="width: 100%" onclick="cargar_contenido('contenido_principal','historial_clinico/vista_historial_registro.php')" ><i class="fa fa-plus">Nuevo Registro</i></button>
                </div>
              </div>
              <div class="col-lg-12 table-responsive">
                <table id="tabla_historial" class="display responsive nowrap" style="width:100%">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fecha</th>
                      <th>Documento</th>
                      <th>Paciente</th>
                      <th>Diagnostico</th>
                      <th>Ver Detalle Historial </th> 
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Fecha</th>
                      <th>Documento</th>
                      <th>Paciente</th>
                      <th>Diagnostico</th>
                      <th>Ver Detalle Historial </th>
                    </tr>
                </tfoot>
              </table>
            </div>
            
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

 
 <form  autocomplete="false" onsubmit="return false">
    <div class="modal lg" id="modal_editar" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
           <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Editar Consultas </h4>
            </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                      <input type="text" id="txt_idconsulta" >
                      <label for="">Paciente:</label>
                      <input type="text" id="txt_paciente_consulta_editar" class="form-control" disabled=""><br> 
                    </div>

                  <div class="col-lg-12">
                    <label for="">Descripción de consulta</label>
                    <textarea id="txt_descripcion_consulta_editar" class="form-control" style="resize: none;"></textarea>
                  </div>
                

                 <div class="col-lg-12">
                    <label for="">Diagnostico de la consulta</label>
                    <textarea id="txt_diagnostico_consulta_editar" class="form-control" style="resize: none;"></textarea>
                  </div>
                </div>
                
              </div>
            <div class="modal-footer">
          <button class="btn btn-primary" onclick="Modificar_Consulta()">Modificar</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

</form>







<script type="text/javascript" src="../js/historial_clinico.js"></script>
    
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
     // alert(y+"-"+m+"-"+d);
      document.getElementById('txt_fechainicio').value=y+"-"+m+"-"+d;
      document.getElementById('txt_fechafin').value=y+"-"+m+"-"+d;
         
         
          
              $("#modal_registro").on('shown.bs.modal',function(){
             // $("#txt_nombre").focus();
              })
          } );
         ListarHistorial();
    

    </script>