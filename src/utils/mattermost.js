const axios = require("axios");

exports.sendMattermostNotification = async (message) => {
  if (!process.env.MATTERMOST_WEBHOOK) {
    console.log(
      "⚠️ MATTERMOST_WEBHOOK not set. Skipping Mattermost notification.",
    );
    return;
  }

  await axios.post(process.env.MATTERMOST_WEBHOOK, {
    text: message,
    username: "Sharewood Bot",
    icon_emoji: ":fox_face:",
    channel: "trackers"
  });
};
