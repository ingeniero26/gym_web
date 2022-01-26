var t_ingreso;

function listar_ventas() {
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    
  //alert(finicio +" " +ffin);
    t_ingreso = $("#tabla_ventas").DataTable({
        "ordering": false,
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "responsive": true,
        "autoWidth": false,
        "ajax": {
            "method": "POST",
            "url": "../controlador/ventas/control_ventas_listar.php",
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
            { "data": "deportista" },
            { "data": "tipo_comprobante" },
            { "data": "serie_factura" },
            { "data": "noComprobante" },
            { "data": "tipo_pago" },
            { "data": "impuesto" },
            { "data": "porc_impuesto" },
            { "data": "TotalVenta" },
        
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