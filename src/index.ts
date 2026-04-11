import express from "express";

const app = express();
app.use(express.json());

let failHealth = false;

app.get("/health", (_req, res) => {
  console.log("Health check hit", { failHealth });

  if (failHealth) {
    return res.status(500).json({ status: "error", reason: "runtime failure injected" });
  }

  return res.status(200).json({ status: "ok" });
});

app.post("/inject-failure", (_req, res) => {
  failHealth = true;
  console.log("Failure injected");
  return res.status(200).json({ status: "ok", message: "failure injected" });
});

app.post("/reset-health", (_req, res) => {
  failHealth = false;
  console.log("Health reset");
  return res.status(200).json({ status: "ok", message: "health reset" });
});

app.get("/", (_req, res) => {
  res.status(200).send("Diary app is running.");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
