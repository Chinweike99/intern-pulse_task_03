import { Request, Response } from "express";
import { initatePayment, verifyPayment } from "../services/payment.service";

// Helper function to transform Pastack response to desired format
export const initatePaymentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, amount, email } = req.body;

    if (!email || !amount) {
      res.status(400).json({
        success: false,
        message: "Please provide email and amount",
      });
      return;
    }

    const paymentData = await initatePayment({ name, amount, email });
    console.log(
      `Payment initialized for ${name}\namount: ${amount}\nemail: ${email}`
    );
    res.status(200).json({
      success: true,
      message: "Payment successfull initiated",
      data: paymentData,
    });
    return;
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
    return;
  }
};

export const paymentStatusHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reference } = req.params;
    if (!reference) {
      res.status(400).json({
        success: false,
        message: "Payment reference (reference) is required",
      });
      return;
    }

    const paymentData = await verifyPayment(reference);
    console.log(`Payment status checked for reference: ${reference}`);

    const payment = {
      reference: `PAY-${paymentData.data.customer.customer_code}`,
      customer_name:
        paymentData.data.customer.first_name &&
        paymentData.data.customer.last_name
          ? `${paymentData.data.customer.first_name} ${paymentData.data.customer.last_name}`.trim()
          : "N/A",
      customer_email: paymentData.data.customer.email,
      status: mapPaymentStatus(paymentData.data.status),
    };

    res.status(200).json({
      status: "success",
      message: "Payment detail retrieved successfully",
      payment,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
    return;
  }
};

// Helper function to map Paystack status to your desired status
const mapPaymentStatus = (paystackStatus: string) => {
  const status = paystackStatus.toLowerCase();

  if (status === "success") {
    return "completed";
  } else if (status === "abandoned" || status === "failed") {
    return "failed";
  } else {
    return "pending";
  }
};
