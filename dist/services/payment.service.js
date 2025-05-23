import axios from "axios";
import config from "../config/config";
const paystack = axios.create({
    baseURL: config.PAYSTACK_BASE_URL,
    headers: {
        Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
    },
});
// Initiate Payment
export const initatePayment = async (paymentData) => {
    try {
        const response = await paystack.post("/transaction/initialize", {
            name: paymentData.name,
            amount: paymentData.amount * 100,
            email: paymentData.email,
        });
        return {
            success: true,
            message: "Payment was successfully Initialized",
            data: response.data,
        };
    }
    catch (error) {
        console.log("Payment initializaton failed: ", error);
        throw error;
    }
};
export const verifyPayment = async (reference) => {
    try {
        const response = await paystack.get(`/transaction/verify/${reference}`);
        // return response.data as PaymentResponse;
        return response.data;
    }
    catch (error) {
        console.log("Error verifying payment", error);
        throw error;
    }
};
// Verify Payment
// export const verifyPayment = async (
//   reference: string
// ): Promise<PaymentResponse> => {
//   try {
//     const response = await paystack.get(`/transaction/verify/${reference}`);
//     // return response?.data || null;
//     const data = response?.data;
//     const customer = data?.customer || {};
//     const name =
//       `${customer.first_name || ""} ${customer.last_name || ""}`.trim() ||
//       "N/A";
//     const email = customer.email || "N/A";
//     const status =
//       data?.status === "success"
//         ? "completed"
//         : data?.status === "abandoned"
//           ? "failed"
//           : "pending";
//     return {
//       id: `PAY-${customer.id || "unknown"}`,
//       name,
//       email,
//       amount: data?.amount || 0,
//       status,
//       reference: data?.reference,
//       created_at: new Date(data?.created_at),
//     };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.message || "Payment verification failed"
//       );
//     }
//     throw new Error("Payment verification failed");
//   }
// };
