const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

const mysql_tools = require('./mysql_tools');
var dbconn = require('./DBConn').dbconn;

function sendNotification(title, body, image)
{
  const message = {
    notification: {
      title: title,
      body: body
    },
    android: {
      notification: {
        imageUrl: image
      }
    },
    apns: {
      payload: {
        aps: {
          'mutable-content': 1
        }
      },
      fcm_options: {
        image: image
      }
    },
    topic: 'slotgame'
    // token: registrationToken
  };

  getMessaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}

function startMonitoring()
{
  var admin = require("firebase-admin");
  var serviceAccount = require("./service-account.json");
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'slotgame-a0342',
  });

  setInterval(async () => {
    var notification = await mysql_tools.sendQuery(dbconn, "SELECT * FROM w_posts WHERE type = 3 and is_del = 0 ORDER BY id DESC LIMIT 1");
    if(notification.length > 0)
    {
      var title = notification[0].title;
      var content = notification[0].content;
      var image = notification[0].url;
      sendNotification(title, content, image);
      mysql_tools.sendQuery(dbconn, "UPDATE w_posts SET is_del = 1 WHERE type = 3 and is_del = 0");
    }
  }, 3000);
  // sendNotification("title", "content", "https://www.vsgames777.com/storage/uploads/1679092568.jpg");
}

startMonitoring();