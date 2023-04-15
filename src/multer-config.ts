import multer, { Multer } from 'multer';
import { Request } from 'express';

interface MulterConfig {
  storage: multer.StorageEngine;
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => void;
  limits: {
    fileSize: number;
  };
}

export class MulterErro extends Error {
  properties: object;
  constructor(mensagem: string, properties: object) {
    super(mensagem);
    this.properties = properties;
    this.name = 'MulterErro';
  }
}

const config: MulterConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new MulterErro('Somente arquivos JPG, JPEG e PNG são permitidos.', {
          type: 'ulterErro',
        }),
      );
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
};

const multerInstance: Multer = multer(config);

export default multerInstance;
