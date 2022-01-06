<?php 

require_once __DIR__ . '/../vendor/autoload.php';
require_once '../../../conexion_reporte/r_conexion.php';
$consulta = "SELECT	c.cita_id, 	c.cita_nroatencion, 
	c.cita_feregistro, 	CONCAT_WS(' ',	m.medico_nombre, m.medico_apepat,m.medico_apemat) as medico,
 	CONCAT_WS(' ' ,p.paciente_nombre, p.paciente_apepat,p.paciente_apemat) as  paciente,
	c.cita_descripcion, c.cita_estatus, 	esp.especialidad_nombre
	FROM 	cita AS c
	INNER JOIN	medico AS m
	ON 		c.medico_id = m.medico_id
	INNER JOIN	paciente AS p
	ON 		c.paciente_id = p.paciente_id
	INNER JOIN	especialidad AS esp
	ON 		m.especialidad_id = esp.especialidad_id
	where cita_id='".$_GET['id']."'";
$html="
	<style>
	.barcode {
	    padding: 1.5mm;
	    margin: 0;
	    vertical-align: top;
	    color: #000;
	}
	.barcodecell {
	    text-align: center;
	    vertical-align: middle;
	}
	</style>



<table style='border-collapse:collapse' border='1'>
	<tr>
		<td><h3 style='font-size:18px;'>DATOS DE LA CITA </h3></td>
	</tr>
</table>";

$resultado =$mysqli->query($consulta);
while($row =$resultado->fetch_assoc()) {
	$html.="<br><b>N&uacute;mero de Atenci&oacute;n</b>:".$row['cita_nroatencion']."
		<br><b>Paciente: </b><br>".$row['paciente']."<br>
		<b>Medico:</b><br>".$row['medico']."<br>
		<b>Especialidad:</b><br>".$row['especialidad_nombre']."<br>
		<b>Descripci&oacute;n:</b><br>".$row['cita_descripcion']."<br>
		<b>Estado:</b><br>".$row['cita_estatus']."<br>
		    ------------------------------------------
		    !Gracias por utilizar nuestros servicios!
		    Tel:_________________.   Correo:________________
	     <div class='barcodecell'><barcode code='".$row['cita_id']."' type='I25' class='barcode' /><br>".$row['cita_id']."</div>";
}

$mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => [80, 150]]);
$html = mb_convert_encoding($html, 'UTF-8', 'UTF-8');
$mpdf->WriteHTML($html);
$mpdf->Output();













 ?>