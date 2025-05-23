import { Router } from 'express';
import routes from './paymentRoutes';
const router = Router();
router.use('/payments', routes);
export default router;
