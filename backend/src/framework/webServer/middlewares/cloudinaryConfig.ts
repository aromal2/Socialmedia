import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const postImages = {
  cloudinary: cloudinary,
  params: {
    folder: "selectedfile",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
      "gif",
      "jfif",
      "webp",
      "gif",
      "mp4",
      "mpeg",
    ],

    public_id: (req: any, file: any) => {
      const originalname = file.originalname.split(".");
      return `post-${Date.now()}-${originalname[0]}`;
    },
  },
};

const postStorage = new CloudinaryStorage(postImages);

export const uploadPhoto = multer({ storage: postStorage }).single(
  "selectedfile"
);
