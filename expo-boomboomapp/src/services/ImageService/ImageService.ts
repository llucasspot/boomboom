import { singleton } from "tsyringe";

import { GenericService } from "../GenericService";

@singleton()
export default class ImageService extends GenericService {
  constructor() {
    super();
  }

  buildImageUri(image: File) {
    // @ts-ignore
    const base64 = Buffer.from(image, "binary").toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  }
}
