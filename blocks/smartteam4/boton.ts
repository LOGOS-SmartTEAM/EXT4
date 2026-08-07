/**
 * Botón en puerto GPIO — SmartTEAM4 / subcategoría Sensores
 * Origen: ICreateRobot main.ts → buttonState
 */

enum Ext4CompareOperator {
    //% block="="
    Eq,
    //% block="≠"
    Neq,
    //% block="<"
    Lt,
    //% block="≤"
    Lte,
    //% block=">"
    Gt,
    //% block="≥"
    Gte,
}

namespace ext4_smartteam4 {

    /**
     * Lectura interna del botón (no visible en la caja de herramientas).
     */
    //% blockId=ext4_button_sensor
    //% block="Botón │ en pin %puerto"
    //% blockHidden=1 color="#FFB800"
    export function ext4BotonEnPin(puerto: Ext4Puerto): number {
        const pin = puertoToGpioPin(puerto)
        pins.setPull(pin, PinPullMode.PullUp)
        return 1 - pins.digitalReadPin(pin)
    }

    /**
     * Compara la lectura del botón con un valor numérico.
     * @param reading lectura del botón, eg: ext4BotonEnPin(Ext4Puerto.P1)
     * @param op operador de comparación
     * @param value valor a comparar, eg: 1
     */
    //% blockId=ext4_button_compare
    //% block="%reading %op %value"
    //% group="SENSORES" color="#006970" weight=100 blockGap=8
    //% reading.shadow=ext4_button_sensor
    //% value.shadow=math_number
    //% value.defl=1
    export function ext4BotonComparar(reading: number, op: Ext4CompareOperator, value: number): boolean {
        return compareValues(reading, op, value);
    }
}

function compareValues(left: number, op: Ext4CompareOperator, right: number): boolean {
    switch (op) {
        case Ext4CompareOperator.Eq: return left == right;
        case Ext4CompareOperator.Neq: return left != right;
        case Ext4CompareOperator.Lt: return left < right;
        case Ext4CompareOperator.Lte: return left <= right;
        case Ext4CompareOperator.Gt: return left > right;
        case Ext4CompareOperator.Gte: return left >= right;
        default:
            const _exhaustiveCheck: never = op;
            return _exhaustiveCheck;
    }
}
