
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Mantenimiento de Registro Historial Clinico </h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
             <div class="col-lg-2">
               <label for="">Codigo Historial</label>
               <input type="text" id="txt_codhistorial" class="form-control" disabled="">
             </div>
             <div class="col-lg-8">
               <label for="">Paciente</label>
               <input type="text" id="txt_paciente" class="form-control" disabled="">
             </div>
             <div class="col-lg-2">
               <label for="">&nbsp;</label> <br>
               <button class="btn btn-success"><i class="fa fa-search" 
                onclick="AbrirModalRegistro()"></i>Buscar Consulta</button>
             </div>
             <div class="col-lg-6">
              <label for="">Descripción de  la Consulta</label><br>
               <textarea id="txt_descripcion" cols="30" rows="3" class="form-control" disabled>
                 
               </textarea>
             </div>

              <div class="col-lg-6">
              <label for="">Diagnostico del Medico</label><br>
               <textarea id="txt_diagnostico" cols="30" rows="3" class="form-control" disabled>
                 
               </textarea>
             </div>
             <input type="text" id="txt_idconsulta" hidden>
             <div class="col-md-12">
          <!-- Custom Tabs -->
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab">Procedimiento</a></li>
              <li><a href="#tab_2" data-toggle="tab">Insumo</a></li>
              <li><a href="#tab_3" data-toggle="tab">Medicamento</a></li>
            
             
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <b>How to use:</b>

                <p>Exactly like the original bootstrap tabs except you should use
                  the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                A wonderful serenity has taken possession of my entire soul,
                like these sweet mornings of spring which I enjoy with my whole heart.
                I am alone, and feel the charm of existence in this spot,
                which was created for the bliss of souls like mine. I am so happy,
                my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                that I neglect my talents. I should be incapable of drawing a single stroke
                at the present moment; and yet I feel that I never was a greater artist than now.
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
                The European languages are members of the same family. Their separate existence is a myth.
                For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
                in their grammar, their pronunciation and their most common words. Everyone realizes why a
                new common language would be desirable: one could refuse to pay expensive translators. To
                achieve this, it would be necessary to have uniform grammar, pronunciation and more common
                words. If several languages coalesce, the grammar of the resulting language is more simple
                and regular than that of the individual languages.
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- nav-tabs-custom -->
        </div>

            </div>
            
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

    <div class="modal lg" id="modal_registro" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
           <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Listado de Consultas Medicas </h4>
              </div>
              <div class="modal-body">
                <div class="row">
                   
                   
                    <table id="tabla_consulta_historial" class="display responsive nowrap table-responsive table-bordered" style="width:100%">
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
              <div class="modal-footer">
            <button class="btn btn-primary" onclick="Registrar_Consulta()">Registrar</button>
           <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>



 








<script type="text/javascript" src="../js/historial_clinico.js"></script>
    
    <script type="text/javascript">
      
        $(document).ready(function() {
         $('.js-example-basic-single').select2();
      
           
                     
          });
     
    

    </script>