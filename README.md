# ACS712 current sensor

MakeCode extension for ACS712 hall-effect current sensors, made for the [Keyestudio KS0187 ACS712-5A Current Sensor](https://wiki.keyestudio.com/Ks0187_keyestudio_ACS712-5A_Current_Sensor). The 20 A ([KS0186](https://wiki.keyestudio.com/Ks0186_keyestudio_ACS712-20A_Current_Sensor)) and 30 A ([KS0185](https://wiki.keyestudio.com/Ks0185_keyestudio_ACS712-30A_Current_Sensor)) boards work too. Measure DC or AC current through a motor, lamp or battery.

## Use as extension

In [MakeCode for micro:bit](https://makecode.microbit.org/): **Extensions** → paste `https://github.com/ikaros-ch/acs712-makecode`.

```package
acs712=github:ikaros-ch/acs712-makecode
```

## Wiring (read this first)

The ACS712 needs a **5 V supply** and outputs **VCC/2 (about 2.5 V) at zero current**, rising 185 mV per amp on the 5 A model. At +5 A that is about 3.4 V, which is above the micro:bit's 3.3 V pin limit.

Use a **2:1 voltage divider** (two equal resistors, e.g. 10 kΩ + 10 kΩ) between the sensor OUT and the micro:bit pin, then tell the extension with `set sensor-to-pin voltage scale 2`.

| ACS712 | Connect to |
|---|---|
| VCC | 5 V supply (not the micro:bit 3V pin) |
| GND | 5 V supply GND **and** micro:bit GND |
| OUT | divider → micro:bit P0 (or P1, P2) |
| IP+ / IP- | in series with the load |

## Examples

### Show the current

```blocks
// 5 A board, OUT through a 2:1 divider to P0
acs712.setModel(acs712.Model.ACS712_5A)
acs712.setSensorToPinScale(2)
// Measure the zero point with NO current flowing
acs712.calibrateZero(AnalogPin.P0, 64)
basic.forever(function () {
    // Current in milliamps, rounded
    basic.showNumber(Math.round(acs712.readCurrentMilliAmps(AnalogPin.P0)))
    basic.pause(500)
})
```

### Graph the current

```blocks
acs712.setModel(acs712.Model.ACS712_5A)
acs712.setSensorToPinScale(2)
acs712.calibrateZero(AnalogPin.P0, 64)
basic.forever(function () {
    // Open "Show data Device" in MakeCode to see the graph
    serial.writeValue("A", acs712.readCurrent(AnalogPin.P0))
    basic.pause(200)
})
```

### AC or noisy current

```blocks
acs712.setModel(acs712.Model.ACS712_5A)
acs712.setSensorToPinScale(2)
acs712.calibrateZero(AnalogPin.P0, 64)
basic.forever(function () {
    // RMS over 200 samples, 0.5 ms apart (5 cycles of 50 Hz)
    serial.writeValue("rms", acs712.readRmsCurrent(AnalogPin.P0, 200, 500))
})
```

## Blocks

* [set model](docs/set-model.md), [set sensitivity](docs/set-sensitivity.md), [set analog reference](docs/set-analog-reference.md)
* [set sensor-to-pin voltage scale](docs/set-sensor-to-pin-scale.md)
* [calibrate zero](docs/calibrate-zero.md), [set zero voltage](docs/set-zero-voltage.md)
* [current (A)](docs/read-current.md), [current (mA)](docs/read-current-milli-amps.md), [RMS current](docs/read-rms-current.md), [pin voltage](docs/read-pin-voltage.md)

## Learn more

* [Keyestudio KS0187 wiki](https://wiki.keyestudio.com/Ks0187_keyestudio_ACS712-5A_Current_Sensor)
* [Allegro ACS712 datasheet](https://www.allegromicro.com/-/media/files/datasheets/acs712-datasheet.ashx)
* [micro:bit analog read reference](https://makecode.microbit.org/reference/pins/analog-read-pin)
* [micro:bit data logging guide](https://microbit.org/get-started/user-guide/data-logging/)

## License

MIT

## Supported targets

* for PXT/microbit
