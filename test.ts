acs712.setModel(acs712.Model.ACS712_5A)
acs712.setAnalogReference(3300)
acs712.setSensorToPinScale(2)
acs712.calibrateZero(AnalogPin.P0, 64)

basic.forever(function () {
    serial.writeValue("Current_A", acs712.readCurrent(AnalogPin.P0))
    basic.pause(200)
})
