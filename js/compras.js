var t_ingreso;

function listar_compras() {
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    
  //alert(finicio +" " +ffin);
    t_ingreso = $("#tabla_ingreso").DataTable({
        "ordering": false,
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "responsive": true,
        "autoWidth": false,
        "ajax": {
            "method": "POST",
            "url": "../controlador/compras/control_ingreso_listar.php",
            data: {
                finicio: finicio,
                ffin: ffin
                
            }
        },

        "order": [
            [1, 'asc']
        ],
        "columns": [
            { "defaultContent": "" },
            { "data": "Fecha" },
            { "data": "usuario_nombre" },
            { "data": "NombreComercial" },
            { "data": "tipo_comprobante" },
            { "data": "noFactura" },
            { "data": "serie_factura" },
            { "data": "TipoPago" },
            { "data": "impuesto" },
            { "data": "dcto" },
            { "data": "TotalCompra" },
        
            {
                "data": "estatus",
                render: function(data, type, row) {
                    if (data == 'CANCELADA') {
                        return "<span class='label label-success m-r-5 m-b-5'>" + data + "</span>";
                    } else if (data == 'POR_PAGAR') {
                        return "<span class='label label-danger m-r-5 m-b-5'>" + data + "</span>";
                    } else {
                        return "<span class='label label-warning m-r-5 m-b-5'>" + data + "</span>";
                    }
                }
            },

            {
                "defaultContent": "<button style='font-size:13px;' type='button' class='imprimir btn btn-primary'><i class='fa fa-print'></i></button> &nbsp;<button style='font-size:13px;' type='button' class='anular btn btn-danger'><i class='fa fa-trash'></i></button>"
            }

        ],
        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $($(nRow).find("td")[2]).css('text-align', 'center');

        },
        "language": idioma_espanol,
        select: true
    });
    t_ingreso.on('draw.dt', function() {
        var PageInfo = $('#tabla_ingreso').DataTable().page.info();
        t_ingreso.column(0, { page: 'current' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

}

// modificar datos del procedimiento
$('#tabla_ingreso').on('click', '.imprimir', function() {
    var data = t_ingreso.row($(this).parents('tr')).data();
    if (t_ingreso.row(this).child.isShown()) {
        var data = t_ingreso.row(this).data();
    }
     window.open("../mpdf/reporte_compras.php?codigo="+
        parseInt(data.compra_id)+"#zoom=100","Reporte de Compra","scrollbards=NO");
})

// anular compra 

$('#tabla_ingreso').on('click', '.anular', function() {
    var data = t_ingreso.row($(this).parents('tr')).data();
    if (t_ingreso.row(this).child.isShown()) {
        var data = t_ingreso.row(this).data();
    }
       Swal.fire({
              title: 'Deseas anular esta compra?',
              text: "Una vez anulado el registro, no se podra revertira la operación?",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Anular Ingreso'
            }).then((result) => {
              if (result.value) {
             $.ajax({
                url: '../controlador/ingreso/control_anular_registro.php',
                type: 'POST',
                data: {
                    idcompra: data.compra_id
                }
            }).done(function(resp) {
              //  alert(resp);
                if (resp > 0) {
                    Swal.fire("Mensaje de confirmaciòn","Compra anulada","success");
                    t_ingreso.ajax.reload();
                } else {
                    Swal.fire("Mensaje de Error","No se completo la anulación","error");
                }
            })
        }
    })
})




function listar_combo_proveedor() {
    
    $.ajax({
        url: "../controlador/compras/control_combo_proveedor_listar.php",
        type: 'POST',
       
    }).done(function(resp) {
        //alert(resp);
        var data = JSON.parse(resp);
        //console.log(resp);
       var cadena ="<option value=''>Seleccione...</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" +
                 data[i][1] + "-" +data[i][2] +"</option>";
            }
            $('#cmb_proveedor').html(cadena);

        } else {
            cadena += "<option value=''> No Hay datos</option>";
            $('#cmb_proveedor').html(cadena);

        }
    })
}




function listar_combo_producto() {
    
    $.ajax({
        url: "../controlador/compras/control_combo_producto_listar.php",
        type: 'POST',
       
    }).done(function(resp) {
        //alert(resp);
        var data = JSON.parse(resp);
        //console.log(resp);
       var cadena ="<option value=''>Seleccione...</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" +
                 data[i][1] + "-" +data[i][2] +"</option>";
            }
            $('#cmb_producto').html(cadena);

        } else {
            cadena += "<option value=''> No Hay datos</option>";
            $('#cmb_producto').html(cadena);

        }
    })
}


function Agregar_Producto_Detalle_Ingreso() {
    let idproducto = document.getElementById('cmb_producto').value;
    let producto = $("#cmb_producto option:selected").text();
    let cantidad = document.getElementById('txt_cantidad').value;
    let precio = document.getElementById('txt_precio').value;
    let impuesto = document.getElementById('txt_impuesto').value;
    let dcto = document.getElementById('txt_descto').value;


    let tipo = document.getElementById('cmb_tipo_comprobante').value;
    if (tipo == "FACTURA") {
        if (impuesto.length == 0) {
            return Swal.fire("Mensaje de advertencia", "Debe digitar el valor del impuesto, antes de agregar", "warning");
        }


        if (impuesto > 1.00) {
            return Swal.fire("Mensaje de advertencia", "El % de IVA,  no se puede asignar", "warning");
        }
    }


    if (impuesto > 1.00) {
        return Swal.fire("Mensaje de advertencia", "El % de IVA,  no se puede asignar", "warning");
    }

    let subtotal = precio * cantidad;
    let valordcto  = (subtotal *dcto)/100;
    let st2 = subtotal - valordcto;
     let valoriva  = (st2 *impuesto)
     let neto_total  = st2 + valoriva;

    if (cantidad.length == 0 || precio.length == 0) {
        return Swal.fire("Mensaje de advertencia", "Debe digitar precio y cantidad", "warning");
    }


    if (parseFloat(precio) < 1) {
        return Swal.fire("Mensaje de advertencia", "La cantidad debe ser mayor a cero", "warning");
    }


    if (parseFloat(precio) < 0) {
        return Swal.fire("Mensaje de advertencia", "El precio debe ser mayor a cero", "warning");
    }


    if (verificarid(idproducto)) {
        return Swal.fire("Mensaje de advertencia", "El producto ya fue asignado a la tabla", "warning");
    }




    let datos_agregar = "<tr>";
    datos_agregar += "<td for='id'>" + idproducto + "</td>";
    datos_agregar += "<td>" + producto + "</td>";
    datos_agregar += "<td>" + cantidad + "</td>";
    datos_agregar += "<td>" + precio + "</td>";
    datos_agregar += "<td>" + subtotal + "</td>";
    datos_agregar += "<td>" + valordcto + "</td>";
    datos_agregar += "<td>" + valoriva + "</td>";
    datos_agregar += "<td><button class='btn btn-danger' onclick='remove(this)'><i class='fa fa-trash'></i></button></td>";
    
    datos_agregar += "</tr>";
    $("#tb_detalle_ingreso").append(datos_agregar);
    SumarTotalneto();
}

function verificarid(id) {
    let idverificar = document.querySelectorAll('#tabla_ingreso td[for="id"]');
    return [].filter.call(idverificar, td => td.textContent === id).length === 1;
}


function remove(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    SumarTotalneto();
}

function SumarTotalneto() {
    let arreglo_total = new Array();
    let arreglo_tdcto = new Array();
    let arreglo_iva = new Array();
    let count = 0;
    let total = 0;
    let valoriva = 0;
    let subtotal = 0;
    let valordcto =0;
    let neto  =0;
    let impuesto = document.getElementById('txt_impuesto').value;
    let dcto = document.getElementById('txt_descto').value;
    $("#detalle_ingreso tbody#tb_detalle_ingreso tr").each(function() {
        arreglo_total.push($(this).find('td').eq(4).text());
        arreglo_tdcto.push($(this).find('td').eq(5).text());
        arreglo_iva.push($(this).find('td').eq(6).text());
        count++;
      
    })

    for (var i = 0; i < count; i++) {
        var suma = arreglo_total[i];
       var suma_desc = arreglo_tdcto[i];

       var suma_iva = arreglo_iva[i];
        subtotal = (parseFloat(subtotal) + parseFloat(suma)).toFixed(2);
        //  total =(parseFloat(total)+parseFloat(suma)).toFixed(2);
        valordcto = (parseFloat(valordcto) + parseFloat(suma_desc)).toFixed(2);
        valoriva = (parseFloat(valoriva) + parseFloat(suma_iva)).toFixed(2);
   // alert( valordcto);
        
    };
    total = parseFloat(subtotal - valordcto) + parseFloat(valoriva);
    
    let tipo = document.getElementById('cmb_tipo_comprobante').value;
    if (tipo == "FACTURA") {
        $("#lbl_subtotal").html("<b> Sub total: </b> $/." + subtotal);
        $("#lbl_decto").html("<b> Dcto:" + dcto * 100 + "% </b> $/." + valordcto);
        $("#lbl_impuesto").html("<b> IVA:" + impuesto * 100 + "% </b> $/." + valoriva );
        
        $("#lbl_totalneto").html("<b>Total: </b> $/." + total.toFixed(2));
    } else {
        $("#lbl_totalneto").html("<b>Total: </b> $/." + total.toFixed(2));
    }

    //  $("#lbl_subtotal").html("<b> Sub total: </b> $."+subtotal);
    // $("#lbl_impuesto").html("<b> IVA:"+impuesto* 100+"% </b> $."+impuestototal);
    //  $("#lbl_totalneto").html("<b>Total: </b> $."+total.toFixed(2));
}

function Registrar_Compra() {
    let count = 0;
    $("#detalle_ingreso tbody#tb_detalle_ingreso tr").each(function() {

        count++;
    })

    if (count == 0) {
        return Swal.fire("Mensaje de Error", "El detalle de la compra debe tener por lo menos un producto",
            "warning");
    }

    let fecha_compra = document.getElementById('txt_fecha').value;
    let idproveedor = document.getElementById('cmb_proveedor').value;
   
    let idusuario = document.getElementById('txtidprincipal').value;
    
    let tipo_comprobante = document.getElementById('cmb_tipo_comprobante').value;
    let serie_comprobante = document.getElementById('txt_serie').value;
    let num_comprobante = document.getElementById('txt_no_comprobante').value;
    let tipo_pago = document.getElementById('cmb_tipo_pago').value;
   
    let total = document.getElementById('lbl_totalneto').innerHTML.substr(18);
    let estado = document.getElementById('cmb_estado').value;
    let decto = document.getElementById('lbl_decto').innerHTML.substr(20);
   
 
    let impuesto = "";
    let porcentaje = "";
    if (tipo_comprobante == "FACTURA") {
        decto = document.getElementById('lbl_decto').innerHTML.substr(22);
        impuesto = document.getElementById('lbl_impuesto').innerHTML.substr(20);
        porcentaje_imp = document.getElementById('txt_impuesto').value;
    } else {
        impuesto = "";
        porcentaje_imp = "";
    }
    $.ajax({
        url: '../controlador/compras/control_compras_registro.php',
        type: 'POST',
        data: {
            fecha_compra:fecha_compra,
            idproveedor: idproveedor,
            tipo_comprobante: tipo_comprobante,
            serie_comprobante: serie_comprobante,
            num_comprobante: num_comprobante,
            idusuario: idusuario,
            tipo_pago: tipo_pago,
            impuesto: impuesto,
            porcentaje_imp: porcentaje_imp,
            total: total,
            decto:decto,
            estado: estado

        }
    }).done(function(resp) {
      alert(resp);
        if (resp > 0) {
            Registrar_Detalle_Ingreso(parseInt(resp));
        } else {
            Swal.fire("Mensaje de Error","Numero de factura ya existe","error");
        }
    })



}

function Registrar_Detalle_Ingreso(id){
    let count =0;
      let arreglo_producto = new Array();
      let arreglo_cantidad = new Array();
      let arreglo_precio = new Array();
      let arreglo_dcto = new Array();

       $("#detalle_ingreso tbody#tb_detalle_ingreso tr").each(function() {
        arreglo_producto.push($(this).find('td').eq(0).text());
        arreglo_cantidad.push($(this).find('td').eq(2).text());
        arreglo_precio.push($(this).find('td').eq(3).text());
        arreglo_dcto.push($(this).find('td').eq(5).text());
        count++;
    })

     if (count == 0) {
        return Swal.fire("Mensaje de Error", "El detalle de la compra debe tener por lo menos un producto",
            "warning");
    }

    let producto  = arreglo_producto.toString();
    let cantidad  = arreglo_cantidad.toString();
    let precio  = arreglo_precio.toString();
    let dcto  = arreglo_dcto.toString();

     $.ajax({
        url: '../controlador/compras/control_compra_registro_detalle.php',
        type: 'POST',
        data: {
            id: id,
            producto: producto,
            cantidad: cantidad,
            precio: precio,
            dcto:dcto
           

        }
    }).done(function(resp) {
       alert(resp);
        if (resp > 0) {
           Swal.fire({
              title: 'Datos de confirmaciòn?',
              text: "Compra registrada correctamente",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Imprimir Reporte'
            }).then((result) => {
                LimpiarCampos();
              if (result.value) {
                window.open("../mpdf/reporte_compras.php?codigo="+parseInt(id)+"zoom=100","Reporte de Compra","scrollbards=NO");
              $("#contenido_principal").load("../vista/ingreso/vista_mantenimiento_ingreso.php");
              } else {
                   $("#contenido_principal").load("../vista/ingreso/vista_mantenimiento_ingreso.php");
              }
            })
        } else {
            Swal.fire("Mensaje de Error","El registro no se completo","error");
        }
    })



}


 function LimpiarCampos() {

    $('#txt_cantidad').val("");
       $('#txt_precio').val("");
       $('#txt_impuesto').val("");
       $('#txt_descto').val("");
    }