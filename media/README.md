# Medios de productos

Esta carpeta es el punto de entrada para publicar fotos y videos reales.
Su contenido no se sube a git: solo se usa en tu computador como origen de la
carga hacia Firebase Storage.

## Estructura

Una carpeta por producto. El nombre de la carpeta es el slug de la URL final
(`/catalogo/<slug>`), en minúsculas y separado por guiones.

```
media/
  sofa-oslo-gris/
    producto.json
    01-principal.jpg
    02-lateral.jpg
    03-detalle-costura.jpg
    video-01.mp4
  cama-king-florencia/
    producto.json
    01-principal.jpg
```

Reglas prácticas:

- La primera imagen en orden alfabético es la portada del catálogo. Usa
  prefijos numéricos (`01-`, `02-`, `03-`) para controlar el orden.
- Formatos de imagen aceptados: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- Formatos de video aceptados: `.mp4`, `.webm`, `.mov`.
- Ideal por imagen: 2000 px de ancho y menos de 1.5 MB.
- Ideal por video: menos de 25 MB y entre 10 y 30 segundos.
- Toma las fotos en formato horizontal (4:3) para que encajen en la galería.

## Ficha del producto

Cada carpeta necesita un `producto.json`. Copia el de `_ejemplo-sofa-oslo`
y ajústalo. Campos obligatorios: `name` y `category`.

Categorías válidas: `sofas`, `camas`, `comedores`, `sofacamas`, `cortinas`,
`sillas`, `medida`.

## Publicar

```powershell
npm run media:check     # Verifica credenciales, archivos y fichas
npm run media:dry-run   # Muestra qué se subiría, sin escribir nada
npm run media:upload    # Sube el material y publica las fichas
```

Para volver a subir un archivo que ya existe, usa
`npm run media:upload -- --force`. Para trabajar un solo producto,
`npm run media:upload -- --only=sofa-oslo-gris`.
