const { firefox } = require("playwright-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const stealth = StealthPlugin();
stealth.enabledEvasions.delete("user-agent-override");

firefox.use(stealth);

exports.openSharewoodAndTradePoints = async (option) => {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // open url
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("https://www.sharewood.tv/torrents");
    await page.fill("#username", process.env.SHAREWOOD_LOGIN);
    await page.fill("#password", process.env.SHAREWOOD_PASSWORD);
    await page.click("#login-button");
    await page.waitForSelector("#bs-example-navbar-collapse-1", {
      timeout: 100000,
    });
    await page.goto(
      `https://www.sharewood.tv/bonus/${process.env.SHAREWOOD_LOGIN}`,
    );

    console.log(
      `🌐 Tentative d'échange des points Sharewood pour l'option ${option}...`,
    );

    // scroll to bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    const buttons = page.getByRole("button", { name: /échange/i });
    await buttons.nth(option - 1).click();

    let points = (
      await page.textContent(
        'xpath=//*[@id="app"]/div/div[2]/div/div[2]/div[1]/h2',
      )
    )
      .replace("Vos Points: ", "")
      .trim();

    // go back to https://www.sharewood.tv/
    await page.goto("https://www.sharewood.tv/");

    // get this info //*[@id="hoe-header"]/div/div[2]/div/div/div/ul/li[4]/text()
    const data = {
      points: points,
      download_capacity: (
        await page.textContent(
          'xpath=//*[@id="hoe-header"]/div/div[2]/div/div/div/ul/li[4]',
        )
      )
        .replace("Capacité de Téléchargement", "")
        .trim()
        .replace(":", "")
        .trim(),
      uploaded: (
        await page.textContent(
          'xpath=//*[@id="hoe-header"]/div/div[2]/div/div/div/ul/li[1]',
        )
      )
        .replace("Uploadé", "")
        .trim()
        .replace(":", "")
        .trim(),
      downloaded: (
        await page.textContent(
          'xpath=//*[@id="hoe-header"]/div/div[2]/div/div/div/ul/li[2]',
        )
      )
        .replace("Téléchargé", "")
        .trim()
        .replace(":", "")
        .trim(),
      ratio: (
        await page.textContent(
          'xpath=//*[@id="hoe-header"]/div/div[2]/div/div/div/ul/li[3]',
        )
      )
        .replace("Ratio", "")
        .trim()
        .replace(":", "")
        .trim(),
    };

    await browser.close();
    return data;
  } catch (error) {
    console.error("❌ Erreur", error.message);
    browser.close();
  }
};
