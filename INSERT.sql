-- Inserción de Marcas
INSERT INTO marcas (nombre, pais) VALUES 
('Toyota', 'Japón'),
('BMW', 'Alemania'),
('Mercedes', 'Alemania'),
('Audi', 'Alemania'),
('Volkswagen', 'Alemania'),
('Ford', 'Estados Unidos'),
('Chevrolet', 'Estados Unidos'),
('Honda', 'Japón'),
('Nissan', 'Japón'),
('Hyundai', 'Corea del Sur'),
('Kia', 'Corea del Sur'),
('Renault', 'Francia'),
('Peugeot', 'Francia'),
('Citroën', 'Francia'),
('Seat', 'España'),
('Fiat', 'Italia'),
('Mazda', 'Japón'),
('Opel', 'Alemania'),
('Volvo', 'Suecia'),
('Porsche', 'Alemania');

-- Inserción de Modelos para cada Marca
INSERT INTO modelo (nombre, marca_id) VALUES 
-- Toyota
('Corolla', 1),
('Camry', 1),
('RAV4', 1),
('Yaris', 1),
('Prius', 1),
('Highlander', 1),
('Land Cruiser', 1),

-- BMW
('Serie 1', 2),
('Serie 3', 2),
('Serie 5', 2),
('Serie 7', 2),
('X1', 2),
('X3', 2),
('X5', 2),
('X7', 2),

-- Mercedes
('Clase A', 3),
('Clase C', 3),
('Clase E', 3),
('Clase S', 3),
('GLA', 3),
('GLC', 3),
('GLE', 3),

-- Audi
('A1', 4),
('A3', 4),
('A4', 4),
('A6', 4),
('A8', 4),
('Q3', 4),
('Q5', 4),
('Q7', 4),

-- Volkswagen
('Golf', 5),
('Polo', 5),
('Passat', 5),
('Tiguan', 5),
('Touareg', 5),
('T-Roc', 5),
('T-Cross', 5),

-- Ford
('Fiesta', 6),
('Focus', 6),
('Mondeo', 6),
('Kuga', 6),
('Puma', 6),
('Mustang', 6),
('Explorer', 6),

-- Chevrolet
('Spark', 7),
('Aveo', 7),
('Cruze', 7),
('Malibu', 7),
('Camaro', 7),
('Trax', 7),
('Equinox', 7),

-- Honda
('Civic', 8),
('Accord', 8),
('Jazz', 8),
('CR-V', 8),
('HR-V', 8),
('Pilot', 8),

-- Nissan
('Micra', 9),
('Juke', 9),
('Qashqai', 9),
('X-Trail', 9),
('Leaf', 9),
('370Z', 9),
('GT-R', 9),

-- Hyundai
('i10', 10),
('i20', 10),
('i30', 10),
('Tucson', 10),
('Santa Fe', 10),
('Kona', 10),
('IONIQ', 10);

-- Inserción de Vehículos
INSERT INTO vehiculo (matricula, modelo_id, estado_vehiculo, anio, kilometros, combustible, transmision, traccion, potencia, cilindrada, color, numero_puertas, plazas, peso, consumo, fotos) VALUES
('1234ABC', 3, 'segunda_mano', 2019, 45000, 'gasolina', 'manual', 'delantera', 150, 2000, 'blanco', 5, 5, NULL, NULL, NULL),
('5678DEF', 9, 'segunda_mano', 2020, 30000, 'diésel', 'automática', 'trasera', 190, 2500, 'negro', 5, 5, NULL, NULL, NULL),
('9012GHI', 21, 'segunda_mano', 2021, 15000, 'híbrido', 'semiautomática', 'AWD', 220, 2000, 'gris', 5, 5, NULL, NULL, NULL),
('3456JKL', 28, 'seminuevo', 2022, 5000, 'gasolina', 'manual', 'delantera', 130, 1600, 'rojo', 5, 5, NULL, NULL, NULL),
('7890MNO', 31, 'segunda_mano', 2018, 60000, 'diésel', 'automática', '4x4', 180, 2200, 'azul', 5, 5, NULL, NULL, NULL),
('2345PQR', 39, 'segunda_mano', 2017, 80000, 'gasolina', 'manual', 'delantera', 150, 2000, 'verde', 5, 5, NULL, NULL, NULL),
('6789STU', 47, 'segunda_mano', 2020, 25000, 'eléctrico', 'automática', 'AWD', 300, 0, 'amarillo', 3, 2, NULL, NULL, NULL),
('0123VWX', 52, 'seminuevo', 2021, 10000, 'híbrido', 'manual', 'delantera', 180, 1800, 'blanco', 5, 5, NULL, NULL, NULL),
('VWGOLF01', 31, 'segunda_mano', 2018, 50000, 'gasolina', 'manual', 'delantera', 110, 1600, 'azul', 5, 5, NULL, NULL, NULL),
('MBCLASEE01', 18, 'segunda_mano', 2019, 40000, 'diésel', 'automática', 'trasera', 180, 2000, 'gris', 5, 5, NULL, NULL, NULL);

-- Inserción de Usuarios (necesario antes de insertar anuncios)
INSERT INTO usuario (id, nombre, correo, password, telefono, fecha_registro, rol, activo) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', 'password123', '666111222', '2023-01-01 00:00:00', 'vendedor', true),
(2, 'María García', 'maria.garcia@example.com', 'password123', '666333444', '2023-01-02 00:00:00', 'vendedor', true),
(3, 'Carlos Rodríguez', 'carlos.rodriguez@example.com', 'password123', '666555666', '2023-01-03 00:00:00', 'vendedor', true),
(4, 'Laura Martínez', 'laura.martinez@example.com', 'password123', '666777888', '2023-01-04 00:00:00', 'vendedor', true),
(5, 'Antonio López', 'antonio.lopez@example.com', 'password123', '666999000', '2023-01-05 00:00:00', 'vendedor', true),
(6, 'Ana Sánchez', 'ana.sanchez@example.com', 'password123', '666123456', '2023-01-06 00:00:00', 'comprador', true),
(7, 'Pedro Gómez', 'pedro.gomez@example.com', 'password123', '666234567', '2023-01-07 00:00:00', 'comprador', true),
(8, 'Lucía Fernández', 'lucia.fernandez@example.com', 'password123', '666345678', '2023-01-08 00:00:00', 'comprador', true);

-- Inserción de Anuncios
INSERT INTO anuncio (id, titulo, descripcion, matricula, vendedor_id, fecha_publicacion, estado, precio, imagen_principal, imagenes_adicionales) VALUES
(1, 'Toyota RAV4 2019 - Impecable', 'Vehículo en perfecto estado, único dueño', '1234ABC', 1, '2023-01-15 10:30:00', 'activo', 25000, 'assets/default-car.jpg', '[]'),
(2, 'BMW Serie 3 2020 - Deportivo y Elegante', 'Deportivo con todas las prestaciones', '5678DEF', 2, '2023-02-20 14:45:00', 'activo', 35000, 'assets/default-car.jpg', '[]'),
(3, 'Mercedes Clase E Híbrido 2021 - Lujo Eficiente', 'Híbrido de alta gama', '9012GHI', 3, '2023-03-10 09:15:00', 'activo', 45000, 'assets/default-car.jpg', '[]'),
(4, 'Audi A4 2022 - Como Nuevo', 'Apenas usado, como nuevo', '3456JKL', 4, '2023-04-05 16:20:00', 'activo', 38000, 'assets/default-car.jpg', '[]'),
(5, 'Volkswagen Golf 2018 - Económico', 'Económico y en buen estado', '7890MNO', 5, '2023-05-12 11:30:00', 'activo', 18000, 'assets/default-car.jpg', '[]'),
(6, 'Volkswagen Golf 2018 - Buen estado', 'Perfecto para ciudad', 'VWGOLF01', 1, '2023-06-01 12:00:00', 'activo', 17500, 'assets/default-car.jpg', '[]'),
(7, 'Mercedes Clase E 2019 - Impecable', 'Lujo y confort garantizados', 'MBCLASEE01', 2, '2023-06-02 15:00:00', 'activo', 42000, 'assets/default-car.jpg', '[]');
