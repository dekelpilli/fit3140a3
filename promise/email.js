var admin = require("firebase-admin")
var nodemailer = require("nodemailer")

var serviceAccount = require("../serviceAccountKey.json")
var email = require("../base_code/base_email.js")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fit3140-a3.firebaseio.com"
})

var db = admin.database()
var ref = db.ref("/")
var ref = db.ref("/motionCount")

ref.on("value", function (snapshot) {
    email.email()
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
})

// ref.push({
//     startTime: 1,
//     endTime: 10
// })

// ref.push({
//     startTime: 11,
//     endTime: 13
// })

// ref.push({
//     startTime: 15,
//     endTime: 25
// })