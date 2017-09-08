var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit3140-a3.firebaseio.com"
});

var db = admin.database()
var ref = db.ref('/motionCount')

var five = require("johnny-five")
var board = new five.Board()


board.on("ready", function () {
  // interfaces for led and motion detector
  var led = new five.Led(13)
  var motion = new five.Motion(6)
  // used to measure time
  var startTime = null
  var endTime = null

  // turn LED on and measure starting time
  motion.on("motionstart", function () {
      led.on()
      startTime = new Date().toISOString()
  })

  // calculate time motion was detected using end time of motion
  motion.on("motionend", function () {
      led.off()
      endTime = new Date().toISOString()
      if (startTime != null) {
        //add to firebase
            ref.push({
              start: startTime,
              end: endTime
            })
          }
         })
    })