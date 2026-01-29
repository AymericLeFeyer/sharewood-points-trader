const datasource = require("./datasource");
const mattermost = require("./utils/mattermost");

exports.tradeSharewoodPoints = async () => {
  console.log("🌐 Fetching Sharewood data...");

  const option = process.env.SHAREWOOD_TRADE_OPTION;
  const data = await datasource.openSharewoodAndTradePoints(option);

  console.log(data)

  const message = `✅ Le bot sharewood est passé !
    - Points restants : ${data.points}
    - Capacité de Téléchargement : ${data.download_capacity}
    - Uploadé : ${data.uploaded}
    - Téléchargé : ${data.downloaded}
    - Ratio : ${data.ratio}
    `;

  await mattermost.sendMattermostNotification(message);

  return data;
};
