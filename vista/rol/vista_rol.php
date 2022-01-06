
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Panel Perfiles de Usuarios</h3>

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
                   <input type="text" class="global_filter form-control" id="global_filter" placeholder="ingersar dato a buscar ">
                   <span class="input-group-addon"><i class="fa fa-search"></i></span>
                 </div> <br><br>
                </div>

                 <div class="col-lg-2"> 
                   <button class="btn btn-primary" style="width: 100%" onclick="AbrirModalRegistro()"><i class="fa fa-plus">Nuevo Registro</i></button>
                </div>
               
              </div>
             <table id="tabla_rol" class="display responsive  table-responsive table-bordered" style="width:100%">
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

<!--modal registro usuario-->
 
  <div class="modal fade" id="modal_registro" role="dialog">
      <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Registro de Perfiles </h4>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                  <label for="procedimiento">Descripción:</label>
                  <input type="text" id="txt_nombre" name="" class="form-control" placeholder="Digite el nombre"><br>
              </div>

        
             
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" onclick="Registrar_Rol()">Registrar</button>
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
              <h4 class="modal-title">Edición de Perfiles </h4>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                <input type="text" id="txt_idrol" hidden="">
                  <label for="">Descripcion:</label>
                  <input type="text" id="txt_nombre_rol_actual" name=""  placeholder="Digite su procedimiento" hidden="">
                  <input type="text" id="txt_nombre_rol_nuevo" name="" class="form-control" placeholder="Nombre">
                  <br>
              </div>

              <div class="col-lg-12">
                  <label for="estatus">Estatus:</label>
                  <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_estatus">
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select> <br> <br>
              </div>
             
            </div>
            <div class="modal-footer">
              <button class="btn btn-warning" onclick="Modificar_Rol()">Modificar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
      </div>
  </div>






<script type="text/javascript" src="../js/rol.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
            ListarRol();

            $('.js-example-basic-single').select2();
          
              $("#modal_registro").on('shown.bs.modal',function(){
              $("#txt_nombre_proc").focus();
              })
          } );

    


       

    </script>