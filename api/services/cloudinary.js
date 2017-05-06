import config from '../config/auth';
import Datauri from 'datauri';
import path from "path";
import cloudinary from 'cloudinary';
import File from '../models/attachment';

let dUri = new Datauri();
cloudinary.config(config.cloudinary);
export default function(file, owner) {
      dUri.format(path.extname(file.originalname).toString(), file.buffer);
      return cloudinary.uploader
          .upload(dUri.content)
          .then((f) => {
              return File.create({
                  url: f.url,
                  format: f.format,
                  type: f.resource_type,
                  owner: owner
              });
          });
}
