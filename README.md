# HookDB 🕹️

[Documentación completa del Proyecto](https://kiwi-humor-d51.notion.site/Documentaci-n-del-Proyecto-HookDB-aa14c1fa97454a0ba1ce39d442f3a9c5?pvs=4)


#

# Historial de cambios 📚
El historial de cambios de la API se encuentra en los commits de el mismo repositorio

#

## API 📚

Esta API ha sido desarrollada utilizando las siguientes tecnologías:

- **Java**: Lenguaje de programación de alto nivel utilizado para el desarrollo del backend.
- **Spring**: Framework de Java utilizado para simplificar la infraestructura de desarrollo.
- **Spring Security**: Framework de seguridad que proporciona autenticación y autorización a aplicaciones Java.
- **Swagger**: Herramienta de software de código abierto utilizada para diseñar, construir y documentar servicios web RESTful.
- **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos de la aplicación.
- **Lombok**: Biblioteca de Java que se utiliza para reducir el código repetitivo.
- **JSON Web Token (JWT)**: Estándar de la industria para la creación de tokens de acceso que permiten la propagación de identidades y privilegios.
- **BCrypt**: Algoritmo de hashing para contraseñas.

## Arquitectura 🏗️

La API sigue el patrón de diseño **Modelo-Servicio-Controlador (MSC)**. Este es un patrón de arquitectura de software que divide la lógica de la aplicación en tres componentes interconectados. Esto permite un desarrollo más organizado y modular.

- **Modelo**: Representa los datos y las reglas de negocio de la aplicación.
- **Servicio**: Encapsula la lógica de negocio y controla las transacciones.
- **Controlador**: Maneja las solicitudes del usuario y devuelve una respuesta.

## Seguridad 🔒

La API implementa medidas de seguridad para proteger los datos y garantizar que sólo los usuarios autorizados tengan acceso a ciertas funcionalidades. Utiliza **Spring Security** para la autenticación y autorización, **JWT** para la creación de tokens de acceso, y **BCrypt** para el hashing de contraseñas.

## Autor 🖋️

Esta API ha sido desarrollada por **David Portillo Hoyos**.

#

# Documentación del Despliegue 🚀

## Tecnologías Utilizadas 🛠️

El despliegue de esta API se realiza utilizando las siguientes tecnologías:

- **AWS (Amazon Web Services)**: Plataforma de servicios de cómputo en la nube que proporciona una amplia variedad de servicios de infraestructura, como capacidades de almacenamiento, redes y bases de datos.
- **Instancias EC2**: Servicio de AWS que proporciona capacidad de cómputo escalable en la nube. Se utiliza para alojar el servidor de la aplicación.
- **Kubernetes**: Plataforma de código abierto para automatizar la implementación, el escalado y la gestión de aplicaciones en contenedores.
- **Dominio**: Se utiliza un dominio personalizado para alojar la web de la aplicación.
- **Cloudflare**: Servicio que proporciona protección y aceleración de cualquier sitio web en línea. Se utiliza para mejorar la seguridad y el rendimiento de la web de la aplicación.
- **GitHub Actions**: Plataforma de integración continua y entrega continua (CI/CD) de GitHub que permite automatizar, personalizar y ejecutar tus flujos de trabajo de software.


## Proceso de Despliegue 🔄

El despliegue se realiza de forma automatizada utilizando GitHub Actions. Cuando se hace un push al repositorio, GitHub Actions se encarga de construir y desplegar la aplicación en las instancias EC2 de AWS. Además, se utiliza Kubernetes para gestionar y escalar la aplicación en la nube.

## Seguridad 🔒

Se utiliza Cloudflare para proporcionar una capa adicional de seguridad y mejorar el rendimiento de la web de la aplicación.

## Autor 🖋️

La configuración y el proceso de despliegue han sido desarrollados por **David Portillo Hoyos**.

# Documentación de entorno cliente 📚

## Tecnologías Utilizadas 💻

El front-end ha sido desarrollado utilizando las siguientes tecnologías:

- **HTML**: proporciona una estructura para presentar el contenido de una web, utilizando etiquetas y atributos.
- **CSS**: es un lenguaje de estilo para definir el diseño de los elementos HTML en una pagina web.
- **React**: es una biblioteca de Javascript que permite crear compoenntes para organizar y reutilizar codigo.
- **React router**: es una biblioteca de React que permite la navegacióne entre diferentes componenentes de una web, permitiendo crear aplicaciones de una sola página (SPA).
- **Toastify**: es una biblioteca de notificaciones para react, que permite crear notificaciones de éxito y error.
- **Icons material**: es una biblioteca de iconos que proporciona una gran cantidad de iconos vectoriales.


## Estructura del proyecto 💻
Para crear una jerarquía sencilla e intuitiva, ya que el proyecto es bastante complejo, he desarrollado la siguiente estructura:     

Pages  
|_Page  
&nbsp;&nbsp;&nbsp;|_📁[Tab]  
&nbsp;&nbsp;&nbsp;|_📁components  
&nbsp;&nbsp;&nbsp;|_📁css  
&nbsp;&nbsp;&nbsp;|_🗃page.jsx  

Cada vista de la web está representada por una *Page*. En la raíz de esta, se encuentra un archivo que contiene todos los componentes hijos ubicados en la carpeta *components*, junto con sus archivos de estilos correspondientes en la carpeta *css*. Opcionalmente, existe la carpeta *Tab*, la cual sigue la misma estructura que *Page*. Esta carpeta es creada cuando una *Page* contiene una barra de navegación que hace cambiar gran parte de la información de la *Page*
#
# Bibliografía utilizada 📚
[Documentación de Spring](https://docs.spring.io/spring-framework/reference/index.html)  
[Documentación de React](https://docs.spring.io/spring-framework/reference/index.html](https://react.dev/reference/react )  
[Udemy - Tutorial de React](https://www.udemy.com/course/react-cero-experto/)  
[Documentación de MDN. CSS y Javescript](https://developer.mozilla.org/es/docs/Web/JavaScript)  





