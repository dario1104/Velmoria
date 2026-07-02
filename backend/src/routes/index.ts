import { Router } from 'express';
import authRoutes from './auth.routes';
import tripsRoutes from './trips.routes';
import gpsRoutes from './gps.routes';
import markersRoutes from './markers.routes';
import mediaRoutes from './media.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/trips', tripsRoutes);
router.use('/', gpsRoutes);
router.use('/', markersRoutes);
router.use('/', mediaRoutes);

export default router;
