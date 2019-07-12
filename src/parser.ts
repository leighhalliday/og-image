import { IncomingMessage } from "http";
import { parse } from "url";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);

  const { query = {} } = parse(req.url || "", true);
  const { title, author, debug, image, website } = query;

  if (Array.isArray(title)) {
    throw new Error("Expected a single title");
  }
  if (Array.isArray(author)) {
    throw new Error("Expected a single author");
  }
  if (Array.isArray(image)) {
    throw new Error("Expected a single image");
  }
  if (Array.isArray(website)) {
    throw new Error("Expected a single website");
  }

  const parsedRequest: ParsedRequest = {
    title,
    author,
    image,
    website,
    debug: debug ? true : false
  };

  console.log(JSON.stringify(parsedRequest));

  return parsedRequest;
}
