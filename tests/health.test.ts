import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

let failHealth = false;

app.get("/health", (_req, res) => {
  if (failHealth) {
    return res.status(500).json({ status: "error" });
  }
  return res.status(200).json({ status: "ok" });
});

app.post("/inject-failure", (_req, res) => {
  failHealth = true;
  return res.status(200).json({ status: "ok" });
});

app.post("/reset-health", (_req, res) => {
  failHealth = false;
  return res.status(200).json({ status: "ok" });
});

describe("Health endpoint", () => {
  it("returns 200 when healthy", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("returns 500 after failure injection", async () => {
    await request(app).post("/inject-failure");
    const res = await request(app).get("/health");
    expect(res.status).toBe(500);
  });

  it("returns 200 after health reset", async () => {
    await request(app).post("/reset-health");
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });
});
