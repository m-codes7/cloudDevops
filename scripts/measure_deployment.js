//logger script

const fs = require("node:fs");
const path = require("node:path");

//ensure logging script finds the correct CSV file no matter where command is run from
const CSV_PATH = path.resolve(process.cwd(), "data", "experiment_log.csv");

function nowIso() {
 return new Date().toISOString();
}

function sleep(ms) {
 return new Promise((r) => setTimeout(r, ms));
}

//create health check
async function checkHealth(url) {
 try {
   const res = await fetch(url, { method: "GET" });
   return res.status === 200;
 } catch {
   return false;
 }
}

function appendCsvRow(row) {
 const line = Object.values(row)
  .map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`)
  .join(",") + "\n";
 fs.appendFileSync(CSV_PATH, line, "utf8");
}

function parseArgs() {
 const args = process.argv.slice(2);

 const get = (name, def) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=", 2)[1] : def;
 };

 return {
  stage: get("stage", "0"),
  url: get("url", "http://localhost:3000/health"),
  injectionType: get("injection", "none"),
  rollbackUsed: get("rollback", "manual"),
 };
}

async function main() {
  //ensure csv exists
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`CSV not found at ${CSV_PATH}. Create data/experiment_log.csv first.`);
  }
 
  //Get run configuration
  const { stage, url, injectionType, rollbackUsed } = parseArgs();
  
  //Create identifies + start time
  const deploymentId = `stage${stage}-${Date.now()}`;
  const startTs = nowIso();
  
  //Get protocol constants
  const validationWindowMs = 5 * 60 * 1000;
  const pollEveryMs = 1000;
  const stablePeriodMs = 120 * 1000;

  //variables filled during run
  let detectionTs = "";
  let recoveryTs = "";
  let stableStart = null;
  let firstHealthyTs = "";
  let deploymentDurationSeconds = "";
  let armed = false;

  const endAt = Date.now() + validationWindowMs;

  //polling loop
  while (Date.now() < endAt) {
    const ok = await checkHealth(url);

    //record first time service becomes healthy
    if (ok && !firstHealthyTs) {
      firstHealthyTs = nowIso();
      const st = new Date(startTs).getTime();
      const fh = new Date(firstHealthyTs).getTime();
      deploymentDurationSeconds = String(Math.round((fh - st) / 1000));
      
      armed = true;
      console.log("[arm] baseline healthy observed");
    }    

    //failure detection
    if (armed && !ok && !detectionTs) {
      detectionTs = nowIso();
      stableStart = null;
      console.log(`[detect] failure at ${detectionTs}`);
    }

    //recovery detection
    if (ok) {
      if (armed && detectionTs) {
	if (stableStart === null) stableStart = Date.now();

	const stableFor = Date.now() - stableStart;
	console.log(`[recover-check] stable for ${Math.round(stableFor / 1000)}s`);
	
	if (stableFor >= stablePeriodMs) {
	  recoveryTs = nowIso();
	  console.log(`[recover] recovery at ${recoveryTs}`);
	  break;
	}
      } else {
	console.log(`[ok] healthy`);
      }
    } else {
      console.log(`[bad] unhealthy`);
      stableStart = null;
    }
    
    await sleep(pollEveryMs);
   }

   //Compute results
   const failedDeployment = detectionTs ? "true" : "false";

   let recoveryDurationSeconds = "";
   if (detectionTs && recoveryTs) {
     const dt = new Date(detectionTs).getTime();
     const rt = new Date(recoveryTs).getTime();
     recoveryDurationSeconds = String(Math.round((rt - dt) / 1000));
   }

   const row = {
	stage,
	deployment_id: deploymentId,
	injection_type: injectionType,
	deployment_start_timestamp: startTs,
	failed_deployment: failedDeployment,
	detection_timestamp: detectionTs,
	recovery_timestamp: recoveryTs,
	recovery_duration_seconds: recoveryDurationSeconds,
	rollback_used: rollbackUsed,
	first_healthy_timestamp: firstHealthyTs,
	deployment_duration_seconds: deploymentDurationSeconds
   };

   appendCsvRow(row);

   console.log("\nLogged row to CSV:");
   console.log(row);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
