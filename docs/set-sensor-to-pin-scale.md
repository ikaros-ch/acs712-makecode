# Set sensor to pin scale

Set how much larger the sensor voltage is than the micro:bit pin voltage. 1 = direct connection, 2 = 2:1 divider, etc.

```sig
acs712.setSensorToPinScale(2)
```

## Parameters

* **scale**: divider ratio

## Example

```blocks
acs712.setSensorToPinScale(2)
```

```package
acs712=github:ikaros-ch/acs712-makecode
```
