import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
	// if FAIL_HEALTH=true, deliberately report the service as unhealthy
	const failHealth = (process.env.FAIL_HEALTH || "").toLowerCase() === "true";
	
	console.log("Health check hit", { failHealth });

	if (failHealth) {
	return res.status(500).json({ status: "error", reason: "FAIL_HEALTH=true" });
	}
	
	return res.status(200).json({ status: "ok" });
});

app.get("/", (_req, res) => {
	res.status(200).send("Diary app is running.");
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
