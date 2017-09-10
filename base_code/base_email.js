function email() {
    var motions = []
    var longMotionCount = 0
    var shortMotionCount = 0
    
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hfuovg6xu7llkfck@ethereal.email',
            pass: 'ScyPuBjkG3jwHKsCjr'
        }
    })
    
    // sends email
    function sendMail(subject, message) {
        var mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
            to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
            subject: subject, // Subject line
            text: message // plain text body
        }
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId)
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        })
    }
    
    // iterating through each motion, 
    // categorising based on length, and adding it to an array
    snapshot.forEach(function (motion) {
        motionLength = parseFloat(motion.val().endTime) - parseFloat(motion.val().startTime)
        if (motionLength > 5.0) {
            longMotionCount++
        } else {
            shortMotionCount++
        }
        motions.push(motion)
    })
    
    // getting the latest motion, and sending an email if it was long
    lastMotion = motions[motions.length - 1].val()
    lastMotionLength = parseFloat(lastMotion.endTime) - parseFloat(lastMotion.startTime)
    if (lastMotionLength > 5.0) {
        sendMail("Long Motion", "A long motion has occurred.")
    }
    
    sendMail("Motion report", longMotionCount + " long motions, and "
            + shortMotionCount + " short motions have been detected in total.")    
}