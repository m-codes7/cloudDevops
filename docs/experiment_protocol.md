## Experiment Protocol

#1. Experiment Control

All stages use the same:
- Application codebase
- Runtime environment (OS, Node version, VM specification)
- Cloud region / host machine
- Health validation mechanism

The only systematically varied factor is the delivery automation mechanism.

#2. Deployment Start Definition

Deployment start timestamp is recorded at the moment the deployment command or pipeline
execution is triggered.

For
- Stage 0 -> manual deploy command executed
- Stages 1-3 -> when CI/CD job is triggered (e.g. push/dispatch)

#3. Validation mechanism

A single scripted validation check is used in every stage:

Primary check:
- HTTP request to `/health`
- Expected response: HTTP 200 within timeout threshold

Validation runs immediately after deployment and at fixed intervals during the validation
window.

Validation window: 5 minutes post deployment.

This same check is used to:
- Detect failure
- Confirm recovery

#4. Failure Detection Rule

An incident is detected when:
- The health check fails (non-200 or timeout)

Detection timestamp:
- Time of first failed health check after deployment

A deployment is marked as failed if:
- Health check fails within the validation window, OR
- Rollback is required to restore service

#5. Recovery Rule
Recovery is complete when:
- Health check returns HTTP 200 continuously for 120 seconds

Recovery timestamp:
- Time of first successful health check in the stable period

MTTR is computed using:
recovery_duration = recovery_timestamp - detection_timestamp

MTTR per stage is calculated as the average of recovery_duration values across all incidents
in that stage.

#6. Failure Injection Method

Failure trials are pre-determined and consistent across stages.

Chosen injection type:
- Introducing a deterministic code change that forces /health endpoint to return HTTP 500

Number of failure deployments per stage:
- fixed and equal across all stages

Injection timing:
- Applied immediately after deployment completes

#7. Single Deployment Trial Procedure

For each deployment:

1. Execute deployment using stage-specific mechanism
2. Start validation checks
3. If scheduled as failure trial, apply injection
4. Record detection time if failure occurs
5. Restore service:
	- Manual remediation (Stages 0-2)
	- Automated rollback (Stage 3)
6. Confirm recovery using recovery rule
7. Log results

#8. Data Recording

For each deployment, log:

- stage
- deployment_id
- injection_type
- deployment_start_timestamp
- failed_deployment (true/false)
- detection_timestamp (if applicable)
- recovery_timestamp (if applicable)
- recovery_duration (if applicable)
- rollback_used (manual/auto/none)

Data stored in : `data/experiment_log.csv`

#9. Post Experiment Processing

After all stages are completed:
- Compute CFR per stage
- Compute MTTR per stage
- Compare results across stages
