
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Mantenimiento de Categorias</h3>

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
             <table id="tabla_categoria" class="display responsive nowrap" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Fecha registro</th>
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

 <div class="modal fade" id="modal_registro" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Registro de Categoria </h4>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                  <label for="especialidad">Categoria:</label>
                  <input type="text" id="txt_nombre" name="" class="form-control" placeholder="Digite descripción"><br>
              </div>

           
             
            </div>
            <div class="modal-footer">
            <button class="btn btn-primary" onclick="Registrar_Categoria()">Registrar</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
    </div>
  </div>

  <div class="modal fade" id="modal_editar" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Editar de Categoria </h4>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                <input type="text" id="txtid_categoria" hidden="">
                  <label for="especialidad">Categoria:</label>
                  <input type="text" id="txt_nombre_actual_editar" name="" hidden="" placeholder="Digite la especialidad">
                   <input type="text" id="txt_nombre_nuevo_editar" name="" class="form-control" placeholder="Digite la especialidad">
                  <br>
              </div>

              <div class="col-lg-12">
                  <label for="estatus">Estatus:</label>
                  <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_estatus_editar">
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select> <br> <br>
              </div>
             
            </div>
            <div class="modal-footer">
            <button class="btn btn-primary" onclick="Modificar_Especialidad()">Registrar</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
    </div>
  </div>





<script type="text/javascript" src="../js/categoria.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
            ListarCategoria();

            $('.js-example-basic-single').select2();
          
              $("#modal_registro").on('shown.bs.modal',function(){
              $("#txt_nombre").focus();
              })
          } );

    

    </script>