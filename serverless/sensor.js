var admin = require("firebase-admin");
const functions = require('firebase-functions');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit3140-a3.firebaseio.com"
});

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit3140-a3.firebaseio.com"
});

var db = admin.database()

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
      startTime = new Date().getTime()
  })

  // calculate time motion was detected using end time of motion
  motion.on("motionend", function () {
      led.off()
      endTime = new Date().getTime()
      if (startTime != null) {
        //add to firebase
        exports.updateData=functions.database.ref('/motionCount').push({
          start: startTime,
          end: endTime
        })
    }
  })
})
