const webpush = require("web-push")

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env

webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:helloyonicb@gmail.com',
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);
module.exports = webpush