import { IncomingMessage, ServerResponse } from "http";
import { parseRequest } from "./parser";
import { getScreenshot } from "./chromium";
import { getHtml } from "./template";
import { writeTempFile, pathToFileURL } from "./file";

const isDev = process.env.NOW_REGION === "dev1";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReq = parseRequest(req);
    const html = getHtml(parsedReq);
    if (parsedReq.debug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const { title, author, fileType } = parsedReq;
    const fileName = `${author}-${title}`;
    const filePath = await writeTempFile(fileName, html);
    const fileUrl = pathToFileURL(filePath);
    const file = await getScreenshot(fileUrl, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=21600, max-age=21600`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
