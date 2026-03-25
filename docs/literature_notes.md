Grounded academic research

Block A - Operationalisation of DevOps Metrics (CFR & MTTR)

1. A Framework for Automating the Measurement of DevOps Research and Assessment (DORA) Metrics
Author: Brennan Wilkes; Alessandra Maciel Paz Milani ; Margaret-Anne Storey
Year: 11 December 2023
Source: IEEE https://ieeexplore.ieee.org/document/10336287/authors#authors

Problems it addresses
- Existing properietary solutions are highly customised, and require specific types of cloud infra,
limiting suitability for projects such as open source projects.

Metrics Used
- Framework which operationalizes the DORA metrics independently of a project's SDLC or type of deployment

Key findings
- Demonstrae general applicability of this framework by using it to calculate the throughput and stability
of 304 popular open source repositories.
- Time-series data it produces provides meaningful insights into the trending direction of a project's
recent and retrospective throughput and stability performance.

2. An empirical study on performance comparisons of different types of DevOps team formations
Authors: (Frontiers in Computer Science, 2025)
Year: 2025   
Source: (Frontiers in Computer Science, 2025) https://www.frontiersin.org/journals/computer-scien$

Problem it addresses:
- Organisations adopt DEvOps expecting improvements in software delivery performance, but
empirical evidence comparing performance before and after DevOps adoption is limited
- Need for statistically validated evidence linking DevOps practices to measurable
performance improvements

Metrics Used:
The study quantitatively evaluates software delivery performance using:
- MTTR
- Deployment frequency
- lead time for changes
- Change failure rate (in DORA framing)

Key findings:
- Statistically significant reduction in MTTR after DevOps adoption.
- Teams practicing DevOps showed measurable improvements in operational recovery speed.
- Improvements were not only anecdotal - they were validated using quanititative statistical
analysis.
- Results support the argument that automation and DevOps practices positively influence
system reliablity
- Provides empirical evidence that MTTR is measurable and statistacally comparable across
delivery approaches.

3. Fully Automated DORA Metrics Measurement for Continuous Improvement
Authors: Janick Rüegger; Martin Kropp; Sebastian Graf; Craig Anslow
Year: 2024
Source: dl.acm https://dl.acm.org/doi/abs/10.1145/3666015.3666020

Problem it addresses
- DORA metrics are widely referenced in industry, but limited clarity on how to measure them
rigorously and automatically in real CI/CD environments.
- Existing implementations are often manual, incosistent, or tool-dependent, reducing
reliability and comparability of results.
- Need for a reproducible, automated approach to compute DORA metrics directly from deployment
and incident data.

Metrics used:
- Change Failure Rate (CFR)
- Mean Time to Recovery (MTTR)
- Deployment Frequency
- Lead time for changes
Metrics are computed from CI/CD systems and telemetry/monitoring data

Key findings
- Demonstrates that DORA metrics can be automatically extracted from pipeline and monitoring
tools using observable deployment and incidenct events.
- Provides a structured mapping between real system data (deployments, alerts, otages) and
reliability metrics.
- Establises CFR & MTTR as measurable, operatiaonal software engineering metrics rather than
abstract industry concepts.
- Bridges the gap between industry definitions of DORA metrics and academic empirical
measurement practice.


## Block B - Automation Influences Reliability & Practice
4.DevOps 2.0
Authors: Christof Ebert; Gorka Gallardo; Josune Hernantes; Nicolas Serrano
Year: 13 February 2025
Source: IEEE https://ieeexplore-ieee-org.uwe.idm.oclc.org/document/10884665

Problem it addresses
- DevOps is increasingly used, this article provides current industry experiences such as DevOps with AI,
regression tests, and latest tools for DevOps cycles.

Metrics Used
- 

Key findings:
- plan, code, build, test, release, deploy, operate, and monitor.
- current mainstream tools are mapped to the activities.

5. The impact of continuous integration on other software development practices: A large-scale
empirical study
Authors: Yangyang Zhao; Alexander Serebrenik; Yuming Zhou; Vladimir Filkov; Bogdan Vasilescu
Year: November 2017
Source: IEEE https://ieeexplore.ieee.org/abstract/document/8115619

Problem it addresses:
- Investigates how the adoption of continuous integration affects real development practices 
acriss many open source projects.

What it studies:
- How CI adoption alters integration and testing workflows
- Impact on team activity and tool usage

Key findings:
- Shows measurable effects of CI adoption in practice, suggests automation leads to changes
in workflow and tooling
- Supports the idea that increasing automation affects engineering behavior and outcomes
- Supports my framing that automation levels influence reliability and developer behavior.


## Block C - DevOps Maturity & Progressive Capability
6. Assessing the Maturity of DevOps Practices in Software Industry: An Empirical Study of HELENA2 Dataset
Authors: Ankur Kumar; Mohammad Nadeem; Mohammad Shameem
Year: 2022
Source: Proceedings of the ACM International Conference on Evaluation and Assessment in Software Engineering (EASE ’22)
https://dl.acm.org/doi/10.1145/3530019.3531335

Problem it addresses
- DevOps adoption varies across organisation, there is limited empirical clarity on what
constitutes higher versus lower maturity in DevOps practices.
- Diversity in implementation makes it difficult to compare DevOps maturity levels or determine
which practices contribute to higher capability.
- need for an empirical assessment of DevOps maturity to understand progression in practices
and capabilities

Metrics Used
- Frequency of adoption of 36 DevOps practices
	- Rarely used practices
	- Sometimes used practices
	- Often used practices
	- Always used practices
These frequencies are used to infer maturity levels

Key Findings:
- Organisations with consistently adopted DevOps practices (“often” and “always” categories) demonstrate higher overall DevOps maturity compared to those with rare adoption.
- Organisations with consistently adopted DevOps practices (“often” and “always” categories) demonstrate higher overall DevOps maturity compared to those with rare adoption.
- DevOps maturity can be quantified using the prevalence of specific practices rather than binary or subjective labels.
- A structured set of practices can serve as maturity indicators, supporting the idea that maturity is a continuum rather than discrete categories.

