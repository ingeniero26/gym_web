
 

 <div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Panel Productos</h3>

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
             <table id="tabla_productos" class="display responsive nowrap table-responsive table-bordered" style="width:100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Categoria</th>
                    <th>Medida</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Foto</th>
                    <th>Fecha Registro</th>
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
  <form  autocomplete="false" onsubmit="return false">
     <div class="modal fade" id="modal_registro" role="dialog">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Registro de Productos</h4>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                  <label for="usuario">Código:</label>
                  <input type="text" id="txt_codigo" name="" class="form-control" placeholder="Digite su codigo"><br>
              </div>
                <div class="col-lg-12">
                  <label for="">Descripcion:</label>
                  <input type="text" id="txt_descripcion" name="" class="form-control" placeholder="Digite su descripcion"><br>
              </div> 

                <div class="col-lg-12">
                  <label for="">Categoria:</label>
                  <select class="js-example-basic-single" id="cmb_categoria" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>
               <div class="col-lg-12">
                  <label for="">Medida:</label>
                  <select class="js-example-basic-single" id="cmb_medida" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>

                 <div class="col-lg-12">
                  <label for="">Precio:</label>
                  <input type="number" id="txt_Precio" name="" class="form-control" placeholder="Digite su descripcion"><br>
              </div> 

                <div class="col-lg-6">
              <label for="">Subir Imagen</label>
              <input type="file" id="imagen" accept="imagen/*">
             </div>

             
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" onclick="Registrar_Producto()">Registrar</button>
              
            </div>
          </div>
        </div>
      </div>
  </form>

  <form  autocomplete="false" onsubmit="return false">
     <div class="modal fade" id="modal_editar" role="dialog">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Edicion de Productos</h4>
            </div>
            <div class="modal-body">
              <div class="row">
              <div class="col-lg-12">
                <input type="text" id="txt_idproducto" hidden>
                  <label for="usuario">Código:</label>
                  <input type="text" id="txt_codigo_actual_editar" name="" hidden placeholder="Digite su codigo"><br>
                   <input type="text" id="txt_codigo_nuevo_editar" name="" class="form-control" placeholder="Digite su codigo"><br>
              </div>
                <div class="col-lg-12">
                  <label for="">Descripcion:</label>
                  <input type="text" id="txt_descripcion_actual_editar" name="" hidden placeholder="Digite su descripcion"><br>
                    <input type="text" id="txt_descripcion_nuevo_editar" name="" class="form-control" placeholder="Digite su descripcion"><br>
              </div> 

                <div class="col-lg-12">
                  <label for="">Categoria:</label>
                  <select class="js-example-basic-single" id="cmb_categoria_editar" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>
               <div class="col-lg-12">
                  <label for="">Medida:</label>
                  <select class="js-example-basic-single" id="cmb_medida_editar" name="state" style="width: 100%">
                    
                  </select> <br><br>
              </div>

                 <div class="col-lg-12">
                  <label for="">Precio:</label>
                  <input type="number" id="txt_Precio_editar" name="" class="form-control" placeholder="Digite precio"><br>
                </div> 

                <div class="col-lg-6">
              <label for="">Subir Imagen</label>
              <input type="file" id="imagen_editar" accept="imagen/*"> 
             </div><br> <br>

             <div class="col-lg-2">
                <label for="">&nbsp;</label><br>
                 <button class="btn btn-success" onclick="Editar_Foto_Producto()">Actualizar</button>
               </div><br><br>

             </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-warning" onclick="Modificar_Producto()">Editar</button>
              
            </div>
          </div>
        </div>
      </div>
  </form>



<script type="text/javascript" src="../js/productos.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function() {
            ListarProductos();
            listar_categoria_combo();
            listar_combo_medida();

            $('.js-example-basic-single').select2();
         //    listar_combo_rol();
              $("#modal_registro").on('shown.bs.modal',function(){
              $("#txt_usu").focus();
              })
          } );

     

     

document.getElementById("imagen").addEventListener("change", () => {
     var fileName = document.getElementById("imagen").value; 
     var idxDot = fileName.lastIndexOf(".") + 1; 
     var extFile = fileName.substr(idxDot, fileName.length).toLowerCase(); 
     if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){ 
      //TO DO 
     }else{ 
      Swal.fire("MENSAJE DE ADVERTENCIA","DEBE SELECCIONAR SOLO IMAGENES","warning");
       document.getElementById("imagen").value="";
     } 
    });


document.getElementById("imagen_editar").addEventListener("change", () => {
     var fileName = document.getElementById("imagen_editar").value; 
     var idxDot = fileName.lastIndexOf(".") + 1; 
     var extFile = fileName.substr(idxDot, fileName.length).toLowerCase(); 
     if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){ 
      //TO DO 
     }else{ 
      Swal.fire("MENSAJE DE ADVERTENCIA","DEBE SELECCIONAR SOLO IMAGENES","warning");
       document.getElementById("imagen_editar").value="";
     } 
    });



    </script>