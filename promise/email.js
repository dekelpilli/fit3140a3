var admin = require("firebase-admin")
var serviceAccount = require("../serviceAccountKey.json")
var email = require("../functions/base_code/base_email.js")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fit3140-a3.firebaseio.com"
})

var db = admin.database()
var ref = db.ref("/motionCount")

ref.on("value", function (snapshot) {
    email.receive(snapshot)
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
})

// ref.push({
//     end: "1505042630663",
//     start: "1505042628836"
// })