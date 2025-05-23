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
      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveProperty("Authorization_url");
      expect(response.body.data).toHaveProperty("access_code");
      expect(response.body.data).toHaveProperty("reference");
    });

    it("should return error for missing email", async () => {
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        amout: 4000,
      });
      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });

    it("should return error for missing amount", async () => {
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        email: "samuel.doe@gmail.com",
      });
      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });

  describe("GET /api/v1/payments/:id", () => {
    it("should retrieve payment status", async () => {
      // Initiate a payment to get an ID
      const response = await request(app).post("/api/v1/payments").send({
        name: "Samuel Doe",
        email: "samuel.doe@gmail.com",
        amlount: 5000,
      });

      const id = response.body.data.id;

      const retrieveStatus = await request(app).get(`/api/v1/${id}`);
      expect(retrieveStatus.status).toBe(200);
      expect(retrieveStatus.body.status).toBe("success");
      expect(retrieveStatus.body.payment).toHaveProperty("id", id);
      expect(retrieveStatus.body.payment).toHaveProperty("status");
    });

    it("should return error for invalid reference (id)", async () => {
      const response = await request(app).get("/api/v1/payments/invalid-id");
      expect(response.status).toBe(500);
      expect(response.body.status).toBe("error");
    });
  });
});
