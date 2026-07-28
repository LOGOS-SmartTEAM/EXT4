/**
 * Sensor DHT11 (humedad / temperatura) — SmartTEAM4 / subcategoría SENSORES
 * Conectado a un puerto GPIO.
 *
 * ESTADO: solo estética. La lógica de lectura del sensor está pendiente.
 */

enum Ext4DatoDHT11 {
    //% block="Humedad"
    Humedad = 0,
    //% block="Temperatura"
    Temperatura = 1,
}

namespace ext4_smartteam4 {

    /**
     * Lee humedad o temperatura del DHT11 en el puerto indicado.
     * @param dato Humedad o Temperatura
     * @param puerto puerto GPIO donde está conectado el sensor
     */
    //% blockId=ext4_dht11
    //% block="%dato │ en pin %puerto"
    //% group="SENSORES" color="#FFB800" weight=90 blockGap=8
    export function ext4Dht11(dato: Ext4DatoDHT11, puerto: Ext4Puerto): number {
        // TODO: implementar el protocolo de lectura del DHT11.
        // Devuelve 0 hasta que la lógica esté programada.
        return 0
    }

    /**
     * Compara la lectura del DHT11 con un valor numérico.
     * @param medida lectura del sensor DHT11
     * @param op operador de comparación
     * @param valor valor a comparar
     */
    //% blockId=ext4_dht11_compare
    //% block="%medida %op %valor"
    //% medida.shadow=ext4_dht11
    //% valor.shadow=math_number
    //% valor.defl=25
    //% group="SENSORES" color="#006970" weight=89 blockGap=8
    export function ext4Dht11Comparar(
        medida: number,
        op: Ext4CompareOperator,
        valor: number
    ): boolean {
        return compareValues(medida, op, valor)
    }
}
