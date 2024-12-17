# Proyecto que consume dos APIS

El login solicitara al usuario ingresar un correo electronico y contraseña, estos datos seran validados usando una API creada en Laravel. 
Si los datos coinciden se ingresara a la ventana de inicio de lo contrario se arrojara una alerta que indicara que las credenciales no coinciden

## 1. Creacion del proyecyo

• ng new LoginNS --no-standalone

• aceptar las opciones predeterminadas cuando se solicite.

• cd LoginNS


![image](https://github.com/user-attachments/assets/3fa30cab-107e-4aea-bc52-75ce71ed83ad)

![image](https://github.com/user-attachments/assets/16f21e9a-858a-4bee-a88e-e64fd9344ad1)


## 2. Creacion de los servicio
-- Un servicio sera para la API de usuarios
![image](https://github.com/user-attachments/assets/e558102d-206b-4f31-a8a2-8988e3b3213a)

Contiene ademas metodos para obtener detalles, para eliminar y para actualizar

![image](https://github.com/user-attachments/assets/310f4981-c252-4c0f-b58f-48d70f151d21)


![image](https://github.com/user-attachments/assets/82393a59-3c7e-4458-901e-ce9bb14838cd)


--Y otro para la API de Nudibranquios

![image](https://github.com/user-attachments/assets/149e181d-77b4-4c68-88e5-fbebd1658ba6)

![image](https://github.com/user-attachments/assets/c3a83199-d9a5-4f44-a47f-3c2b0cbb8416)


## 3.- Componentes necesarios 
-- Login

![image](https://github.com/user-attachments/assets/2bfe5c41-2425-4314-8dd9-09cca75e1faf)

![image](https://github.com/user-attachments/assets/4f726f1a-8810-448e-b6ac-4ba638f85292)


-Inicio
Donde se encuentra nuestra tabla de Nudibranquios
![image](https://github.com/user-attachments/assets/ff71136c-8e2f-4d3d-ab84-5e72c5487ac0)

Se encuentran los metodos para eliminar y actualizar 

![image](https://github.com/user-attachments/assets/581a7fa9-f00c-4441-a40a-7ae177f5ec42)


-- Usuarios
Componente donde se encontrara la tabla de usuarios
![image](https://github.com/user-attachments/assets/2ee8dca8-9420-42d1-aa42-4c323bf53b7e)

Contiene metodos similares para las acciones de borrar y actualizar


![image](https://github.com/user-attachments/assets/446c1a4a-83ad-4a30-b919-802024637e07)

--Buscador
Es el componente encargado de realizar busquedas en nuestra dos tablas

Se trata de solamente un input
![image](https://github.com/user-attachments/assets/2e895bda-f285-4219-b28d-7730a51e77c7)
![image](https://github.com/user-attachments/assets/da4b116f-bdf8-4f1b-a9b7-0df6b0ec71e2)

--Detalles de
Es un modal que muestra los detalles de los nudibranquios
![image](https://github.com/user-attachments/assets/ce5294f1-956e-4762-ad35-e748216a7eb5)
![image](https://github.com/user-attachments/assets/e7caa721-95fd-43d9-b5a1-5f9dbcf51e3d)

--Nav bar
Es la barrita que se encuentra en el ancabezado de cada pagina
![image](https://github.com/user-attachments/assets/9ad31cfd-239b-4c5b-b9d3-bc622b326545)

![image](https://github.com/user-attachments/assets/94fd8536-a3f2-4d8d-8ec7-d9e4f7adf80d)

--Menu Lateral
Es una barra lateral para la navegacion entre paginas
![image](https://github.com/user-attachments/assets/a12dffe2-9ebf-4e08-88be-160a2ac89c18)

## 4.- Vizualizacion

![image](https://github.com/user-attachments/assets/11a429f9-55d3-4438-bcb8-968f96aecdc4)


![image](https://github.com/user-attachments/assets/c858c29b-8f51-4f18-8e08-479a5da9251d)

![image](https://github.com/user-attachments/assets/859b470b-e523-4898-a7a2-4637d26d0263)








