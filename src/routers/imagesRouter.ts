import { Router } from 'express';
import * as path from 'path';

const imagesRouter = Router();
imagesRouter.get('/image/:filePath', (req, res) => {
  const imageName = req.params.filePath;
  const imagePath = path.join(process.cwd(), '/uploads/', imageName);

  res.sendFile(imagePath);
});

export default imagesRouter;
