import { initatePayment, verifyPayment } from "../services/payment.service";
export const initatePaymentHandler = async (req, res) => {
    try {
        const { name, amount, email } = req.body;
        if (!email || !amount) {
            res.status(400).json({
                success: false,
                message: "Please provide email and amount"
            });
            return;
        }
        const paymentData = await initatePayment({ name, amount, email });
        console.log(`Payment initialized for ${name}, amount: ${amount}, email: ${email}`);
        res.status(200).json({
            success: true,
            message: "Payment successfull initiated",
            data: paymentData
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "Internal Server Error"
        });
    }
};
export const paymentStatusHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Payment reference (id) is required"
            });
            return;
        }
        const paymentData = await verifyPayment(id);
        console.log(`Payment status checked for reference: ${id}`);
        res.status(200).json({
            status: "success",
            message: "Payment detail retrieved successfully",
            paymentData
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error || 'Internal server error',
        });
    }
};
