import { Router } from 'express';
import { getDashboaredMetrics } from '../controllers/dashboardControllers';

const router = Router();

router.get('/', getDashboaredMetrics);

export default router;
