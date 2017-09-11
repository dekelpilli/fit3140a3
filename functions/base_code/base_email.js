var gmail = require("./email-info.json")
var auth = require("./gmail-nodejs-quickstart.json")
var nodemailer = require("nodemailer")

module.exports = {
    // sends email
    sendMail: function (subject, message, transporter) {
        var mailOptions = {
            from: gmail.username, // sender address
            to: gmail.username, // list of receivers
            subject: subject, // Subject line
            text: message // plain text body
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId)
        })
    },

    receive: function (snapshot) {

        var motions = []
        var longMotionCount = 0
        var shortMotionCount = 0

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: gmail.username,
                pass: gmail.password
            }
        })

        // iterating through each motion, 
        // categorising based on length, and adding it to an array
        snapshot.forEach(function (motion) {
            motionLength = parseFloat(motion.val().end) - parseFloat(motion.val().start)
            // converting to seconds
            motionLength = Math.round(motionLength / 1000)
            if (motionLength > 5.0) {
                longMotionCount++
            } else {
                shortMotionCount++
            }
            motions.push(motionLength)
        })

        // getting the latest motion, and sending an email if it was long
        lastMotionLength = motions[motions.length - 1]
        if (lastMotionLength  > 5.0) {
            module.exports.sendMail("Long Motion", "A long motion has occurred.", transporter)
        }

        module.exports.sendMail("Motion report", longMotionCount + " long motions, and "
            + shortMotionCount + " short motions have been detected in total.", transporter)
    }
}