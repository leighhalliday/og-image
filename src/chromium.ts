import { launch } from "puppeteer-core";
import { getLaunchOptions } from "./options";

async function getPage(isDev: boolean) {
  const options = await getLaunchOptions(isDev);
  const browser = await launch(options);
  return browser.newPage();
}

export async function getScreenshot(url: string, isDev: boolean) {
  const page = await getPage(isDev);
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url);
  return await page.screenshot({ type: "jpeg", quality: 100 });
}
