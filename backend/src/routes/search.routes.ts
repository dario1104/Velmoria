import { Router } from 'express';
import * as searchController from '../controllers/search.controller';
import { authenticate } from '../middleware/authenticate';
import { searchValidator } from '../validators/search.validators';

const router = Router();

router.use(authenticate);

router.get('/', searchValidator, searchController.search);

export default router;
