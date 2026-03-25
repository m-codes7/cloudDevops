## Research Framing

1. Research Question
To what extent does increasing CI/CD automation maturity influence deployment performance
and recovery time (MTTR) in a cloud-native application?

2. Research Objective
To Empirically Evaluate Incremental CI/CD Automation Maturity on Measurable 
Deployment Reliability Outcomes within a controlled Cloud-Native Application.

3. Independent Variable
Level of CI/CD automation maturity, operationalised as staged progression.
- Stage 0 : Manual Deployment
- Stage 1 : CI (automated build + test)
- Stage 2 : CI/CD (automated deployment)
- Stage 3 : CI/CD + monitoring + automated rollback

4. Dependent Variables
- Deployment Duration (seconds)
Measures how fast from deployment to healthy service.

Deployment Duration = healthy timestamp - deployment timestamp

- Mean Time to Recovery (MTTR)
The average time between incident detection and restoration of normal service.

MTTR = Total Downtime for All Incidents / Total Number of Incidents

5. Hypotheses
H1 - Increasing CI/CD automation maturity reduces Change Failure Rate
H2 - Increasing CI/CD automation maturity reduces Mean Time to Recovery

6. Experimental Design Summary
- Single Application
- Progressive automation stages
- Controlled failure injection
- 8-10 deployments per stage
- Statistical comparison (mean, median, variance)
