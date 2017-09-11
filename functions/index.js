var admin = require("firebase-functions")
var email = require("../base_code/base_email.js")

exports.updateData = functions.database.ref('/motionCount')
    .onValue(snapshot => {
        email.receive(snapshot)
    })