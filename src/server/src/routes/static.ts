import { Router } from "express";
import { parseIdStr, use } from "../utils/helpers.js";
import { Image } from "../model/image.js";
const staticRouter = Router();

staticRouter.get(
  "/image/:id",
  use(async (req, res) => {
    const imageId = parseIdStr(req.params.id);
    if (imageId) {
      const image = await Image.findById(imageId);
      if (image) {
        return res
          .contentType(image.mime)
          .end(Buffer.from(image.data), "base64");
      }
    }
    throw new Error("Error occurred while trying to fetch the image");
  })
);

export default staticRouter;
