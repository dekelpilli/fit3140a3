var admin = require("firebase-functions")

exports.updateData = functions.database.ref(`motionCount/{id}`)
    .onWrite(event => {
        const msgKey = event.data.key;
        const msgVal = event.data.val();
        console.log('Key:' + event.data.key);
        console.log('Data:' + JSON.stringify(msgVal));
        // const mynewValue = msgVal.data + "  new Update";
        // return event.data.ref.child("newAtt").set(mynewValue);
    })

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from FIT3140!");
//   console.log('This is HelloWorld Function')
// });