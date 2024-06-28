/**
 * BOT CODE BELOW
 */
input.onButtonPressed(Button.A, function () {
	
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    basic.showIcon(IconNames.Heart)
    radio.sendValue("message", input.runningTime())
    basic.pause(100)
    basic.clearScreen()
})
radio.onReceivedString(function (receivedString) {
    Connected.showUserText(7, receivedString)
})
input.onButtonPressed(Button.B, function () {
	
})
radio.onReceivedValue(function (name, value) {
    Connected.showUserText(3, name)
    Connected.showUserNumber(4, value)
})
let hits = 0
let lastHitWasRed = false
let isRed = false
neZha.setServoSpeed(neZha.ServoList.S1, 1)
neZha.setServoSpeed(neZha.ServoList.S2, 1)
neZha.setServoAngle(neZha.ServoTypeList._270, neZha.ServoList.S1, 130)
neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S2, 200)
basic.pause(2000)
neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S2, 160)
neZha.setServoAngle(neZha.ServoTypeList._270, neZha.ServoList.S1, 150)
basic.pause(2000)
neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S2, 185)
neZha.setServoAngle(neZha.ServoTypeList._270, neZha.ServoList.S1, 140)
radio.setGroup(80)
basic.showIcon(IconNames.Heart)
let strip = Connected.create(Connected.DigitalRJPin.J3, 8, Connected.NeoPixelMode.RGB)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Blue))
let hitsRequired = 2
Connected.MP3SetPort(Connected.DigitalRJPin.J4)
Connected.setVolume(15)
Connected.folderPlay("01", "007")
Connected.showUserText(8, "goodbye daisy")
basic.pause(2000)
basic.showIcon(IconNames.Happy)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Black))
Connected.execute(Connected.playType.Stop)
basic.forever(function () {
    isRed = Connected.checkColor(Connected.ColorList.red)
    Connected.showUserText(8, convertToText(isRed))
    if (isRed) {
        if (hits == hitsRequired) {
            Connected.setVolume(20)
            Connected.folderPlay("01", "004")
            basic.showIcon(IconNames.Sad)
            strip.showColor(Connected.colors(Connected.NeoPixelColors.Red))
        }
        if (!(lastHitWasRed)) {
            Connected.setVolume(25)
            Connected.folderPlay("01", "001")
            basic.showIcon(IconNames.Angry)
        }
        hits = hits + 1
        Connected.showUserNumber(2, hits)
    } else if (lastHitWasRed) {
        basic.showIcon(IconNames.Happy)
        hits = 0
        strip.showColor(Connected.colors(Connected.NeoPixelColors.Black))
    }
    lastHitWasRed = isRed
})
