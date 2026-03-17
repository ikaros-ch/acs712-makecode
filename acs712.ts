/**
 * MakeCode extension for ACS712 current sensors.
 * Designed for the Keyestudio KS0187 ACS712-5A board.
 */

//% color=#1B80C4 icon="\uf0e7" block="ACS712"
namespace acs712 {
    /**
     * Supported ACS712 variants.
     */
    export enum Model {
        //% block="5 A (185 mV/A)"
        ACS712_5A = 185,
        //% block="20 A (100 mV/A)"
        ACS712_20A = 100,
        //% block="30 A (66 mV/A)"
        ACS712_30A = 66
    }

    let sensitivityMvPerA = 185
    let adcReferenceMv = 3300
    let sensorToPinScale = 1
    let zeroPinMv = 1650

    function clampSamples(samples: number): number {
        if (samples < 1) {
            return 1
        }
        return Math.round(samples)
    }

    function clampMicros(us: number): number {
        if (us < 50) {
            return 50
        }
        return Math.round(us)
    }

    function readPinVoltageMv(pin: AnalogPin): number {
        return pins.analogReadPin(pin) * adcReferenceMv / 1023
    }

    function currentFromPinVoltageMv(pinMv: number): number {
        let deltaSensorMv = (pinMv - zeroPinMv) * sensorToPinScale
        return deltaSensorMv / sensitivityMvPerA
    }

    /**
     * Select the ACS712 model.
     */
    //% blockId=acs712_set_model block="ACS712 set model %model"
    //% group="Setup"
    export function setModel(model: Model): void {
        sensitivityMvPerA = model as number
    }

    /**
     * Set the sensor sensitivity in mV/A.
     */
    //% blockId=acs712_set_sensitivity block="ACS712 set sensitivity %mvPerA mV per A"
    //% mvPerA.defl=185
    //% group="Setup"
    //% advanced=true
    export function setSensitivity(mvPerA: number): void {
        if (mvPerA > 0) {
            sensitivityMvPerA = mvPerA
        }
    }

    /**
     * Set the ADC reference voltage in mV.
     * Use 3300 for a typical micro:bit analog input range.
     */
    //% blockId=acs712_set_adc_reference block="ACS712 set analog reference %millivolts mV"
    //% millivolts.defl=3300
    //% group="Setup"
    //% advanced=true
    export function setAnalogReference(millivolts: number): void {
        if (millivolts > 0) {
            adcReferenceMv = millivolts
        }
    }

    /**
     * Set how much larger the sensor voltage is than the micro:bit pin voltage.
     * 1 = direct connection, 2 = 2:1 divider, etc.
     */
    //% blockId=acs712_set_scale block="ACS712 set sensor-to-pin voltage scale %scale"
    //% scale.defl=1
    //% group="Setup"
    //% advanced=true
    export function setSensorToPinScale(scale: number): void {
        if (scale > 0) {
            sensorToPinScale = scale
        }
    }

    /**
     * Manually set the zero-current voltage seen by the micro:bit pin, in mV.
     */
    //% blockId=acs712_set_zero_voltage block="ACS712 set zero voltage on pin to %millivolts mV"
    //% millivolts.defl=1650
    //% group="Setup"
    //% advanced=true
    export function setZeroVoltage(millivolts: number): void {
        zeroPinMv = millivolts
    }

    /**
     * Average several readings with no current flowing and store that as the zero point.
     * Returns the measured zero-current pin voltage in mV.
     */
    //% blockId=acs712_calibrate_zero block="ACS712 calibrate zero on pin %pin with %samples samples"
    //% pin.defl=AnalogPin.P0
    //% samples.defl=64
    //% group="Setup"
    export function calibrateZero(pin: AnalogPin, samples: number = 64): number {
        samples = clampSamples(samples)
        let total = 0
        for (let i = 0; i < samples; i++) {
            total += readPinVoltageMv(pin)
            basic.pause(2)
        }
        zeroPinMv = total / samples
        return zeroPinMv
    }

    /**
     * Read the micro:bit pin voltage in mV.
     */
    //% blockId=acs712_read_pin_voltage block="ACS712 pin voltage on %pin (mV)"
    //% pin.defl=AnalogPin.P0
    //% group="Readings"
    //% advanced=true
    export function readPinVoltage(pin: AnalogPin): number {
        return readPinVoltageMv(pin)
    }

    /**
     * Read DC current in amps.
     */
    //% blockId=acs712_read_current block="ACS712 current on %pin (A)"
    //% pin.defl=AnalogPin.P0
    //% group="Readings"
    export function readCurrent(pin: AnalogPin): number {
        return currentFromPinVoltageMv(readPinVoltageMv(pin))
    }

    /**
     * Read DC current in milliamps.
     */
    //% blockId=acs712_read_current_ma block="ACS712 current on %pin (mA)"
    //% pin.defl=AnalogPin.P0
    //% group="Readings"
    //% advanced=true
    export function readCurrentMilliAmps(pin: AnalogPin): number {
        return readCurrent(pin) * 1000
    }

    /**
     * Estimate RMS current by sampling the waveform.
     * Useful for AC or noisy signals.
     */
    //% blockId=acs712_read_rms_current block="ACS712 RMS current on %pin with %samples samples every %samplePeriodUs us (A)"
    //% pin.defl=AnalogPin.P0
    //% samples.defl=200
    //% samplePeriodUs.defl=500
    //% group="Readings"
    //% advanced=true
    export function readRmsCurrent(pin: AnalogPin, samples: number = 200, samplePeriodUs: number = 500): number {
        samples = clampSamples(samples)
        samplePeriodUs = clampMicros(samplePeriodUs)

        let sumSquares = 0
        for (let i = 0; i < samples; i++) {
            let current = currentFromPinVoltageMv(readPinVoltageMv(pin))
            sumSquares += current * current
            control.waitMicros(samplePeriodUs)
        }
        return Math.sqrt(sumSquares / samples)
    }
}
