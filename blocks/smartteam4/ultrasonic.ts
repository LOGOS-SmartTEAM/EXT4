/**
 * Sensor ultrasónico I2C — SmartTEAM4 / subcategoría Sensores
 * Conectado por bus I2C (sin puerto configurable)
 */

enum Ext4ObjetoDetectado {
    //% block="Verdadero"
    Verdadero,
    //% block="Falso"
    Falso,
}

namespace ext4_smartteam4 {

    // ── Constantes I2C — ajustar según el módulo real ────────────────
    // Dirección I2C del sensor ultrasónico
    // RCWL-9620 / Grove I2C ultrasónico: 0x57 (87)
    // Cambiar si el escaneo I2C devuelve otra dirección
    const ULTRASONIC_I2C_ADDR = 87      // 0x57

    // Byte de comando para iniciar medición
    // RCWL-9620: 0x01
    const ULTRASONIC_CMD_TRIGGER = 0x01

    // Tiempo de espera tras el trigger en ms
    // RCWL-9620: 50ms
    const ULTRASONIC_WAIT_MS = 50

    // Rango de detección para el bloque "detecta objeto"
    const ULTRASONIC_MIN_CM = 3
    const ULTRASONIC_MAX_CM = 25

    // ── Lectura interna ──────────────────────────────────────────────

    function medirI2CCm(): number {
        // Enviar comando de trigger
        let trigBuf = pins.createBuffer(1)
        trigBuf[0] = ULTRASONIC_CMD_TRIGGER
        pins.i2cWriteBuffer(ULTRASONIC_I2C_ADDR, trigBuf)

        // Esperar medición
        basic.pause(ULTRASONIC_WAIT_MS)

        // Leer 2 bytes: distancia en mm (UInt16 big-endian)
        let data = pins.i2cReadBuffer(ULTRASONIC_I2C_ADDR, 2)
        const mm = (data[0] << 8) | data[1]
        return Math.round(mm / 10)
    }

    // ── Bloques públicos ─────────────────────────────────────────────

    /**
     * Lee la distancia en centímetros del sensor ultrasónico I2C.
     */
    //% blockId=ext4_ultrasonic_sensor
    //% block="Ultrasonido │ en pin I2C"
    //% blockHidden=1 color="#35BFE9"
    export function ext4UltrasonicCm(): number {
        return medirI2CCm()
    }

    /**
     * Comprueba si el sensor ultrasónico detecta un objeto en el rango
     * configurado (3–25 cm por defecto).
     * @param distancia lectura en cm del sensor
     * @param estado Verdadero = detectado; Falso = no detectado
     */
    //% blockId=ext4_ultrasonic_detect
    //% block="%distancia detecta objeto %estado"
    //% distancia.shadow=ext4_ultrasonic_sensor
    //% group="SENSORES" color="#006970" weight=100 blockGap=8
    export function ext4UltrasonicDetecta(
        distancia: number,
        estado: Ext4ObjetoDetectado
    ): boolean {
        const detectado = distancia > ULTRASONIC_MIN_CM
            && distancia < ULTRASONIC_MAX_CM
        switch (estado) {
            case Ext4ObjetoDetectado.Verdadero:
                return detectado
            case Ext4ObjetoDetectado.Falso:
                return !detectado
            default:
                const _exhaustiveCheck: never = estado
                return _exhaustiveCheck
        }
    }
}
