import request from "supertest";
import app from "../app";

describe("Payment API", () => {
  describe("POST /api/v1/payments", () => {
    it("should initiate a payment", async () => {
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        email: "samuel.doe@gmail.com",
        amount: 4000,
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Payment successfull initiated");
      expect(response.body.data).toHaveProperty("data");
      expect(response.body.data.data.data).toHaveProperty("authorization_url");
      expect(response.body.data.data.data).toHaveProperty("access_code");
      expect(response.body.data.data.data).toHaveProperty("reference");
    });

    it("should return error for missing email", async () => {
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        amount: 4000,
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Please provide email and amount");
    });

    it("should return error for missing amount", async () => {
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        email: "samuel.doe@gmail.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Please provide email and amount");
    });
  });

  describe("GET /api/v1/payments/:reference", () => {
    it("should retrieve payment status", async () => {
      const paymentResponse = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        email: "samuel.doe@gmail.com",
        amount: 5000,
      });
      const reference = paymentResponse.body.data.data.data.reference;
      const statusResponse = await request(app).get(
        `/api/v1/payments/${reference}`
      ); // Fixed endpoint

      expect(statusResponse.status).toBe(200);
      expect(statusResponse.body.status).toBe("success");
      expect(statusResponse.body.message).toBe(
        "Payment detail retrieved successfully"
      );
      expect(statusResponse.body.payment).toHaveProperty("reference");
      expect(statusResponse.body.payment).toHaveProperty("status");
      expect(statusResponse.body.payment).toHaveProperty("customer_name");
      expect(statusResponse.body.payment).toHaveProperty("customer_email");
    });

    it("should return error for invalid reference", async () => {
      const response = await request(app).get(
        "/api/v1/payments/invalid-reference"
      );

      expect(response.status).toBe(500);
      expect(response.body.status).toBe("error");
    });
  });
});
