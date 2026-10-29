# parcial1-web2-Nicordoba
📚 API Biblioteca

API REST desarrollada con **Node.js**, **Express 5**, **Prisma 7 (con adaptador PostgreSQL)** y estructurada bajo una arquitectura de 3 capas (Controllers, Services, Routes), completamente dockerizada.

🔗 **Enlace de descarga en Google Drive:** [https://drive.google.com/drive/u/2/folders/1puQKU9CbvX9SFFOVql3vt5yPJ_POKYB1]

Para ejecutar el proyecto descargado:
**Extrae el archivo `.zip`.**

---

## 👨‍💻 Autor e Integrante
* **Nicolas Cordoba Ramirez**

---

## 🛠️ Tecnologías e Infraestructura
* **Node.js v24** & **Express 5**
* **Prisma 7** (ORM con adaptador PostgreSQL)
* **PostgreSQL 17** (Contenedor oficial)
* **Docker & Docker Compose** (Orquestación completa)

---

## 🚀 Despliegue y Ejecución con Docker

Para levantar toda la infraestructura (Base de Datos PostgreSQL, ejecutor de migraciones Prisma y Servidor Web Express), ejecuta un único comando desde una terminal del proyecto:

docker-compose up --build

---

## 🧪 Pruebas de Endpoints en Postman

Peticiones para verificar las operaciones CRUD de la API en http://localhost:3000:

1. Listar Usuarios (GET)

Método: GET

URL: http://localhost:3000/api/usuarios

Body: none

Acción: clic en Send (devuelve un código 200 OK con una lista en formato JSON).

Nombre de petición: Obtener Usuarios

2. Listar Libros (GET)

Método: GET

URL: http://localhost:3000/api/libros

Body: none

Acción: clic en Send (devuelve un código 200 OK con la lista de libros).

Nombre de petición: Obtener Libros

3. Crear un Libro (POST)

Método: POST

URL: http://localhost:3000/api/libros

Body: Selecciona raw y cambia el formato a JSON.

Payload:

{
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "stock": 5
}


Acción: clic en Send (debería devolverte un código 201 Created).

Nombre de petición: Crear Libro
