/**
 * Bloque LED — SmartTEAM4 / subcategoría Salidas
 */

enum Ext4LedEstado {
    //% block="ON"
    ON = 0,
    //% block="OFF"
    OFF = 1,
}

namespace ext4_smartteam4 {

    /**
     * Escribe el estado del LED en el puerto GPIO indicado.
     * @param estado ON (0) u OFF (1), eg: ON
     * @param puerto puerto GPIO, eg: P0
     */
    //% blockId=ext4_led
    //% block="LED │ Estado %estado en pin %puerto"
    //% group="SALIDAS" color="#FFB800" weight=95 blockGap=8
    export function led(estado: Ext4LedEstado, puerto: Ext4Puerto): void {
        pins.digitalWritePin(puertoToGpioPin(puerto), estado);
    }
}
