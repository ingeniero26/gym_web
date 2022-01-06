SELECT  * FROM rol

CREATE  PROCEDURE `SP_MODIFICAR_ESTATUS_PERSONA`(IN IDPERSONA INT,
    IN ESTATUS VARCHAR(20))
    
    
UPDATE rol SET 
estatus = 'ACTIVO' 
WHERE id = '1'



CREATE  PROCEDURE `SP_REGISTRAR_ROL`(IN NOMBRE VARCHAR(100))
BEGIN

DECLARE CANTIDADME INT;

    SET @CANTIDADME:=(SELECT COUNT(*) FROM rol WHERE descripcion =NOMBRE
    );
    IF @CANTIDADME = 0 THEN
        
        INSERT INTO rol(descripcion, estatus)
        VALUES(NOMBRE,'ACTIVO');
        SELECT 1;
    ELSE
    SELECT 2;
  
  
END IF;

END


CREATE  PROCEDURE `SP_REGISTRAR_MEDIDA`(IN NOMBRE VARCHAR(100), IN ABRE CHAR(10))
BEGIN

DECLARE CANTIDADME INT;

    SET @CANTIDADME:=(SELECT COUNT(*) FROM medida WHERE nombre_med =NOMBRE
    );
    IF @CANTIDADME = 0 THEN
        
        INSERT INTO medida(nombre_med, abreviatura, estatus)
        VALUES(NOMBRE,ABRE,'ACTIVO');
        SELECT 1;
    ELSE
    SELECT 2;
  
  
END IF;

END




CREATE  PROCEDURE `SP_MODIFICAR_ROL`(IN `IDROL` INT, 
IN `ROL_ACTUAL` VARCHAR(250), 
IN `ROL_NUEVO` VARCHAR(250), IN `ESTATUS` VARCHAR(15))
BEGIN
DECLARE CANTIDAD INT;
IF ROL_ACTUAL = ROL_NUEVO THEN
	UPDATE rol SET
	estatus=ESTATUS
	WHERE id = IDROL;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM rol WHERE `descripcion`=ROL_NUEVO);
IF  @CANTIDAD = 0 THEN
UPDATE rol SET

`descripcion`=ROL_NUEVO,
estatus=ESTATUS

WHERE id = IDROL;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END


SELECT
    `usuarios`.`usuario_id`
    , `usuarios`.`usuario_nombre`
    , `usuarios`.`usuario_password`
    , `usuarios`.`rol_id`
    , `rol`.`descripcion`
    , `usuarios`.`usuario_email`
    , `usuarios`.`usuario_estatus`
    , `usuarios`.`usuario_intento`
    , `usuarios`.`usuario_imagen`
    , `usuarios`.`fregistro`
FROM
    `usuarios`
    INNER JOIN `rol` 
        ON (`usuarios`.`rol_id` = `rol`.`id`)


SELECT  * FROM rol WHERE estatus ='ACTIVO'







CREATE PROCEDURE `SP_REGISTRAR_USUARIO`(IN USUARIO VARCHAR(100), IN PASS VARCHAR(250),IN IDROL INT, IN CORREO VARCHAR(100),
 IN RUTA VARCHAR(255))
BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuario WHERE usuario_nombre =USUARIO 
OR usuario_email =CORREO);
IF @CANTIDAD =0 THEN
INSERT INTO `usuario` (`usuario_nombre`,`usuario_password`,`rol_id`, `usuario_email`, `usuario_estatus`,`usuario_intento`,  
`usuario_imagen`) VALUES(USUARIO,PASS,IDROL,CORREO,'ACTIVO',0,RUTA);
SELECT 1;
ELSE 
SELECT 2;
END IF;

END








/* modificar medidas*/
CREATE  PROCEDURE `SP_MODIFICAR_MEDIDA`(IN `IDMEDIDA` INT, 
IN `MEDIDA_ACTUAL` VARCHAR(250), 
IN `MEDIDA_NUEVO` VARCHAR(250), IN ABREVIATURA CHAR(10), IN `ESTATUS` VARCHAR(15))
BEGIN
DECLARE CANTIDAD INT;
IF MEDIDA_ACTUAL = MEDIDA_NUEVO THEN
    UPDATE medida SET
    abreviatura=ABREVIATURA,
    estatus=ESTATUS
    WHERE id = IDMEDIDA;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM medida WHERE `nombre_med`=ROL_NUEVO);
IF  @CANTIDAD = 0 THEN
UPDATE medida SET

`nombre_med`=MEDIDA_NUEVO,
abreviatura=ABREVIATURA,
    estatus=ESTATUS
    WHERE id = IDMEDIDA;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END













CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_PRODUCTO`(IN COD_PROD VARCHAR(100),IN DESC_PROD VARCHAR(500), 

IN IDCATEGORIA int,IN IDUNIDAD INT, IN PRECIO DECIMAL,IN RUTA VARCHAR(255))
BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM producto WHERE codigo =COD_PROD OR descripcion =DESC_PROD);
IF @CANTIDAD =0 THEN
INSERT INTO `producto` (`codigo`,`descripcion`,`idcategoria`, `idmedida`, `precio`,stock, `foto`, 
`estatus`) VALUES(COD_PROD,DESC_PROD, IDCATEGORIA,IDUNIDAD,PRECIO,0, RUTA,'ACTIVO');
SELECT 1;
ELSE 
SELECT 2;
END IF;
END





SELECT  dp.id,  dp.idTipoDocumento, 
    td.descripcion,     dp.documento, 
    CONCAT_WS(' ',dp.nombres,   dp.apellidos) as deportista, 
    dp.sexo,    dp.direccion, 
    dp.telefono_fijo,   dp.telefono_movil, 
    dp.fecha_nacimiento,    dp.usuario_id, 
    dp.fregistro,   dp.estatus
FROM
    deportista AS dp
    INNER JOIN  tipo_documento AS td    ON      dp.idTipoDocumento = td.id


    select id, descripcion from
tipo_documento
where estatus ='ACTIVO'


CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_DEPORTISTA`(IN ID_TIPO_DOC INT,IN NUM_DOC VARCHAR(20), 
IN NOMBRE VARCHAR(100), IN APELLIDOS VARCHAR(100),IN SEXO CHAR(2),
IN DIRECCION VARCHAR(200), IN TEL_FIJO VARCHAR(50),
 IN CELULAR CHAR(20), IN FECHANAC DATE, 
  IN USUARIO VARCHAR(20),IN CONTRASENA VARCHAR(250), IN ROL INT, IN EMAIL VARCHAR(255))
BEGIN
DECLARE  CANTIDADU INT;
DECLARE CANTIDADME INT;
SET @CANTIDADU :=(SELECT COUNT(*) FROM usuarios where usuario_nombre =USUARIO or usuario_email = EMAIL);
IF @CANTIDADU = 0 THEN
    SET @CANTIDADME:=(SELECT COUNT(*) FROM deportista where documento =NUM_DOC);
    IF @CANTIDADME = 0 THEN
        INSERT INTO usuarios(usuario_nombre,usuario_password,
        rol_id,usuario_email,usuario_estatus,usuario_intento,usuario_imagen)
        values(USUARIO,CONTRASENA, ROL,EMAIL,'ACTIVO',0,'controlador/usuario/img/avatar.png');
        INSERT INTO deportista(idTipoDocumento,documento,nombres,apellidos,
        sexo, direccion, telefono_fijo,telefono_movil,fecha_nacimiento,
        estatus,usuario_id)
        values(ID_TIPO_DOC,NUM_DOC,NOMBRE,APELLIDOS,SEXO,DIRECCION,TEL_FIJO,CELULAR,
        FECHANAC,'ACTIVO', (select max(usuario_id) from usuarios));
        select 1;
    ELSE
    select 2;
    END IF;
    else 
    select 2;
END IF;

END



SELECT  dp.id,  dp.idTipoDocumento, 
    td.descripcion,     dp.documento, 
    dp.nombres,     dp.apellidos ,
    dp.sexo,    dp.direccion,   dp.telefono_fijo, 
    dp.telefono_movil,  dp.fecha_nacimiento, 
    dp.usuario_id,  usuarios.usuario_nombre,    usuarios.usuario_email, 
    dp.fregistro,   dp.estatus, 
    usuarios.rol_id,    rol.descripcion as rol
FROM
    deportista AS dp
    INNER JOIN  tipo_documento AS td    ON      dp.idTipoDocumento = td.id
    INNER JOIN  usuarios    ON      dp.usuario_id = usuarios.usuario_id
    INNER JOIN  rol ON      usuarios.rol_id = rol.id





    /* modificar medidas*/
CREATE  PROCEDURE `SP_MODIFICAR_ENTRENADOR`(IN `IDENTRENADOR` INT, IN IDTIPO_DOC INT,
IN `DOC_ACTUAL` VARCHAR(250), IN `DOC_NUEVO` VARCHAR(250), 
IN `NOMBRE` VARCHAR(250), IN APELLIDOS VARCHAR(100), IN TELEFONO VARCHAR(50), IN DIRECCION VARCHAR(100), IN FECHA_NAC DATE)
BEGIN
DECLARE CANTIDAD INT;
IF DOC_ACTUAL = DOC_NUEVO THEN
    UPDATE entrenador SET
    entrenador.IdTipoDocumento=IDTIPO_DOC,
    entrenador.Nombres =NOMBRE,
        entrenador.Apellidos =APELLIDOS,
        entrenador.Telefono =TELEFONO,
        entrenador.Direccion = DIRECCION,
        entrenador.FechaNacimiento =FECHA_NAC
    WHERE id = IDENTRENADOR;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM entrenador WHERE entrenador.Documento=DOC_NUEVO);
IF  @CANTIDAD = 0 THEN

 UPDATE entrenador SET
    entrenador.IdTipoDocumento=IDTIPO_DOC,
        entrenador.Documento =DOCUMENTO,
    entrenador.Nombres =NOMBRE,
        entrenador.Apellidos =APELLIDOS,
        entrenador.Telefono =TELEFONO,
        entrenador.Direccion = DIRECCION,
        entrenador.FechaNacimiento =FECHA_NAC
    WHERE id = IDENTRENADOR;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END



CREATE  PROCEDURE `SP_MODIFICAR_CONTRASENA_USUARIO`(IN IDUSUARIO INT, IN CONTRA VARCHAR(250))
UPDATE usuarios set 
usuario_password = CONTRA 
where usuario_id = IDUSUARIO



SELECT
    pr.IDProveedor,     pr.IDTipoDocumento, 
    td.descripcion,     pr.Documento, 
    pr.NombreComercial,     pr.NombreContacto, 
    pr.ApellidoContacto,    pr.Direccion, 
    pr.Telefono,    pr.Correo, 
    pr.fregistro,   pr.estatus
FROM    proveedor
AS pr   INNER JOIN  tipo_documento AS td    ON          pr.IDTipoDocumento = td.id