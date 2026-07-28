namespace ext4_smartteam4 {

    // ── Direcciones I2C de los motores ──────────────────────────────
    // Motor ROJO  = derecho  = caraddress1 (se niega internamente)
    // Motor VERDE = izquierdo = caraddress2
    let MOTOR_ROJO = 81    // 0x51 — verificado en código oficial ICreateRobot
    let MOTOR_VERDE = 82   // 0x52 — verificado en código oficial ICreateRobot

    // ── Constantes físicas del robot ────────────────────────────────
    // Diámetro de rueda en cm (medido: 55mm)
    const DIAMETRO_RUEDA_CM = 5.5
    // Circunferencia de rueda en cm (π × diámetro)
    const CIRCUNFERENCIA_RUEDA_CM = 3.14159 * DIAMETRO_RUEDA_CM  // = 17.28 cm

    // Distancia entre centros de rueda en cm (medido: 120mm)
    const DIST_ENTRE_RUEDAS_CM = 12.0

    // ── Constante a calibrar con el robot real ───────────────────────
    // RPM del motor a velocidad 100 (después de la caja reductora).
    // Procedimiento de calibración:
    //   1. Marcar una rueda con una cinta
    //   2. Usar el bloque "Motores Avanzar por X cm" con X=100 y velocidad=100
    //   3. Contar cuántas vueltas dio la rueda
    //   4. RPM = vueltas × 60000 / tiempo_real_ms
    // Valor inicial estimado: 150 RPM (ajustar tras medir)
    const RPM_A_VEL_100 = 150

    // ── Enums ────────────────────────────────────────────────────────

    export enum Ext4MovimientoMotores {
        //% block="Avanzar"
        Avanzar = 1,
        //% block="Retroceder"
        Retroceder = 2,
        //% block="Girar a la derecha"
        GirarDerecha = 3,
        //% block="Girar a la Izquierda"
        GirarIzquierda = 4,
        //% block="Frenar"
        Frenar = 5,
    }

    export enum Ext4DireccionGiro {
        //% block="Girar a la izquierda"
        Izquierda = 0,
        //% block="Girar a la derecha"
        Derecha = 1,
    }

    export enum Ext4AvanceRetroceso {
        //% block="Avanzar"
        Avanzar = 0,
        //% block="Retroceder"
        Retroceder = 1,
    }

    // ── Protocolo I2C interno ────────────────────────────────────────

    // Envía velocidad a un motor por I2C.
    // speedRaw: valor en rango -100 a 100 YA con la negación aplicada si corresponde.
    function writeMotor(address: number, speedRaw: number): void {
        const half = speedRaw / 2
        let speed_Buff = 0
        if (half < 0) {
            const s = -half
            speed_Buff = ((~s) + 1) | 0x80
        } else {
            speed_Buff = half
        }
        let buf = pins.createBuffer(4)
        buf.setNumber(NumberFormat.UInt8BE, 0, 0x11)
        buf.setNumber(NumberFormat.UInt8BE, 1, speed_Buff)
        buf.setNumber(NumberFormat.UInt8BE, 2, 0)
        buf.setNumber(NumberFormat.UInt8BE, 3, 0)
        pins.i2cWriteBuffer(address, buf)
    }

    // Mueve ambos motores. speed1 y speed2 en rango -100 a 100.
    // El montaje en espejo se refleja en los signos de movimientoToSpeeds.
    function runDualMotors(speed1: number, speed2: number): void {
        writeMotor(MOTOR_ROJO, speed1)
        writeMotor(MOTOR_VERDE, speed2)
    }

    // Convierte movimiento + velocidad a speeds para cada motor.
    function movimientoToSpeeds(
        movimiento: Ext4MovimientoMotores,
        velocidad: number
    ): { s1: number; s2: number } {
        switch (movimiento) {
            case Ext4MovimientoMotores.Avanzar:
                return { s1: velocidad, s2: -velocidad }
            case Ext4MovimientoMotores.Retroceder:
                return { s1: -velocidad, s2: velocidad }
            case Ext4MovimientoMotores.GirarDerecha:
                return { s1: -velocidad, s2: -velocidad }
            case Ext4MovimientoMotores.GirarIzquierda:
                return { s1: velocidad, s2: velocidad }
            case Ext4MovimientoMotores.Frenar:
                return { s1: 0, s2: 0 }
            default:
                const _exhaustiveCheck: never = movimiento
                return _exhaustiveCheck
        }
    }

    // ── Bloques públicos ─────────────────────────────────────────────

    /**
     * Mueve los motores en la dirección indicada a la velocidad indicada.
     */
    //% blockId=ext4_motor_move
    //% block="%movimiento │ Velocidad %velocidad"
    //% movimiento.fieldEditor="gridpicker"
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=50
    //% group="MOVIMIENTO" color="#35BFE9" weight=100 blockGap=8
    export function ext4MotoresMover(
        movimiento: Ext4MovimientoMotores,
        velocidad: number
    ): void {
        const { s1, s2 } = movimientoToSpeeds(movimiento, velocidad)
        runDualMotors(s1, s2)
    }

    /**
     * Gira el robot en la dirección indicada a la velocidad y ángulo especificados.
     * Calibrar con RPM_A_VEL_100.
     */
    //% blockId=ext4_motor_girar
    //% block="%direccion │ Velocidad %velocidad ángulo de %angulo"
    //% direccion.fieldEditor="gridpicker"
    //% velocidad.min=1 velocidad.max=100 velocidad.defl=50
    //% angulo.min=1 angulo.max=360 angulo.defl=90
    //% group="MOVIMIENTO" color="#35BFE9" weight=80 blockGap=8
    export function girar(
        direccion: Ext4DireccionGiro,
        velocidad: number,
        angulo: number
    ): void {
        if (angulo <= 0 || velocidad <= 0) return
        const rpm_efectivas = RPM_A_VEL_100 * velocidad / 100
        const arco_cm = 3.14159 * DIST_ENTRE_RUEDAS_CM * angulo / 360
        const tiempo = (arco_cm * 60000) / (CIRCUNFERENCIA_RUEDA_CM * rpm_efectivas)
        const mov = direccion === Ext4DireccionGiro.Izquierda
            ? Ext4MovimientoMotores.GirarIzquierda
            : Ext4MovimientoMotores.GirarDerecha
        const { s1, s2 } = movimientoToSpeeds(mov, velocidad)
        runDualMotors(s1, s2)
        basic.pause(tiempo)
        runDualMotors(0, 0)
    }

    /**
     * Mueve el robot una distancia en centímetros y frena automáticamente.
     */
    //% blockId=ext4_motor_cm
    //% block="%movimiento │ Velocidad %velocidad por %cm cm"
    //% movimiento.fieldEditor="gridpicker"
    //% velocidad.min=1 velocidad.max=100 velocidad.defl=50
    //% cm.min=1 cm.max=500 cm.defl=10
    //% group="MOVIMIENTO" color="#35BFE9" weight=90 blockGap=8
    export function moverCm(
        movimiento: Ext4AvanceRetroceso,
        velocidad: number,
        cm: number
    ): void {
        if (velocidad <= 0 || cm <= 0) return
        const mov = movimiento === Ext4AvanceRetroceso.Avanzar
            ? Ext4MovimientoMotores.Avanzar
            : Ext4MovimientoMotores.Retroceder
        const rpm_efectivas = RPM_A_VEL_100 * velocidad / 100
        const tiempo = (cm * 60000) / (CIRCUNFERENCIA_RUEDA_CM * rpm_efectivas)
        const { s1, s2 } = movimientoToSpeeds(mov, velocidad)
        runDualMotors(s1, s2)
        basic.pause(tiempo)
        runDualMotors(0, 0)
    }
}
