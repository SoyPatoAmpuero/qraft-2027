# Qraft Arquitectos

Sitio editorial de Qraft Arquitectos. Entrega basada en la **versión 28 — header contextual**, del 12 de noviembre de 2026.

## Abrir en tu computador

Necesitas Python 3. Desde la carpeta del proyecto:

```sh
python3 serve.py
```

Abre **http://127.0.0.1:8000/** y mantén la terminal abierta. Para detenerlo, pulsa `Ctrl+C`. En Mac también puedes hacer doble clic en **Abrir vista previa.command**. Si el puerto está ocupado: `python3 serve.py --port 8001`.

La vista previa local necesita que este servicio esté activo. Cerrar la terminal o reiniciar el equipo puede detenerlo; los archivos no se pierden.

## Compartir en GitHub

Crea un repositorio y sube **el contenido de esta carpeta**, con `index.html` y `assets/` en la raíz. También puedes conectar una copia local usando GitHub Desktop.

Es un sitio estático: no requiere instalar dependencias ni ejecutar una compilación. Se puede publicar con GitHub Pages desde la raíz del repositorio. Todos los recursos usan rutas relativas, compatibles con una URL de proyecto como `usuario.github.io/qraft-arquitectos/`.

## Estructura

- `index.html`: inicio, visión, proyectos, equipo y contacto.
- `casa-*.html`, `cabana-*.html`, `costa-del-sur.html`: páginas de proyectos.
- `equipo-contacto.html`: página de equipo y contacto.
- `assets/images/`: fotografías y logo vectorial.
- `assets/fonts/`: fuente Inter usada por el sitio.
- `assets/css/`: estilos, separados en el mismo orden que la versión aprobada.
- `assets/js/`: navegación, portada, giro del imagotipo, portadas de proyectos y header contextual.
- `serve.py`: vista previa local; no se necesita para alojar el sitio.

Los sufijos de los recursos identifican su contenido y evitan nombres duplicados. Las imágenes y la tipografía se almacenan una sola vez y se comparten entre páginas.

## Comportamiento incluido

- Hero “Habitar el Sur” con rotación automática de Casa CV, Casa BG y Casa Borquez, selección manual y pausa.
- Fotografías completas con ajuste sutil de luz y color en el inicio.
- Imagotipo de trazo fino con giro volumétrico y control de pausa.
- Portadas de proyectos que se detienen durante el desplazamiento en escritorio.
- Header compacto: se oculta al bajar, reaparece al subir y adopta el fondo y contraste de la sección visible.
- WhatsApp directo a `+56 9 9816 5445` y correo `contacto@qraft.cl`.
- Adaptación móvil, foco de teclado y respeto de movimiento reducido.

## Estado del formulario

**El formulario todavía no envía mensajes.** Al pulsar Enviar muestra un aviso de vista de diseño. Antes de usarlo para recibir consultas hay que conectar un servicio de formularios o un backend. No incluye credenciales ni una configuración de envío.

## Alcance de la entrega

Se conservaron el contenido, las fotografías, los enlaces y la apariencia de la versión 28. Solo se extrajeron los recursos incrustados para facilitar el mantenimiento y reducir el peso repetido. No se incluyeron versiones anteriores, capturas, archivos temporales ni retratos fuente sin utilizar.
