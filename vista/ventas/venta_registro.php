
    <div class="col-md-12">
        <div class="box box-default">
            <div class="box-head">
                <div class="box-title"><b>SALIDA DE PRODUCTOS AL ALMACEN</b></div>
                <div class="box-tools">
                 
                </div>
            </div>
            <div class="box-body">
            	<div class="row">
            		<div class="col-lg-12">
                        <h1 class="text-center">DATOS DE LA FACTURA DE VENTA</h1>
                    </div>
            		<div class="col-lg-4">
                        <label for=""><b>Fecha Compra </b></label>
                        <input type="date" class="form-control" id="txt_fecha">
                    </div>
            	   <div class="col-lg-4">
                       <label for=""><b>Proveedor</b> </label>
                        <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_proveedor"> 
                       
                         </select> 
                    </div>

               
                   
                    <div class="col-lg-4">
                        <label for=""><b>% IVA (19% - 0.19)</b></label>
                        <input type="text" class="form-control" id="txt_impuesto" disabled>
                    </div>
                      <div class="col-lg-2">
                       <label for=""><b>Tipo Comprobante</b> </label>
                        <select class="js-example-basic-single" name="state"
                        style="width: 100%;" id="cmb_tipo_comprobante"> 
                        <option value="COTIZACION">COTIZACION</option>
                        <option value="FACTURA">FACTURA</option>
                        <option value="BOLETA">BOLETA</option>
                        <option value="TICKET">TICKET</option>
                       
                         </select> <br> <br>
                    </div>
                     <div class="col-lg-2">
                        <label for=""><b>No Factura</b></label>
                        <input type="text" class="form-control" id="txt_no_comprobante">
                    </div>
                     <div class="col-lg-2">
                        <label for=""><b>Serie Factura</b></label>
                        <input type="text" class="form-control" id="txt_serie" >
                    </div>
                       <div class="col-lg-2">
                       <label for=""><b>Forma Pago</b> </label>
                        <select class="js-example-basic-single" name="state"
                        style="width: 100%;" id="cmb_tipo_pago"> 
                        <option value="CONTADO">CONTADO</option>
                        <option value="CREDITO">CREDITO</option>
                        <option value="CREDICONTADO">CREDICONTADO</option>
                        <option value="TARJETA">TARJETA</option>
                         </select> <br> <br>
                    </div>
                      <div class="col-lg-2">
                        <label for=""><b>% Descuento</b></label>
                        <input type="text"  class="form-control"  id="txt_descto">
                    </div><br>
                   
                    
                    
                     <div class="col-lg-2">
                       <label for=""><b>Estado</b> </label>
                        <select class="js-example-basic-single" name="state"
                        style="width: 100%;" id="cmb_estado"> 
                        <option value="CANCELADA">CANCELADA</option>
                        <option value="POR_PAGAR">POR PAGAR</option>
                        <option value="POR_COBRAR">POR COBRAR</option>
                        
                       
                         </select> <br> <br>
                    </div>
                    <div class="col-lg-12">
                        <h1 class="text-center">DATOS DEL PRODUCTO</h1>
                    </div>
                    
                       <div class="col-lg-4">
                       <label for=""><b>Producto</b> </label>
                        <select class="js-example-basic-single" name="state" style="width: 100%;" id="cmb_producto"> 
                       
                         </select> <br> <br>
                    </div>
                     <div class="col-lg-3">
                        <label for=""><b>Precio</b></label>
                        <input type="number" onkeypress="return filterfloat(event,this);" min="1" class="form-control" id="txt_precio">
                    </div>
                     <div class="col-lg-3">
                        <label for=""><b>Cantidad</b></label>
                        <input type="number"  class="form-control" onkeypress="return event.charCode >= 48" min="1" id="txt_cantidad">
                    </div><br>
                   

                   
                    <div class="col-lg-2">
                        <label>&nbsp;</label><br>
                        <button class="btn btn-success" onclick="Agregar_Producto_Detalle_Ingreso()"><i class="fa fa-plus"></i>Agregar</button>
                    </div>
                    <div class="col-lg-12" style="text-align: center;">
                        <button class="btn btn-primary btn-lg " onclick="Registrar_Compra()">Registrar Compra</button>
                    </div>
                    <div class="col-12" style="text-align:left;">
                        <h4 for=""><b>Detalle de ingreso</b></h4>
                    </div>
                    <div class="col-12 table-responsive">
                        <table id="detalle_ingreso" class="table  table-responsive">
                            <thead>
                                <th>ID</th>
                                <th>PRODUCTO</th>
                                <th>CANTIDAD</th>
                                <th>PRECIO</th>
                                <th>SUB TOTAL</th>
                                <th>DESCUENTO</th>
                                <th>IVA</th>
                                <th>ACCI&Oacute;N</th>
                            </thead>
                            <tbody id="tb_detalle_ingreso">
                            </tbody>

                        </table>
                     
                    </div>
                      
                       
                       
                        
                        <div class="col-12" style="text-align: right;">
                            <label for="" id="lbl_subtotal"></label>
                        </div>
                         <div class="col-12" style="text-align: right;">
                            <label for="" id="lbl_decto"></label>
                        </div>
                        <div class="col-12" style="text-align: right;">
                            <label for="" id="lbl_impuesto"></label>
                        </div>
                         <div class="col-12" style="text-align: right;">
                            <label for="" id="lbl_totalneto"></label>
                        </div>
            	</div> 
            	
            	
               
            </div>
        </div>
    </div>


<script type="text/javascript" src="../js/compras.js"></script>
<script>
$(document).ready(function() {

   
  $('.js-example-basic-single').select2();

 listar_combo_proveedor();
 listar_combo_producto();
 //listar_combo_bodega();
 
});
$('#cmb_tipo_comprobante').on('select2:select', function (e) {
  let tipo = document.getElementById('cmb_tipo_comprobante').value;
  if(tipo=="FACTURA") {
    document.getElementById('txt_impuesto').disabled=false;
  } else {
    document.getElementById('txt_impuesto').disabled=true;
  }
});
</script>