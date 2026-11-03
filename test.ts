// Test suite for the acs712 extension.
// How to test: power the Keyestudio KS0187 from 5 V, wire OUT through a 2:1 divider
// (e.g. two 10k resistors) to P0, and pass a known DC current (e.g. 1 A) through IP+ / IP-.
// Flash, open the serial console, and check each EXPECT line.
// PASS = every EXPECT matches within ~10%. In the simulator: PASS = runs with no errors.

acs712.setModel(acs712.Model.ACS712_5A)
acs712.setSensitivity(185)
acs712.setAnalogReference(3300)
acs712.setSensorToPinScale(2)
// EXPECT: no error icon

// Run with NO current flowing
const zero = acs712.calibrateZero(AnalogPin.P0, 64)
serial.writeValue("zero_mV", zero)
// EXPECT: zero_mV about 1250 (2500 mV sensor midpoint / 2)

acs712.setZeroVoltage(zero)
serial.writeValue("pin_mV", acs712.readPinVoltage(AnalogPin.P0))
// EXPECT: pin_mV close to zero_mV while no current flows

basic.showString("ON")
basic.pause(5000)
// Now turn the 1 A load ON during the 5 s pause

serial.writeValue("A", acs712.readCurrent(AnalogPin.P0))
// EXPECT: A about 1.0 (sign depends on wiring direction)
serial.writeValue("mA", acs712.readCurrentMilliAmps(AnalogPin.P0))
// EXPECT: mA about 1000
serial.writeValue("rms_A", acs712.readRmsCurrent(AnalogPin.P0, 200, 500))
// EXPECT: rms_A about 1.0 for DC (always positive)
