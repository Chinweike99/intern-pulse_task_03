import { Router } from 'express';
import routes from './paymentRoutes.js';
const router = Router();
router.use('/payments', routes);
export default router;
