// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// src/routes/v1/index.ts
import { Router as Router2 } from "express";

// src/routes/v1/paymentRoutes.ts
import { Router } from "express";

// src/services/payment.service.ts
import axios from "axios";

// src/config/config.ts
import dotenv from "dotenv";
dotenv.config();
var config = {
  PORT: parseInt(process.env.PORT || "3000"),
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || "",
  PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || "https://api.paystack.co",
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production"
};
if (config.NODE_ENV === "production" && !config.PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack secret key is required in production");
}
var config_default = config;

// src/services/payment.service.ts
var paystack = axios.create({
  baseURL: config_default.PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${config_default.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json"
  }
});
var initatePayment = async (paymentData) => {
  try {
    const response = await paystack.post("/transaction/initialize", {
      name: paymentData.name,
      amount: paymentData.amount * 100,
      email: paymentData.email
    });
    return {
      success: true,
      message: "Payment was successfully Initialized",
      data: response.data
    };
  } catch (error) {
    console.log("Payment initializaton failed: ");
    throw error;
  }
};
var verifyPayment = async (reference) => {
  try {
    const response = await paystack.get(`/transaction/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.log("Error verifying payment");
    throw error;
  }
};

// src/controllers/payment.controllers.ts
var initatePaymentHandler = async (req, res) => {
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
    console.log(
      `Payment initialized for ${name}, amount: ${amount}, email: ${email}`
    );
    res.status(200).json({
      success: true,
      message: "Payment successfull initiated",
      data: paymentData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error || "Internal Server Error"
    });
  }
};
var paymentStatusHandler = async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) {
      res.status(400).json({
        success: false,
        message: "Payment reference (reference) is required"
      });
      return;
    }
    const paymentData = await verifyPayment(reference);
    console.log(`Payment status checked for reference: ${reference}`);
    const payment = {
      reference: `PAY-${paymentData.data.customer.customer_code}`,
      customer_name: paymentData.data.customer.first_name && paymentData.data.customer.last_name ? `${paymentData.data.customer.first_name} ${paymentData.data.customer.last_name}`.trim() : "N/A",
      customer_email: paymentData.data.customer.email,
      status: mapPaymentStatus(paymentData.data.status)
    };
    res.status(200).json({
      status: "success",
      message: "Payment detail retrieved successfully",
      payment
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error || "Internal server error"
    });
  }
};
var mapPaymentStatus = (paystackStatus) => {
  const status = paystackStatus.toLowerCase();
  if (status === "success") {
    return "completed";
  } else if (status === "abandoned" || status === "failed") {
    return "failed";
  } else {
    return "pending";
  }
};

// src/routes/v1/paymentRoutes.ts
var router = Router();
router.post("/", initatePaymentHandler);
router.get("/:reference", paymentStatusHandler);
var paymentRoutes_default = router;

// src/routes/v1/index.ts
var router2 = Router2();
router2.use("/payments", paymentRoutes_default);
var v1_default = router2;

// src/app.ts
var app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var limiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many request sent in 15 minutes. Please try again after 15 minutes."
});
app.use(limiter);
app.use("/api/v1", v1_default);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found"
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
  next();
});
var app_default = app;

// src/index.ts
app_default.listen(config_default.PORT, () => {
  console.log(`
    Server running in ${config_default.NODE_ENV} mode
    Listening on port ${config_default.PORT}
    Paystack API: ${config_default.PAYSTACK_BASE_URL}
    Production mode? ${config_default.IS_PRODUCTION}
  `);
});
