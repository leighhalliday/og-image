import { launch, Page } from "puppeteer-core";
import { getOptions as getLaunchOptions } from "./options";
let _page: Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getLaunchOptions(isDev);
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  url: string,
  type: FileType,
  isDev: boolean
) {
  const page = await getPage(isDev);
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url);
  const file = await page.screenshot({ type, quality: 100 });
  return file;
}
