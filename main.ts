joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    radioThrottle("joyButton", 3)
})
input.onButtonPressed(Button.A, function () {
    radioThrottle("joyButton", 5)
})
function radioThrottle (theString: string, theNumber: number) {
    requestTime = input.runningTime()
    if (theString == "joyButton") {
        if (!(theNumber == throttleLastNumber && requestTime - throttleLastSend < 100)) {
            radio.sendValue(theString, theNumber)
        }
    } else {
        if (theString == throttleLastString && theNumber == throttleLastNumber) {
            basic.pause(0)
        } else {
            radio.sendValue(theString, theNumber)
        }
    }
    throttleLastSend = requestTime
    throttleLastString = theString
    throttleLastNumber = theNumber
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    radioThrottle("joyButton", 4)
})
input.onButtonPressed(Button.AB, function () {
    radioThrottle("joyButton", 7)
})
input.onButtonPressed(Button.B, function () {
    radioThrottle("joyButton", 6)
})
radio.onReceivedValue(function (name, value) {
    if (name == "joyVibrate") {
        joystickbit.Vibration_Motor(value)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    radioThrottle("joyButton", 2)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    radioThrottle("joyButton", 1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radioThrottle("joyButton", 8)
})
let requestTime = 0
let isUp = false
let isLeft = false
let magnitude = 0
let isLeftRight = false
let inDeadzone = false
let theY = 0
let theX = 0
let throttleLastSend = 0
let throttleLastNumber = 0
let throttleLastString = ""
radio.setGroup(80)
joystickbit.initJoystickBit()
let deadzone = 20
throttleLastString = ""
throttleLastNumber = 0
throttleLastSend = 0
while (true) {
    theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
    theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    inDeadzone = Math.abs(512 - theX) < deadzone && Math.abs(512 - theY) < deadzone
    if (inDeadzone) {
        basic.pause(50)
    } else {
        isLeftRight = Math.abs(512 - theX) > Math.abs(512 - theY)
        if (isLeftRight) {
            while (!(inDeadzone)) {
                theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
                inDeadzone = Math.abs(512 - theX) < deadzone
                magnitude = Math.round(Math.round(Math.map(Math.abs(512 - theX), 0, 512, 0, 3)))
                isLeft = theX > 512
                if (isLeft) {
                    radioThrottle("joyLeft", magnitude)
                } else {
                    radioThrottle("joyRight", magnitude)
                }
            }
            radioThrottle("joyCenter", 1)
            basic.pause(50)
        } else if (!(isLeftRight)) {
            while (!(inDeadzone)) {
                theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
                inDeadzone = Math.abs(512 - theY) < deadzone
                magnitude = Math.round(Math.round(Math.map(Math.abs(512 - theY), 0, 512, 0, 3)))
                isUp = theY > 512
                if (isUp) {
                    radioThrottle("joyUp", magnitude)
                } else {
                    radioThrottle("joyDown", magnitude)
                }
            }
            radioThrottle("joyCenter", 1)
            basic.pause(50)
        }
    }
}
basic.forever(function () {
	
})
