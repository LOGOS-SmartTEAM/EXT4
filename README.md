# EXT4 — SmartTEAM 4

Extensión MakeCode para el robot SmartTEAM 4 (micro:bit).

## Uso como extensión

1. Abre [makecode.microbit.org](https://makecode.microbit.org/)
2. Crea un **Nuevo proyecto**
3. Ve a **Extensiones** (icono de engranaje)
4. Pega la URL del repositorio de GitHub:
   `https://github.com/LOGOS-SmartTEAM/EXT4`
5. Confirma la importación (versión actual: **2.1.0**)

Los bloques aparecen en la categoría **SmartTEAM 4** de la caja de herramientas.

### Actualizar la extensión en un proyecto existente

MakeCode puede cachear extensiones importadas desde GitHub. Si no ves los bloques nuevos:

1. Eliminá la extensión **ext4** en **Extensiones**.
2. Volvé a importar la URL de GitHub.
3. Confirmá que la versión sea **2.1.0**.

### ⚠ Cambios que rompen programas guardados

**En la 2.1.0** se quitaron los dos bloques del DHT11 y se agregó el sensor de suelo en su lugar. Un programa guardado que use los bloques del DHT11 va a quedar con bloques huérfanos al actualizar.

**En la 2.0.12** cambió el orden de los parámetros de dos bloques. Los programas guardados que los usen van a necesitar que reacomodes los valores a mano:

| Bloque | Antes | Ahora |
|--------|-------|-------|
| LED | `LED Puerto … Estado …` | `LED │ Estado … en pin …` |
| Motores por cm | `Motores … por … cm \|\| Velocidad …` | `… │ Velocidad … por … cm` |

Además, el bloque de centímetros ya solo ofrece **Avanzar** y **Retroceder** (antes también listaba los giros y el freno).

## Bloques disponibles

13 bloques repartidos en 5 subcategorías.

### SENSORES

| Bloque | Forma | Notas |
|--------|-------|-------|
| `%distancia detecta objeto %estado` | Hexágono | Trae encajado el bloque `Ultrasonido │ en pin I2C` |
| `%reading %op %value` | Hexágono | Trae encajado el bloque `Botón │ en pin %puerto` |
| `%medida está %estado` | Hexágono | Trae encajado el bloque `Sensor de Suelo │ en pin %puerto` |

Los bloques redondos del ultrasonido, del botón y del sensor de suelo **no aparecen sueltos** en la caja de herramientas: solo existen encajados dentro de sus hexágonos.

> **Sensor de suelo:** el bloque ya está, pero la lectura todavía no está implementada: devuelve `0`, así que por ahora siempre responde "Húmedo". Además el sensor es analógico, y la micro:bit solo tiene conversor analógico en los pines 0, 1, 2, 3, 4 y 10; como el puerto **P3 está mapeado al pin 8**, ese puerto no va a poder usarse cuando se programe la lectura.

### SALIDAS

| Bloque |
|--------|
| `LED │ Estado %estado en pin %puerto` |

### MOVIMIENTO

| Bloque |
|--------|
| `%movimiento │ Velocidad %velocidad` |
| `%movimiento │ Velocidad %velocidad por %cm cm` |
| `%direccion │ Velocidad %velocidad ángulo de %angulo` |

### PANTALLAS

| Bloque |
|--------|
| `OLED │ Escribir %texto en fila %fila en columna %columna en pin I2C` |
| `OLED │ borrar textos en pin I2C` |

### VARIABLES

| Bloque | Forma |
|--------|-------|
| `Establecer Cantidad a %valor` | Acción |
| `Cantidad` | Redondo |
| `Sumar 1` | Acción |
| `Restar 1` | Acción |

## Convenciones visuales

### El carácter separador `│`

Los bloques que nombran un componente usan el carácter `│` (**U+2502 — BOX DRAWINGS LIGHT VERTICAL**) después del nombre, con el patrón `Nombre │ resto de los parámetros`.

**No es la barra vertical del teclado `|`.** Son dos caracteres distintos y MakeCode los renderiza diferente. Al editar, copiá y pegá el carácter de un bloque existente.

### Paleta

| Uso | Color |
|-----|-------|
| Categoría | `#f3a32b` |
| Sensores y salidas GPIO | `#FFB800` |
| Bloques hexagonales lógicos | `#006970` |
| Componentes I2C y movimiento | `#35BFE9` |
| Variables | `#EF506D` |

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

## Glosario de nombres (MakeCode)

Para pedir cambios con precisión, usamos esta jerarquía:

```
Extensión          →  ext4
  Categoría        →    SmartTEAM 4
    Subcategoría   →      SALIDAS
      Bloque       →        LED │ Estado … en pin …
```

### Las 4 piezas principales

| Nivel | Nombre que usamos | Dónde se ve | En esta extensión |
|-------|-------------------|-------------|-------------------|
| 1 | **Extensión** | Al importar desde GitHub | **ext4** |
| 2 | **Categoría** | Fila en la caja de herramientas (izquierda) | **SmartTEAM 4** |
| 3 | **Subcategoría** | Encabezado dentro del panel al abrir una categoría | **SENSORES**, **SALIDAS**, **MOVIMIENTO**, **PANTALLAS**, **VARIABLES** |
| 4 | **Bloque** | Pieza que arrastrás al workspace | `LED │ Estado … en pin …`, `Cantidad` |

En MakeCode, las subcategorías se llaman **groups** (`//% groups=[…]` en la categoría, `//% group="…"` en cada bloque).

### Partes internas de un bloque

Cuando hablemos de un bloque concreto, también podemos nombrar:

| Parte | Nombre | Ejemplo |
|-------|--------|---------|
| Texto visible en el bloque | **Texto del bloque** | `LED │ Estado %estado en pin %puerto` |
| Identificador interno | **Block ID** | `ext4_led`, `ext4_button_sensor`, `ext4_motor_move` |
| Nombre en el código TypeScript | **Función** | `ext4BotonEnPin()`, `led()` |
| Desplegables o casillas | **Parámetros** | `%puerto`, `%estado`, `%texto` |
| Lista de opciones fijas | **Menú / enum** | `ON` / `OFF`, `P0` / `P1`… |

### Cómo pedirme algo (plantillas)

- *“Agregá un **bloque** `mostrar mensaje` en la **subcategoría** PANTALLAS”*
- *“Renombrá la **categoría** SmartTEAM 4 a …”*
- *“Cambiá el **texto del bloque** LED a …”*
- *“La **extensión** debe llamarse … en MakeCode”*

### Dónde se configura cada cosa en este repo

| Pieza | Archivo principal | Atributo clave |
|-------|-------------------|----------------|
| Extensión | `pxt.json` | `name`, `version`, `files` |
| Categoría | `blocks/categorias/smartteam4.ts` | `//% color=… icon=… block="…"` y `groups=[…]` |
| Bloque | `blocks/smartteam4/<bloque>.ts` | `//% blockId=… block="…" group="…"` |
| Traducción al español | `_locales/es/ext4-strings.json` | claves `{id:category}…` y `…\|block` |
| Referencia editable | `config/` | No se compila; documenta los valores anteriores |

**Lo que MakeCode lee es la línea `//%`.** Los archivos de `config/` son documentación de apoyo: no están en `pxt.json`, así que no se compilan ni afectan a los bloques.

---

## Calibración de motores

Los bloques de **MOVIMIENTO** calculan el tiempo de marcha a partir de la **física real del robot** (tamaño de rueda, separación entre ruedas y RPM del motor). Todas las constantes están al inicio de `blocks/smartteam4/motores.ts`, agrupadas y comentadas para encontrarlas rápido.

| Constante | Valor por defecto | Para qué sirve | ¿Hay que medirla? |
|-----------|-------------------|----------------|-------------------|
| `MOTOR_ROJO` | `81` (0x51) | Dirección I2C del motor **derecho** (rojo) | No (fija del hardware) |
| `MOTOR_VERDE` | `82` (0x52) | Dirección I2C del motor **izquierdo** (verde) | No (fija del hardware) |
| `DIAMETRO_RUEDA_CM` | `5.5` | Diámetro de la rueda en cm (55 mm) | Solo si cambiás de rueda |
| `CIRCUNFERENCIA_RUEDA_CM` | `3.14159 × 5.5` ≈ `17.28` | Cm que avanza el robot por cada vuelta de rueda | Se calcula sola |
| `DIST_ENTRE_RUEDAS_CM` | `12.0` | Distancia entre centros de rueda en cm (120 mm) | Solo si cambia el chasis |
| `RPM_A_VEL_100` | `150` | RPM del motor a velocidad 100 (tras la reductora) | **Sí — única a calibrar** |

### Fórmulas usadas

- **Mover por cm** → `tiempo_ms = (cm × 60000) / (CIRCUNFERENCIA_RUEDA_CM × RPM_efectivas)`
- **Girar ángulo** → `arco_cm = π × DIST_ENTRE_RUEDAS_CM × angulo / 360` y luego el mismo cálculo de tiempo.
- En ambas: `RPM_efectivas = RPM_A_VEL_100 × velocidad / 100`.

### Cómo configurarlas

1. **Direcciones I2C (`MOTOR_ROJO`, `MOTOR_VERDE`)**
   - Son fijas del hardware Smart Hub V2: rojo = 81, verde = 82.
   - Solo cambialas si tu placa responde en otras direcciones (revisá la documentación de tu placa).

2. **Medidas físicas (`DIAMETRO_RUEDA_CM`, `DIST_ENTRE_RUEDAS_CM`)**
   - Ya vienen con las medidas del robot estándar (rueda 55 mm, separación 120 mm).
   - Si montás ruedas o chasis distintos, medí con regla y actualizá estos valores.
   - `CIRCUNFERENCIA_RUEDA_CM` se recalcula sola a partir del diámetro; no la toques a mano.

3. **`RPM_A_VEL_100` (la única constante empírica a calibrar)**
   - Poné el robot en el piso con espacio libre.
   - Usá el bloque `Avanzar │ Velocidad 100 por 100 cm`.
   - Medí con cinta métrica cuánto avanzó realmente.
   - Ajustá proporcionalmente: `RPM_nuevo = RPM_actual × distancia_real / 100`.
   - Repetí hasta que avance exactamente 100 cm. Con esto quedan calibrados **a la vez** el avance en cm y el giro por ángulo (ambos dependen de esta constante).

> **Nota:** estas constantes viven en el código (`.ts`) porque son parámetros físicos de calibración y no metadatos del bloque. Tras cambiarlas, volvé a importar/actualizar la extensión en MakeCode para que tomen efecto.

---

## Reglas para crear bloques

### 1. Dónde vive cada valor

| Dónde editar | Para qué sirve |
|--------------|----------------|
| Línea `//%` encima de la función | Lo que MakeCode lee para dibujar el bloque |
| Encabezado del archivo `.ts` | Referencia rápida al editar un bloque concreto |
| `config/bloques.ts` | Registro de apoyo, no compilado |

**Importante:** MakeCode no puede leer variables TypeScript en la línea `//%`. Todo valor (color, grupo, texto) va escrito literalmente ahí.

### 2. Categorías disponibles

Usa solo esta categoría por ahora:

| Categoría | Archivo de categoría | Subcategorías | Carpeta de bloques |
|-----------|---------------------|---------------|-------------------|
| SmartTEAM 4 | `blocks/categorias/smartteam4.ts` | SENSORES, SALIDAS, MOVIMIENTO, PANTALLAS, VARIABLES | `blocks/smartteam4/` |

El namespace es `ext4_smartteam4` y **no debe renombrarse**: cambiarlo rompería todos los bloques ya colocados en los proyectos de los usuarios.

Para cambiar subcategorías, editá `groups=[…]` en `blocks/categorias/smartteam4.ts` y sincronizá `config/categorias.ts`. Cada `group="…"` de un bloque debe coincidir **exactamente** (mayúsculas incluidas) con una entrada del array.

### 3. Iconos

MakeCode usa **Font Awesome** en la línea `//% icon="\uf1b3"`. Busca códigos en [fontawesome.com/v5](https://fontawesome.com/v5/search?m=free).

El atributo `icon` solo tiene efecto en la **categoría**, no en los bloques individuales.

La carpeta `icons/` está reservada para PNG/SVG de referencia y hoy está vacía.

### 4. Pasos para agregar un bloque nuevo

1. Copiá **`blocks/_plantilla.ts`** a `blocks/smartteam4/mi-bloque.ts`.
2. Escribí la línea `//%` con `blockId`, `block`, `group`, `color` y `weight`.
3. Escribí el código de la función.
4. Registrá el archivo en **`pxt.json`** → array `"files"`. **Sin este paso MakeCode ignora el archivo por completo.**
5. Agregá la traducción en **`_locales/es/ext4-strings.json`**, con el texto **idéntico** al de la línea `//%`.
6. Subí el número de `"version"` en `pxt.json` para que MakeCode refresque la extensión.

> Si el texto del archivo de traducciones no coincide carácter por carácter con el del código, MakeCode muestra el del archivo de traducciones y tu cambio se pierde silenciosamente.

### 5. Orden de los archivos en `pxt.json`

Los archivos se compilan en el orden del array `"files"`. Un archivo que use un enum o una función declarada en otro debe ir **después** de él. Por ejemplo, `humedad_suelo.ts` usa `Ext4Puerto`, declarado en `puertos.ts`, así que va después de él.

---

## Estructura del proyecto

```
EXT4/
├── config/                  # Referencia editable, no compilada
│   ├── tipos.ts             # Tipo CategoriaId
│   ├── categorias.ts        # Color, icono y subcategorías
│   ├── puertos.ts           # Mapeo de puertos (referencia)
│   └── bloques.ts           # Metadatos de cada bloque
├── icons/                   # Iconos de referencia (PNG/SVG)
├── blocks/
│   ├── categorias/
│   │   └── smartteam4.ts    # Definición de la categoría SmartTEAM 4
│   ├── smartteam4/
│   │   ├── puertos.ts       # Enum Ext4Puerto y mapeo a pines
│   │   ├── boton.ts
│   │   ├── ultrasonic.ts
│   │   ├── humedad_suelo.ts
│   │   ├── LED.ts
│   │   ├── motores.ts
│   │   ├── oled.ts
│   │   └── cantidad.ts
│   └── _plantilla.ts        # Plantilla para bloques nuevos
├── _locales/es/             # Traducciones
├── archivadas/              # Versiones anteriores, fuera de compilación
├── main.ts
├── main.blocks
├── pxt.json
└── test.ts
```

Solo se compila lo que está listado en `pxt.json` → `"files"`.

## Editar esta extensión

1. En MakeCode, usa **Importar** → **Importar URL**
2. Pega la URL del repositorio de GitHub
3. Edita los bloques o el código y sincroniza con GitHub

## Licencia

MIT
