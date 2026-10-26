// Pruebas rápidas — esto NO se compila cuando la carpeta se usa como extensión.
bloques.establecerCantidad(0)
if (bloques.botonLogico(bloques.boton(SabanaPuerto.P0), bloques.SabanaOperadorComparacion.Igual, 1)) {
    bloques.sumarCantidad()
    bloques.led(bloques.SabanaEstadoOnOff.ON, SabanaPuerto.P1)
}
if (bloques.ultrasonidoLogico(bloques.ultrasonido(), bloques.SabanaVerdaderoFalso.Verdadero)) {
    bloques.movimientoGirar(bloques.SabanaDireccionGiro.Derecha, 50, 90)
} else {
    bloques.movimientoCm(bloques.SabanaAvanceRetroceso.Avanzar, 50, 20)
}
basic.showNumber(bloques.leerCantidad())
