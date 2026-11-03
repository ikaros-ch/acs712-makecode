# Calibrate zero

Average several readings with no current flowing and store that as the zero point. Returns the measured zero-current pin voltage in mV.

```sig
acs712.calibrateZero(AnalogPin.P0, 64)
```

## Parameters

* **pin**: the analog pin the sensor OUT is wired to
* **samples**: how many readings to average

## Example

```blocks
acs712.calibrateZero(AnalogPin.P0, 64)
```

```package
acs712=github:ikaros-ch/acs712-makecode
```
