const functions = require("firebase-functions")
const email = require("./base_code/base_email.js")

exports.updateData = functions.database.ref('/motionCount')
    .onWrite(event => {
        email.receive(event.data)
    })