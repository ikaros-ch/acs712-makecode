# Set analog reference

Set the ADC reference voltage in mV. Use 3300 for a typical micro:bit analog input range.

```sig
acs712.setAnalogReference(3300)
```

## Parameters

* **millivolts**: the voltage that reads as 1023

## Example

```blocks
acs712.setAnalogReference(3300)
```

```package
acs712=github:ikaros-ch/acs712-makecode
```
