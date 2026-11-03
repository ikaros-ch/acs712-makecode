# Set model

MakeCode extension for ACS712 current sensors. Designed for the Keyestudio KS0187 ACS712-5A board. Allegro ACS712 datasheet: https://www.allegromicro.com/-/media/files/datasheets/acs712-datasheet.ashx / //% color=#1B80C4 icon="\uf0e7" block="ACS712" namespace acs712 { /** Supported ACS712 variants. / export enum Model { //% block="5 A (185 mV/A)" ACS712_5A = 185, //% block="20 A (100 mV/A)" ACS712_20A = 100, //% block="30 A (66 mV/A)" ACS712_30A = 66 } let sensitivityMvPerA = 185 let adcReferenceMv = 3300 let sensorToPinScale = 1 let zeroPinMv = 1650 function clampSamples(samples: number): number { if (samples < 1) { return 1 } return Math.round(samples) } function clampMicros(us: number): number { if (us < 50) { return 50 } return Math.round(us) } function readPinVoltageMv(pin: AnalogPin): number { return pins.analogReadPin(pin) * adcReferenceMv / 1023 } function currentFromPinVoltageMv(pinMv: number): number { let deltaSensorMv = (pinMv - zeroPinMv) * sensorToPinScale return deltaSensorMv / sensitivityMvPerA } /** Select the ACS712 model printed on the chip (5 A, 20 A or 30 A).

```sig
acs712.setModel(acs712.Model.ACS712_5A)
```

## Parameters

* **model**: the sensor range

## Example

```blocks
acs712.setModel(acs712.Model.ACS712_5A)
```

```package
acs712=github:ikaros-ch/acs712-makecode
```
