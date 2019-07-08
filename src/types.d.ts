type FileType = "png" | "jpeg";

interface ParsedRequest {
  fileType: FileType;
  title: string;
  author: string;
  image: string;
  website: string;
  debug: boolean;
}
