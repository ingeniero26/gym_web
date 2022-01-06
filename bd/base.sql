/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100406
 Source Host           : localhost:3306
 Source Schema         : db_gym2

 Target Server Type    : MySQL
 Target Server Version : 100406
 File Encoding         : 65001

 Date: 06/01/2022 15:29:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categoria
-- ----------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion_cat` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categoria
-- ----------------------------
INSERT INTO `categoria` VALUES (1, 'Endulzantes', '2021-12-13 17:26:10', 'ACTIVO');
INSERT INTO `categoria` VALUES (2, 'Probadores ', '2021-12-13 18:11:57', 'ACTIVO');

-- ----------------------------
-- Table structure for clienteplan
-- ----------------------------
DROP TABLE IF EXISTS `clienteplan`;
CREATE TABLE `clienteplan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `IDDeportista` int NULL DEFAULT NULL,
  `IDPlan` int NULL DEFAULT NULL,
  `FechaCompra` date NULL DEFAULT NULL,
  `FechaVencimiento` date NULL DEFAULT NULL,
  `UtilizacionesPendientes` int NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDDeportista`(`IDDeportista`) USING BTREE,
  INDEX `IDPlan`(`IDPlan`) USING BTREE,
  CONSTRAINT `clienteplan_ibfk_1` FOREIGN KEY (`IDDeportista`) REFERENCES `deportista` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `clienteplan_ibfk_2` FOREIGN KEY (`IDPlan`) REFERENCES `plan` (`IDPlan`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clienteplan
-- ----------------------------

-- ----------------------------
-- Table structure for compra
-- ----------------------------
DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra`  (
  `IDCompra` int NOT NULL AUTO_INCREMENT,
  `Fecha` datetime(0) NULL DEFAULT NULL,
  `IDProveedor` int NULL DEFAULT NULL,
  `TotalCompra` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`IDCompra`) USING BTREE,
  INDEX `IDProveedor`(`IDProveedor`) USING BTREE,
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`IDProveedor`) REFERENCES `proveedor` (`IDProveedor`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of compra
-- ----------------------------

-- ----------------------------
-- Table structure for compra_detalle
-- ----------------------------
DROP TABLE IF EXISTS `compra_detalle`;
CREATE TABLE `compra_detalle`  (
  `IDCompraDetalle` int NOT NULL AUTO_INCREMENT,
  `IDCompra` int NULL DEFAULT NULL,
  `IDProducto` int NULL DEFAULT NULL,
  `Descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Precio` decimal(10, 2) NULL DEFAULT NULL,
  `Cantidad` float NULL DEFAULT NULL,
  PRIMARY KEY (`IDCompraDetalle`) USING BTREE,
  INDEX `IDCompra`(`IDCompra`) USING BTREE,
  INDEX `IDProducto`(`IDProducto`) USING BTREE,
  CONSTRAINT `compra_detalle_ibfk_1` FOREIGN KEY (`IDCompra`) REFERENCES `compra` (`IDCompra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compra_detalle_ibfk_2` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of compra_detalle
-- ----------------------------

-- ----------------------------
-- Table structure for deportista
-- ----------------------------
DROP TABLE IF EXISTS `deportista`;
CREATE TABLE `deportista`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idTipoDocumento` int NOT NULL,
  `documento` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nombres` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sexo` enum('M','F') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `direccion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `telefono_fijo` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `telefono_movil` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fecha_nacimiento` date NULL DEFAULT NULL,
  `usuario_id` int NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `documento`(`documento`) USING BTREE,
  UNIQUE INDEX `usuario_id`(`usuario_id`) USING BTREE,
  INDEX `idTipoDocumento`(`idTipoDocumento`) USING BTREE,
  CONSTRAINT `deportista_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deportista_ibfk_2` FOREIGN KEY (`idTipoDocumento`) REFERENCES `tipo_documento` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of deportista
-- ----------------------------
INSERT INTO `deportista` VALUES (1, 1, '1070813753', 'JERSON DANIEL', 'BATISTA VEGA', 'M', 'KRA 45', '121321321', '32568888', '1989-05-26', 1, '2021-12-29 19:57:35', 'ACTIVO');
INSERT INTO `deportista` VALUES (2, 1, '123456789', 'KAREN', 'VEGA TORRES', 'F', 'HJ45', '13213213', '13213132', '2021-12-23', 5, '2021-12-29 19:26:21', 'ACTIVO');
INSERT INTO `deportista` VALUES (3, 2, '107487555', 'YELENIS', 'Salas', 'F', 'BOGOTA', '132132132132', '46546546', '2021-12-22', 6, '2021-12-29 19:50:28', 'ACTIVO');
INSERT INTO `deportista` VALUES (4, 1, '1247888', 'PRUEBA', 'BATISTA', 'F', '34RRR', '4345', '43545', '2021-12-23', 7, '2022-01-04 14:35:03', 'ACTIVO');

-- ----------------------------
-- Table structure for deportistarutina
-- ----------------------------
DROP TABLE IF EXISTS `deportistarutina`;
CREATE TABLE `deportistarutina`  (
  `IDDeportistaRutina` int NOT NULL AUTO_INCREMENT,
  `IDDeportista` int NULL DEFAULT NULL,
  `IDRutina` int NULL DEFAULT NULL,
  PRIMARY KEY (`IDDeportistaRutina`) USING BTREE,
  INDEX `IDDeportista`(`IDDeportista`) USING BTREE,
  INDEX `IDRutina`(`IDRutina`) USING BTREE,
  CONSTRAINT `deportistarutina_ibfk_1` FOREIGN KEY (`IDDeportista`) REFERENCES `deportista` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `deportistarutina_ibfk_2` FOREIGN KEY (`IDRutina`) REFERENCES `rutina` (`IDRutina`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of deportistarutina
-- ----------------------------

-- ----------------------------
-- Table structure for entrenador
-- ----------------------------
DROP TABLE IF EXISTS `entrenador`;
CREATE TABLE `entrenador`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `IdTipoDocumento` int NULL DEFAULT NULL,
  `Documento` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Nombres` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Telefono` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `FechaNacimiento` date NULL DEFAULT NULL,
  `usuario_id` int NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Documento`(`Documento`) USING BTREE,
  INDEX `IdTipoDocumento`(`IdTipoDocumento`) USING BTREE,
  INDEX `usuario_id`(`usuario_id`) USING BTREE,
  CONSTRAINT `entrenador_ibfk_1` FOREIGN KEY (`IdTipoDocumento`) REFERENCES `tipo_documento` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `entrenador_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of entrenador
-- ----------------------------
INSERT INTO `entrenador` VALUES (1, 1, '1070813753', 'JERSON DANIEL', ' VEGA', '3017532666', 'EL CENTRO', '2021-12-29', 1, '2021-12-29 20:35:09', 'ACTIVO');

-- ----------------------------
-- Table structure for espacio
-- ----------------------------
DROP TABLE IF EXISTS `espacio`;
CREATE TABLE `espacio`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `capacidad` int NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of espacio
-- ----------------------------

-- ----------------------------
-- Table structure for medida
-- ----------------------------
DROP TABLE IF EXISTS `medida`;
CREATE TABLE `medida`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_med` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `abreviatura` char(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medida
-- ----------------------------
INSERT INTO `medida` VALUES (1, 'UNIDAD', 'UN', '2021-12-14 20:21:01', 'ACTIVO');
INSERT INTO `medida` VALUES (2, 'KILO ', 'KG', '2021-12-15 10:21:00', 'ACTIVO');
INSERT INTO `medida` VALUES (3, 'ONZAS', 'ON', '2022-01-04 15:20:44', 'ACTIVO');

-- ----------------------------
-- Table structure for plan
-- ----------------------------
DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan`  (
  `IDPlan` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `PorTiempo` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `NumeroRepeticiones` int NULL DEFAULT NULL,
  `Valor` decimal(10, 0) NULL DEFAULT NULL,
  `Observaciones` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`IDPlan`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of plan
-- ----------------------------

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `idcategoria` int NOT NULL,
  `idmedida` int NOT NULL,
  `precio` decimal(10, 2) NOT NULL,
  `stock` double NOT NULL,
  `foto` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idcategoria`(`idcategoria`) USING BTREE,
  INDEX `idmedida`(`idmedida`) USING BTREE,
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idmedida`) REFERENCES `medida` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, '0001', 'PRODUCTO DE PRUEBA', 1, 1, 1500.00, 0, 'controlador/productos/img/1.jpg', '2021-12-19 13:18:16', 'ACTIVO');
INSERT INTO `producto` VALUES (2, '3434234', 'PROBANDO', 2, 1, 200.00, 0, 'controlador/productos/img/IMG1912202121125.png', '2022-01-06 11:45:29', 'ACTIVO');
INSERT INTO `producto` VALUES (3, '9999999993434', 'PRODUCTO PARA GYM', 1, 1, 251000.00, 0, 'controlador/productos/img/IMG1912202121015.jpg', '2022-01-04 14:43:50', 'ACTIVO');

-- ----------------------------
-- Table structure for programacion
-- ----------------------------
DROP TABLE IF EXISTS `programacion`;
CREATE TABLE `programacion`  (
  `idProgramacion` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `idEspacio` int NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idProgramacion`) USING BTREE,
  INDEX `idEspacio`(`idEspacio`) USING BTREE,
  CONSTRAINT `programacion_ibfk_1` FOREIGN KEY (`idEspacio`) REFERENCES `espacio` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of programacion
-- ----------------------------

-- ----------------------------
-- Table structure for programacion_detalle
-- ----------------------------
DROP TABLE IF EXISTS `programacion_detalle`;
CREATE TABLE `programacion_detalle`  (
  `idProgramacionDetalle` int NOT NULL AUTO_INCREMENT,
  `idProgramacion` int NULL DEFAULT NULL,
  `DiaSemana` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `HoraInicial` datetime(0) NULL DEFAULT NULL,
  `HoraFinal` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idProgramacionDetalle`) USING BTREE,
  INDEX `idProgramacion`(`idProgramacion`) USING BTREE,
  CONSTRAINT `programacion_detalle_ibfk_1` FOREIGN KEY (`idProgramacion`) REFERENCES `programacion` (`idProgramacion`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of programacion_detalle
-- ----------------------------

-- ----------------------------
-- Table structure for proveedor
-- ----------------------------
DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor`  (
  `IDProveedor` int NOT NULL AUTO_INCREMENT,
  `IDTipoDocumento` int NULL DEFAULT NULL,
  `Documento` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `NombreComercial` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `NombreContacto` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `ApellidoContacto` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Telefono` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Correo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`IDProveedor`) USING BTREE,
  UNIQUE INDEX `Documento`(`Documento`) USING BTREE,
  INDEX `IDTipoDocumento`(`IDTipoDocumento`) USING BTREE,
  CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`IDTipoDocumento`) REFERENCES `tipo_documento` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of proveedor
-- ----------------------------
INSERT INTO `proveedor` VALUES (1, 2, '13123132132', 'UNISOFT', 'JERSON', 'BATISTA', 'CALLE 26', '7844444', 'sistemas123@gmail.com', '2022-01-06 11:31:42', 'ACTIVO');
INSERT INTO `proveedor` VALUES (2, 2, '47888888', 'UNISOFT', 'JERSON', 'BATISTA', 'CALLE 26', '7844444', 'sistemas123@gmail.com', '2022-01-06 11:31:42', 'ACTIVO');
INSERT INTO `proveedor` VALUES (3, 2, '478544444', 'UNISOFT', 'JERSON', 'BATISTA', 'CALLE 26', '7844444', 'sistemas123@gmail.com', '2022-01-06 11:31:42', 'ACTIVO');

-- ----------------------------
-- Table structure for reserva
-- ----------------------------
DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva`  (
  `idReserva` int NOT NULL AUTO_INCREMENT,
  `idDeportista` int NULL DEFAULT NULL,
  `idProgramacionDetalle` int NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `estatus` enum('AGENDADA','ATENDIDA','CANCELADA') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idReserva`) USING BTREE,
  INDEX `idDeportista`(`idDeportista`) USING BTREE,
  INDEX `idProgramacionDetalle`(`idProgramacionDetalle`) USING BTREE,
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`idDeportista`) REFERENCES `deportista` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`idProgramacionDetalle`) REFERENCES `programacion_detalle` (`idProgramacionDetalle`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reserva
-- ----------------------------

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO `rol` VALUES (1, 'Administrador', '2021-12-10 13:31:24', 'ACTIVO');
INSERT INTO `rol` VALUES (2, 'Deportista', '2021-12-09 09:02:03', 'ACTIVO');
INSERT INTO `rol` VALUES (3, 'Entrenador', '2021-12-27 11:10:05', 'ACTIVO');
INSERT INTO `rol` VALUES (4, 'Invitado', '2021-12-27 11:10:11', 'ACTIVO');

-- ----------------------------
-- Table structure for rutina
-- ----------------------------
DROP TABLE IF EXISTS `rutina`;
CREATE TABLE `rutina`  (
  `IDRutina` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`IDRutina`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rutina
-- ----------------------------

-- ----------------------------
-- Table structure for rutina_detalle_ejercicio
-- ----------------------------
DROP TABLE IF EXISTS `rutina_detalle_ejercicio`;
CREATE TABLE `rutina_detalle_ejercicio`  (
  `IDRutinaDetalleEjercicio` int NOT NULL AUTO_INCREMENT,
  `IDRutinaDetalle` int NULL DEFAULT NULL,
  `Descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Observacion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`IDRutinaDetalleEjercicio`) USING BTREE,
  INDEX `IDRutinaDetalle`(`IDRutinaDetalle`) USING BTREE,
  CONSTRAINT `rutina_detalle_ejercicio_ibfk_1` FOREIGN KEY (`IDRutinaDetalle`) REFERENCES `rutinadetalle` (`IDRutinaDetalle`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rutina_detalle_ejercicio
-- ----------------------------

-- ----------------------------
-- Table structure for rutinadetalle
-- ----------------------------
DROP TABLE IF EXISTS `rutinadetalle`;
CREATE TABLE `rutinadetalle`  (
  `IDRutinaDetalle` int NOT NULL AUTO_INCREMENT,
  `IDRutina` int NULL DEFAULT NULL,
  `Lunes` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Martes` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Miercoles` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Jueves` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Viernes` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Sabado` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Domingo` enum('SI','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`IDRutinaDetalle`) USING BTREE,
  INDEX `IDRutina`(`IDRutina`) USING BTREE,
  CONSTRAINT `rutinadetalle_ibfk_1` FOREIGN KEY (`IDRutina`) REFERENCES `rutina` (`IDRutina`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rutinadetalle
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_documento
-- ----------------------------
DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_nopad_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_nopad_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_nopad_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_documento
-- ----------------------------
INSERT INTO `tipo_documento` VALUES (1, 'Cedula', '2021-12-22 09:43:14', 'ACTIVO');
INSERT INTO `tipo_documento` VALUES (2, 'NIT', '2021-12-22 09:43:28', 'ACTIVO');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `usuario_password` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `rol_id` int NULL DEFAULT NULL,
  `usuario_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `usuario_estatus` enum('ACTIVO','INACTIVO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `usuario_intento` int NULL DEFAULT NULL,
  `usuario_imagen` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `fregistro` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`usuario_id`) USING BTREE,
  UNIQUE INDEX `usuario_nombre`(`usuario_nombre`) USING BTREE,
  UNIQUE INDEX `usuario_email`(`usuario_email`) USING BTREE,
  INDEX `rol_id`(`rol_id`) USING BTREE,
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'admin', '$2y$10$ZwgYDH3TrqhqlsPqx1aytOGJGWE4WFYuSdBoDaRp6W5H1Gnp72g/.', 1, 'ingjerson2014@gmail.com', 'ACTIVO', 0, 'controlador/usuario/img/IMG131220219338.jpeg', '2022-01-03 12:55:31');
INSERT INTO `usuarios` VALUES (2, 'probando200', '123', 2, 'info@gmail.com', 'ACTIVO', 0, 'controlador/usuario/img/avatar.png', '2021-12-11 13:55:45');
INSERT INTO `usuarios` VALUES (3, 'karen', '$2y$10$Azu1On2rp1B3a5rEX27yUOrdptna7Fm2E49F.q9/7qzRA9MyEGbGS', 2, 'prueba201@gmail.com', 'ACTIVO', 0, 'controlador/usuario/img/IMG11122021124619.png', '2021-12-11 13:55:53');
INSERT INTO `usuarios` VALUES (4, 'denis', '$2y$10$1yhmDhhXVAmRRfO7944hV.MOwmRJLOl0y2J7tJlQCGw8xbTXekV/2', 2, 'denis1@gmail.com', 'ACTIVO', 0, 'controlador/usuario/img/avatar.png', '2021-12-22 13:46:04');
INSERT INTO `usuarios` VALUES (5, 'karen34', '123', 2, 'karen33434@gmail.com', 'ACTIVO', 0, NULL, '2021-12-22 14:08:09');
INSERT INTO `usuarios` VALUES (6, 'yele123', '$2y$10$HL0pL3KgUa5lIQPMA/I0Be4v1MnaQLx8BITg8yCe/QVrzssX/peeK', 2, 'yele123', 'ACTIVO', 0, 'controlador/usuario/img/IMG23122021205828.jpg', '2021-12-23 20:58:28');
INSERT INTO `usuarios` VALUES (7, 'elizabeth', '$2y$10$Il.vysgEDd6oHrckEIBw6uZ/zwjSM/Mh0zF/XSuCfCBB6WPdBjk4u', 2, 'elizabeth@gmail.com', 'ACTIVO', 0, 'controlador/usuario/img/avatar.png', '2021-12-22 14:24:52');

-- ----------------------------
-- Table structure for venta
-- ----------------------------
DROP TABLE IF EXISTS `venta`;
CREATE TABLE `venta`  (
  `IDVenta` int NOT NULL AUTO_INCREMENT,
  `Fecha` datetime(0) NULL DEFAULT NULL,
  `IDDeportista` int NULL DEFAULT NULL,
  `TotalVenta` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`IDVenta`) USING BTREE,
  INDEX `IDDeportista`(`IDDeportista`) USING BTREE,
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`IDDeportista`) REFERENCES `deportista` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of venta
-- ----------------------------

-- ----------------------------
-- Table structure for venta_detalle
-- ----------------------------
DROP TABLE IF EXISTS `venta_detalle`;
CREATE TABLE `venta_detalle`  (
  `IDVentaDetalle` int NOT NULL AUTO_INCREMENT,
  `IDventa` int NULL DEFAULT NULL,
  `IDProducto` int NULL DEFAULT NULL,
  `Descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Precio` decimal(10, 2) NULL DEFAULT NULL,
  `Cantidad` float NULL DEFAULT NULL,
  PRIMARY KEY (`IDVentaDetalle`) USING BTREE,
  INDEX `IDventa`(`IDventa`) USING BTREE,
  INDEX `IDProducto`(`IDProducto`) USING BTREE,
  CONSTRAINT `venta_detalle_ibfk_1` FOREIGN KEY (`IDventa`) REFERENCES `venta` (`IDVenta`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `venta_detalle_ibfk_2` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of venta_detalle
-- ----------------------------

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_CATEGORIA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_CATEGORIA`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_CATEGORIA`(IN `IDCATEGORIA` INT, 
IN `CAT_ACTUAL` VARCHAR(250), 
IN `CAT_NUEVO` VARCHAR(250), IN `ESTATUS` VARCHAR(15))
BEGIN
DECLARE CANTIDAD INT;
IF CAT_ACTUAL = CAT_NUEVO THEN
	UPDATE categoria SET
	estatus=ESTATUS
	WHERE id = IDCATEGORIA;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM categoria WHERE `descripcion_cat`=CAT_NUEVO);
IF  @CANTIDAD = 0 THEN
UPDATE categoria SET

`descripcion_cat`=CAT_NUEVO,
estatus=ESTATUS

WHERE id = IDCATEGORIA;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_CONTRASENA_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_CONTRASENA_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_CONTRASENA_USUARIO`(IN IDUSUARIO INT, IN CONTRA VARCHAR(250))
UPDATE usuarios set 
usuario_password = CONTRA 
where usuario_id = IDUSUARIO
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_DEPORTISTA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_DEPORTISTA`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_DEPORTISTA`(IN IDDEPORTISTA INT, IN ID_TIPO_DOC INT,
IN NUM_DOC_ACTUAL VARCHAR(20),IN NUM_DOC_NUEVO VARCHAR(20),
IN NOMBRE VARCHAR(100), IN APELLIDOS VARCHAR(100),IN SEXO_DEP CHAR(2),
IN DIRECCION_DEP VARCHAR(200), IN TEL_FIJO VARCHAR(50),
 IN CELULAR CHAR(20), IN FECHANAC DATE)
BEGIN
DECLARE CANTIDAD INT;

IF NUM_DOC_ACTUAL= NUM_DOC_NUEVO THEN
		UPDATE deportista set 
		idTipoDocumento=ID_TIPO_DOC,
		nombres= NOMBRE,
		apellidos=APELLIDOS,
		sexo=SEXO_DEP,
		direccion=DIRECCION_DEP,
		telefono_fijo=TEL_FIJO,
		telefono_movil=CELULAR,
		fecha_nacimiento=FECHANAC
	
		WHERE id=IDDEPORTISTA;
select 1;
 ELSE
  SET @CANTIDAD:=(SELECT COUNT(*) FROM deportista where documento =NUM_DOC_NUEVO);
	
	IF @CANTIDAD = 0 THEN 
		 UPDATE deportista set 
			idTipoDocumento=ID_TIPO_DOC,
			documento=NUM_DOC_NUEVO,
		nombres= NOMBRE,
		apellidos=APELLIDOS,
		sexo=SEXO_DEP,
		direccion=DIRECCION_DEP,
		telefono_fijo=TEL_FIJO,
		telefono_movil=CELULAR,
		fecha_nacimiento=FECHANAC
			WHERE id=IDDEPORTISTA;
		select 1;
	ELSE
	select 2;
	
	END IF;
 
 END IF;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_ENTRENADOR
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_ENTRENADOR`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_ENTRENADOR`(IN `IDENTRENADOR` INT, IN IDTIPO_DOC INT,
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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_FOTO_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_FOTO_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_FOTO_USUARIO`(IN IDUSU INT, IN foto VARCHAR(250))
BEGIN 
UPDATE usuarios SET 
usuario_imagen =foto
WHERE usuario_id =IDUSU;
SELECT 1;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_MEDIDA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_MEDIDA`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_MEDIDA`(IN `IDMEDIDA` INT, IN `MEDIDA_ACTUAL` VARCHAR(250), IN `MEDIDA_NUEVO` VARCHAR(250), IN `ABREVIATURA` CHAR(10), IN `ESTATUS` VARCHAR(15))
BEGIN
DECLARE CANTIDAD INT;
IF MEDIDA_ACTUAL = MEDIDA_NUEVO THEN
	UPDATE medida SET
	abreviatura=ABREVIATURA,
	estatus=ESTATUS
	WHERE id = IDMEDIDA;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM medida WHERE `nombre_med`=MEDIDA_NUEVO);
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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_PRODUCTO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_PRODUCTO`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_PRODUCTO`(IN IDPRODUCTO INT, IN COD_CTUAL VARCHAR(100), IN COD_NUEVO VARCHAR(100),IN DESC_ACTUAL VARCHAR(500),DESC_NUEVO VARCHAR(500), IN IDCATEGORIA INT, IN IDMEDIDA INT , IN PRECIO DECIMAL)
BEGIN
DECLARE CANTIDAD INT;

IF COD_CTUAL= COD_NUEVO THEN
		UPDATE producto set 
		descripcion= DESC_NUEVO,
		idcategoria=IDCATEGORIA,
		idmedida=IDMEDIDA,
		precio=PRECIO
		
		WHERE id=IDPRODUCTO;
select 1;
 ELSE
  SET @CANTIDAD:=(SELECT COUNT(*) FROM producto where codigo =COD_NUEVO);
	
	IF @CANTIDAD = 0 THEN 
		 UPDATE producto set 
		 codigo=COD_NUEVO,
			descripcion= DESC_NUEVO,
	  	idcategoria=IDCATEGORIA,
		 idmedida=IDMEDIDA,
		 precio=PRECIO
				WHERE id=IDPRODUCTO;
		select 1;
	ELSE
	select 2;
	
	END IF;
 
 END IF;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_PROVEEDOR
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_PROVEEDOR`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_PROVEEDOR`(IN IDPROVEEDOR INT, IN ID_TIPO_DOC INT,
IN NUM_DOC_ACTUAL VARCHAR(20),IN NUM_DOC_NUEVO VARCHAR(20),
IN NOMBRE_COMERCIAL VARCHAR(100),IN NOMBRE_CONTACTO VARCHAR(100),
IN APELLIDOS_CONTACTO VARCHAR(100),
IN DIRECCION_DEP VARCHAR(200),
 IN CELULAR CHAR(20), IN CORREO VARCHAR(50))
BEGIN
DECLARE CANTIDAD INT;

IF NUM_DOC_ACTUAL= NUM_DOC_NUEVO THEN
		UPDATE proveedor set 
		IDTipoDocumento=ID_TIPO_DOC,
		NombreComercial= NOMBRE_COMERCIAL,
		NombreContacto=NOMBRE_CONTACTO,
		ApellidoContacto=APELLIDOS_CONTACTO,

		Direccion=DIRECCION_DEP,
		Telefono=CELULAR,
		Correo=CORREO
	
		WHERE IDProveedor=IDPROVEEDOR;
select 1;
 ELSE
  SET @CANTIDAD:=(SELECT COUNT(*) FROM proveedor where Documento =NUM_DOC_NUEVO);
	
	IF @CANTIDAD = 0 THEN 
		 UPDATE proveedor set 
				IDTipoDocumento=ID_TIPO_DOC,
				Documento =NUM_DOC_NUEVO,
		NombreComercial= NOMBRE_COMERCIAL,
		NombreContacto=NOMBRE_CONTACTO,
		ApellidoContacto=APELLIDOS_CONTACTO,

		Direccion=DIRECCION_DEP,
		Telefono=CELULAR,
		Correo=CORREO
	
		WHERE IDProveedor=IDPROVEEDOR;
		select 1;
	ELSE
	select 2;
	
	END IF;
 
 END IF;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_ROL
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_ROL`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_ROL`(IN `IDROL` INT, 
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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MODIFICAR_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MODIFICAR_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_MODIFICAR_USUARIO`(IN `IDUSUARIO` INT, 
IN `USU_ACTUAL` VARCHAR(100), 
IN `USU_NUEVO` VARCHAR(100),
IN EMAIL_ACTUAL VARCHAR(100),
IN EMAIL_NUEVO VARCHAR(100), IN `IDROL` INT)
BEGIN
DECLARE CANTIDAD INT;
IF USU_ACTUAL = USU_NUEVO or EMAIL_ACTUAL = EMAIL_NUEVO THEN
	UPDATE usuarios SET
	rol_id=IDROL
	WHERE usuario_id = IDUSUARIO;
SELECT 1;
ELSE 

SET @CANTIDAD:=(SELECT COUNT(*) FROM usuarios WHERE `usuario_nombre`=USU_NUEVO);
IF  @CANTIDAD = 0 THEN
UPDATE usuarios SET

`usuario_nombre`=USU_NUEVO,
rol_id=IDROL,
usuario_email=EMAIL_NUEVO

WHERE usuario_id = IDUSUARIO;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_CATEGORIA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_CATEGORIA`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_CATEGORIA`(IN NOMBRE VARCHAR(100))
BEGIN
DECLARE CANTIDADME INT;

    SET @CANTIDADME:=(SELECT COUNT(*) FROM categoria WHERE `descripcion_cat` =NOMBRE
    );
    IF @CANTIDADME = 0 THEN
        
        INSERT INTO categoria(descripcion_cat, estatus)
        VALUES(NOMBRE,'ACTIVO');
        SELECT 1;
    ELSE
    SELECT 2;
END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_DEPORTISTA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_DEPORTISTA`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_DEPORTISTA`(IN ID_TIPO_DOC INT,IN NUM_DOC VARCHAR(20), 
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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_MEDIDA
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_MEDIDA`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_MEDIDA`(IN NOMBRE VARCHAR(100), IN ABRE CHAR(10))
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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_PRODUCTO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_PRODUCTO`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_PRODUCTO`(IN COD_PROD VARCHAR(100),IN DESC_PROD VARCHAR(500), 

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
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_PROVEEDOR
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_PROVEEDOR`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_PROVEEDOR`(IN ID_TIPO_DOC INT,IN NUM_DOC VARCHAR(20), 
IN NOMBRE_COMERCIAL VARCHAR(100), IN NOMBRE_CONTACTO VARCHAR(100),IN APELLIDO_CONTACTO VARCHAR(100),
IN DIRECCION VARCHAR(200), IN CELULAR CHAR(20),  IN EMAIL VARCHAR(255))
BEGIN

DECLARE CANTIDADME INT;

	SET @CANTIDADME:=(SELECT COUNT(*) FROM deportista where documento =NUM_DOC);
	IF @CANTIDADME = 0 THEN
			INSERT INTO proveedor(IDTipoDocumento,Documento,NombreComercial,NombreContacto,
		ApellidoContacto, Direccion, Telefono,Correo,		estatus)
		values(ID_TIPO_DOC,NUM_DOC,NOMBRE_COMERCIAL,NOMBRE_CONTACTO,APELLIDO_CONTACTO,DIRECCION,CELULAR,EMAIL
		,'ACTIVO');
		select 1;
	ELSE
	select 2;
	END IF;




END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_ROL
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_ROL`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_ROL`(IN `NOMBRE` VARCHAR(100))
BEGIN

DECLARE CANTIDADME INT;

    SET @CANTIDADME:=(SELECT COUNT(*) FROM rol WHERE descripcion =NOMBRE
    );
    IF @CANTIDADME = 0 THEN
        
        INSERT INTO rol(descripcion,estatus)
        VALUES(NOMBRE,'ACTIVO');
        SELECT 1;
    ELSE
    SELECT 2;
  
  
END IF;
end
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_REGISTRAR_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_REGISTRAR_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_REGISTRAR_USUARIO`(IN `USUARIO` VARCHAR(100), IN `PASS` VARCHAR(250), IN `IDROL` INT, IN `CORREO` VARCHAR(100), IN `RUTA` VARCHAR(255))
BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuarios WHERE usuario_nombre =USUARIO 
OR usuario_email =CORREO);
IF @CANTIDAD =0 THEN
INSERT INTO `usuarios` (`usuario_nombre`,`usuario_password`,`rol_id`, `usuario_email`, `usuario_estatus`,`usuario_intento`,  
`usuario_imagen`) VALUES(USUARIO,PASS,IDROL,CORREO,'ACTIVO',0,RUTA);
SELECT 1;
ELSE 
SELECT 2;
END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_RESTABLECER_CONTRA_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_RESTABLECER_CONTRA_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_RESTABLECER_CONTRA_USUARIO`(IN EMAIL VARCHAR(255), IN CONTRA VARCHAR(250))
BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(select COUNT(*) from usuarios
where usuario_email=EMAIL);

if @CANTIDAD > 0 THEN 
UPDATE usuarios set
usuario_password =CONTRA,
usuario_intento=0
WHERE usuario_email =EMAIL;
select 1;
ELSE
select 2;
END IF;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_VERIFICAR_USUARIO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_VERIFICAR_USUARIO`;
delimiter ;;
CREATE PROCEDURE `SP_VERIFICAR_USUARIO`(IN USUARIO VARCHAR(50))
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
        where `usuario_nombre`  = BINARY USUARIO
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
