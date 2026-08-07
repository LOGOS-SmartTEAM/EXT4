/**
 * Sensor de humedad de suelo — SmartTEAM4 / subcategoría SENSORES
 * Conectado a un puerto GPIO. Sensor ANALÓGICO (devuelve 0–1023).
 *
 * ESTADO: solo estética. La lógica de lectura está pendiente.
 * Ver la sección "PENDIENTE" del comentario de ext4SueloEnPin.
 */

enum Ext4EstadoSuelo {
    //% block="Húmedo"
    Humedo = 0,
    //% block="Seco"
    Seco = 1,
}

namespace ext4_smartteam4 {

    // Umbral que separa suelo húmedo de suelo seco (lectura analógica 0–1023).
    // Por debajo de este valor se considera HÚMEDO, por encima SECO.
    // Ajustar midiendo el sensor real en tierra mojada y en tierra seca.
    const SUELO_UMBRAL = 500

    /**
     * Lectura interna del sensor de suelo (no visible en la caja de herramientas).
     *
     * PENDIENTE: implementar la lectura analógica real:
     *   return pins.analogReadPin(<pin analógico del puerto>)
     *
     * Requiere agregar una función puertoToAnalogPin() en puertos.ts, porque
     * puertoToGpioPin() devuelve DigitalPin y analogReadPin espera AnalogPin.
     * Leer la advertencia al final de esta misión antes de implementarlo.
     */
    //% blockId=ext4_suelo_sensor
    //% block="Sensor de Suelo │ en pin %puerto"
    //% blockHidden=1 color="#FFB800"
    export function ext4SueloEnPin(puerto: Ext4Puerto): number {
        // TODO: reemplazar por la lectura analógica real del sensor.
        return 0
    }

    /**
     * Comprueba si el suelo está húmedo o seco según el umbral configurado.
     * @param medida lectura del sensor de suelo
     * @param estado Húmedo o Seco
     */
    //% blockId=ext4_suelo_estado
    //% block="%medida está %estado"
    //% medida.shadow=ext4_suelo_sensor
    //% group="SENSORES" color="#006970" weight=95 blockGap=8
    export function ext4SueloEstado(
        medida: number,
        estado: Ext4EstadoSuelo
    ): boolean {
        const humedo = medida < SUELO_UMBRAL
        switch (estado) {
            case Ext4EstadoSuelo.Humedo:
                return humedo
            case Ext4EstadoSuelo.Seco:
                return !humedo
            default:
                const _exhaustiveCheck: never = estado
                return _exhaustiveCheck
        }
    }
}
