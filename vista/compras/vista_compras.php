
    <div class="col-md-12">
        <div class="box box-warning box-solid">
            <div class="box-header with-border">
                <div class="box-title">MANTENIMIENTO INGRESO DE PRODUCTOS</div>
                  <div class="col-lg-2"> 
                   <button class="btn btn-primary" style="width: 100%" onclick="cargar_contenido('contenido_principal','compras/compra_registro.php')"><i class="fa fa-plus">Nuevo Registro</i></button>
                </div>
            </div>
           
            	
            		<div class="col-lg-4">
            		<label for=""><b>Fecha Inicio</b></label>
	            		<input type="date" id="txt_finicio" class="form-control">
		            	</div>
	            	<div class="col-lg-4">
	            		<label for=""><b>Fecha Fin</b></label>
	            		<input type="date" id="txt_ffin" class="form-control">
	            	</div>
	            	<div class="col-lg-3">
	            		<label for="">&nbsp;</label><br>
	            		<button class="btn btn-success" style="width:100%" onclick="listar_compras()"><i class="fa fa-search"></i>Buscar</button>
	            	</div>
            	 <br>
            	
            	
            	<table id="tabla_ingreso" class="display table-bordered table-responsive" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Proveedor</th>
                            <th>Tipo Comprobante</th>
                            <th>Número</th>
                            <th>Serie</th>
                            <th>Tipo Pago</th>
                            <th>% Iva</th>
                            <th>Dcto</th>
                            
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acci&oacute;n</th>
                        </tr>
                    </thead>
                   
                   
                </table>
            	
               
            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="../js/compras.js"></script>
<script>
$(document).ready(function() {
   
  $('.js-example-basic-single').select2();


  var f = new Date();
  var anio = f.getFullYear();
  var mes = f.getMonth() +1;
  var d = f.getDate();
  if(d < 10) {
  	d ='0' +d;
  }

if(mes < 10 ) {
	mes = '0' +mes;
}
 document.getElementById('txt_finicio').value=anio +"-"+mes +"-"+d;
 document.getElementById('txt_ffin').value=anio +"-"+mes +"-"+d;
   listar_compras();

 $('#modal_registro').on('shown.bs.modal', function () {
    $('#txt_nombre_categoria').trigger('focus')
  })
});

 

</script>