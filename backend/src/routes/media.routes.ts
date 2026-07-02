import { Router } from 'express';
import * as mediaController from '../controllers/media.controller';
import { authenticate } from '../middleware/authenticate';
import { upload } from '../middleware/upload';
import prisma from '../prisma/client';

const router = Router();

router.use(authenticate);

router.get('/markers/:markerId/media', mediaController.findByMarker);
router.delete('/media/:id', mediaController.remove);

router.post('/media/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nessun file caricato' });
      return;
    }

    const { markerId, type } = req.body;
    if (!markerId || !type) {
      res.status(400).json({ error: 'markerId e type sono richiesti' });
      return;
    }

    const media = await prisma.media.create({
      data: {
        markerId,
        fileUrl: `/uploads/${req.file.filename}`,
        fileType: type,
        fileSize: req.file.size,
      },
    });

    res.status(201).json(media);
  } catch (err) {
    next(err);
  }
});

export default router;
