# FlowerLogix JN

Aplicación web de consulta y análisis de las labores de Jardines de San Nicolás. El proyecto se mantiene en la rama `main`.

## Clonar la versión actual

```bash
git clone https://github.com/Sebastian1047/enraizamiento-jn.git
cd enraizamiento-jn
```

## Abrir la demostración con datos de prueba

**En GitHub Pages:** https://sebastian1047.github.io/enraizamiento-jn/demo.html

**Después de clonar:** abrir el archivo `demo.html` en un navegador o servir la carpeta con un servidor web estático. Por ejemplo, con Python instalado:

```bash
python -m http.server 8000
```

Luego abrir http://localhost:8000/demo.html

`demo.html` abre directamente **Producción → Siembra Campo → Rendimiento** con tres colaboradores ficticios y seis registros de tiempos de octubre de 2026. En cada colaborador se pueden desplegar registros y revisar los campos de jornada, horas extra, descuentos, tiempo efectivo y tallos sembrados por hora, además de probar los botones de **Editar** y **Eliminar**.

Los datos de demostración se generan en memoria y están identificados como **DATOS DE PRUEBA**. En modo demo no se reemplazan por información guardada en IndexedDB. Las ediciones/eliminaciones realizadas desde FlowerLogix se guardan **solo en el almacenamiento local de ese navegador**; no modifican Labores JN ni se comparten automáticamente entre equipos.

La entrada habitual de la aplicación (sin forzar demostración) es:

https://sebastian1047.github.io/enraizamiento-jn/

En una instalación nueva sin datos reales para Siembra Campo, la vista de Rendimiento también muestra registros ficticios automáticamente. Cuando existan datos locales utilizables, se consultarán esos registros, salvo que se abra el modo demo.

## Archivos relevantes

- `index.html`: aplicación web y scripts integrados
- `siembra-tiempo-consulta.js`: consulta, tarjetas, muestra ficticia y edición local de tiempos de Siembra Campo
- `performance-report.js`: filtros de rendimiento y carga de datos
- `quality-report.js`, `production-indicators.js`, `styles.css`: otras vistas y estilos

## Alcance de la demostración

El modo demo permite revisar el **diseño y el flujo de consulta**; no constituye una prueba de sincronización con un servidor o con la API de la aplicación operativa.
