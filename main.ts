joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    pressTime = input.runningTime()
    if (pressTime - lastE > 40) {
        lastE = pressTime
        radio.sendValue("joyButton", 3)
    }
})
input.onButtonPressed(Button.A, function () {
    pressTime = input.runningTime()
    if (pressTime - lastA > 40) {
        lastA = pressTime
        radio.sendValue("joyButton", 5)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    pressTime = input.runningTime()
    if (pressTime - lastF > 40) {
        lastF = pressTime
        radio.sendValue("joyButton", 4)
    }
})
input.onButtonPressed(Button.B, function () {
    pressTime = input.runningTime()
    if (pressTime - lastB > 40) {
        radio.sendValue("joyButton", 6)
        lastB = pressTime
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    pressTime = input.runningTime()
    if (pressTime - lastD > 40) {
        joystickbit.Vibration_Motor(100)
        lastD = pressTime
        radio.sendValue("joyButton", 2)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    joystickbit.Vibration_Motor(100)
    pressTime = input.runningTime()
    if (pressTime - lastC > 40) {
        lastC = pressTime
        radio.sendValue("joyButton", 1)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue("joyButton", 7)
})
let isUp = false
let isLeft = false
let magnitude = 0
let isLeftRight = false
let inDeadzone = false
let theY = 0
let theX = 0
let pressTime = 0
let lastF = 0
let lastE = 0
let lastD = 0
let lastC = 0
let lastB = 0
let lastA = 0
radio.setGroup(80)
joystickbit.initJoystickBit()
let deadzone = 20
lastA = input.runningTime()
lastB = input.runningTime()
lastC = input.runningTime()
lastD = input.runningTime()
lastE = input.runningTime()
lastF = input.runningTime()
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
    theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    inDeadzone = Math.abs(512 - theX) < deadzone && Math.abs(512 - theY) < deadzone
    if (inDeadzone) {
        basic.pause(2)
    } else {
        isLeftRight = Math.abs(512 - theX) > Math.abs(512 - theY)
        if (isLeftRight) {
            while (!(inDeadzone)) {
                theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
                inDeadzone = Math.abs(512 - theX) < deadzone
                magnitude = Math.round(Math.map(Math.abs(512 - theX), 0, 512, 0, 100))
                isLeft = theX > 512
                if (isLeft) {
                    radio.sendValue("joyLeft", magnitude)
                } else {
                    radio.sendValue("joyRight", magnitude)
                }
            }
            for (let index = 0; index < 10; index++) {
                radio.sendValue("joyCenter", 1)
            }
            basic.pause(100)
        } else if (!(isLeftRight)) {
            while (!(inDeadzone)) {
                theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
                inDeadzone = Math.abs(512 - theY) < deadzone
                magnitude = Math.round(Math.map(Math.abs(512 - theY), 0, 512, 0, 100))
                isUp = theY > 512
                if (isUp) {
                    radio.sendValue("joyUp", magnitude)
                } else {
                    radio.sendValue("joyDown", magnitude)
                }
            }
            for (let index = 0; index < 10; index++) {
                radio.sendValue("joyCenter", 1)
            }
            basic.pause(100)
        }
    }
})
