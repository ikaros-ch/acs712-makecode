# keyestudio-acs712

MakeCode extension for the Keyestudio KS0187 ACS712-5A current sensor and other ACS712 variants.

## Important hardware note

The Keyestudio KS0187 page states that the board uses the **ACS712ELC-5B**, needs a **5 V power supply**, has **185 mV/A** sensitivity, and outputs **VCC/2** at zero current. The Allegro ACS712 datasheet also specifies 5.0 V single-supply operation and ratiometric output. With a 5 V supply, the zero-current output is about 2.5 V, and at +5 A the output can reach about 3.425 V, which is slightly above the micro:bit's normal 3.3 V analog range.

Because of that, do **not** connect a 5 V ACS712 output directly to a micro:bit analog pin unless you are certain the output will stay within the safe range. A voltage divider or other level shifting is strongly recommended.

## Setup

Typical `on start` sequence:

```typescript
acs712.setModel(acs712.Model.ACS712_5A)
acs712.setAnalogReference(3300)
acs712.setSensorToPinScale(2)
acs712.calibrateZero(AnalogPin.P0, 64)
```

Use `setSensorToPinScale(2)` when the sensor signal is reduced by a 2:1 divider before reaching the micro:bit pin.

## Example

```typescript
basic.forever(function () {
    serial.writeValue("A", acs712.readCurrent(AnalogPin.P0))
    basic.pause(200)
})
```

## Files

* `acs712.ts` - extension source
* `pxt.json` - extension metadata
* `test.ts` - simple test program

## Publishing

Create a GitHub repo such as `pxt-keyestudio-acs712`, copy these files in, then import that repo URL from **Extensions** in MakeCode for micro:bit.

## Supported API

* Set model (5 A / 20 A / 30 A)
* Set custom sensitivity in mV/A
* Set ADC reference voltage
* Set sensor-to-pin voltage scale
* Calibrate zero-current offset
* Read pin voltage in mV
* Read current in A or mA
* Read RMS current in A

## License

MIT

for PXT/microbit
