# EXT4 — STEAMbit 4

Extensión MakeCode para micro:bit, categoría **STEAMbit 4**. Versión **4.0.0**.

## Cómo agregarla en MakeCode

1. En MakeCode, **Extensiones** → pegar `https://github.com/LOGOS-SmartTEAM/EXT4` y elegirla.
2. Aparece la categoría **STEAMbit 4** en la caja de herramientas.

### Actualizar en un proyecto existente

Los proyectos quedan fijados a la versión con la que se agregó la extensión. Para tener la 4.0.0:
en el Explorador del proyecto (debajo del simulador), actualizar la extensión, o quitarla y volver a agregarla.

## Idiomas

Español, inglés y portugués: los bloques y sus ayudas se muestran en el idioma elegido en MakeCode
(Configuración → Idioma). Cualquier otro idioma muestra inglés.

## Bloques


### VARIABLES

| Bloque | Qué hace |
|---|---|
| Establecer Cantidad a … | Guarda un número en Cantidad. |
| Cantidad | El valor actual de Cantidad. |
| Sumar 1 | Suma 1 a Cantidad. |
| Restar 1 | Resta 1 a Cantidad. |

### SENSORES

| Bloque | Qué hace |
|---|---|
| … … … | Compara el valor del botón con un número. |
| … está … | Indica si la tierra está seca o húmeda. |
| … detecta objeto … | Detecta si hay un objeto entre 3 y 25 cm. |

### SALIDAS

| Bloque | Qué hace |
|---|---|
| LED │ Estado … en pin … | Prende o apaga el LED. |

### MOVIMIENTO

| Bloque | Qué hace |
|---|---|
| … │ Velocidad … | Mueve el robot a la velocidad elegida (0 a 100). |
| … │ Velocidad … por … cm | Avanza o retrocede los centímetros elegidos y se detiene. |
| … │ Velocidad … ángulo de … | Gira el robot los grados elegidos y se detiene. |

### PANTALLAS

| Bloque | Qué hace |
|---|---|
| OLED │ Escribir … en fila … en columna … en pin I2C | Escribe un texto o un número en la pantalla OLED. |
| OLED │ borrar textos en pin I2C | Borra todo lo escrito en la pantalla OLED. |

## ⚠ Cambio importante en 4.0.0

EXT4 pasó a usar los mismos bloques que el resto de STEAMbit (código de STV2-PADRE). Los programas
guardados con la versión 3.x de EXT4 pueden perder los bloques de esta extensión al actualizar:
hay que volver a colocarlos.

## Estructura

```
bloques.ts        ← todos los bloques (un solo archivo), generado desde STV2-PADRE
main.ts           ← solo descripción
test.ts           ← pruebas rápidas (no se incluyen al usar la extensión)
_locales/es, pt   ← traducciones (el código está en inglés)
pxt.json          ← nombre, versión y lista de archivos
```

Los bloques se corrigen en **STV2-PADRE** y se regenera este archivo.

## Simulador y conexión USB

**El simulador y WebUSB son cosas distintas.**

| Función | Qué usa | Cuándo |
|---------|---------|--------|
| Simulador (micro:bit virtual) | JavaScript en el navegador | Siempre, sin cable |
| micro:bit físico | WebUSB (MakeCode lo gestiona) | Al descargar o emparejar |

### Si el simulador no carga (spinner infinito)

1. Recarga la página o colapsa y vuelve a abrir el panel del simulador (flecha junto a la barra).
2. Pulsa **Reiniciar** en los controles del simulador.
3. Alterna entre **Bloques** y **JavaScript** para forzar una recarga.
4. Revisa la consola del navegador (F12 → Consola) por errores de compilación.
5. Si estás en red escolar/empresa, pide desbloquear los dominios del simulador MakeCode.

### WebUSB (micro:bit físico) — requisitos

Según la [especificación WebUSB](https://wicg.github.io/webusb/):

- **Contexto seguro**: usar `https://makecode.microbit.org` (HTTPS).
- **Navegador compatible**: Chrome, Edge u Opera (Chrome 61+). Firefox y Safari no soportan WebUSB.
- **Gestión del usuario**: emparejar requiere un clic (MakeCode llama a `requestDevice()`).
- **Cable USB de datos** (no solo carga).
- **Firmware DAPLink** actualizado en la micro:bit.

Esta extensión no implementa WebUSB; lo hace MakeCode al pulsar **Descargar** o **Emparejar**.

## Licencia

MIT
