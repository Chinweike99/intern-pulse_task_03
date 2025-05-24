import { Router } from "express";
import { initatePaymentHandler, paymentStatusHandler } from "../../controllers/payment.controllers";
const router = Router();
router.post('/', initatePaymentHandler);
router.get('/:reference', paymentStatusHandler);
export default router;
