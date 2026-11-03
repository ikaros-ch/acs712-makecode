# Read rms current

Estimate RMS current by sampling the waveform. Useful for AC or noisy signals.

```sig
acs712.readRmsCurrent(AnalogPin.P0, 200, 500)
```

## Parameters

* **pin**: the analog pin the sensor OUT is wired to
* **samples**: how many readings to take
* **samplePeriodUs**: microseconds between readings

## Example

```blocks
acs712.readRmsCurrent(AnalogPin.P0, 200, 500)
```

```package
acs712=github:ikaros-ch/acs712-makecode
```
