var authInfo = require("./email-info.json")
var nodemailer = require("nodemailer")

module.exports = {
    // sends email
    // TO CHECK:
    // user: 'erdciqdkwzmf3eh6@ethereal.email',
    // pass: 'Jm1ddE7yy8Wt1jkdgg'
    sendMail: function (subject, message, transporter) {
        var mailOptions = {
            from: authInfo.username, // sender address
            to: 'erdciqdkwzmf3eh6@ethereal.email', // list of receivers
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

    receive: function (snapshot, nodemailer) {

        var motions = []
        var longMotionCount = 0
        var shortMotionCount = 0

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: authInfo.username,
                pass: authInfo.password
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