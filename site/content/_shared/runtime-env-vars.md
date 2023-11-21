---
sitemapExclude: true
---
| variable          | description                                 | availability notes                   |
|-------------------|---------------------------------------------|--------------------------------------|
| `CHECK_ID`        | The UUID of the check being executed.       | only available after saving a check. |
| `CHECK_NAME`      | The name of the check being executed.       |                                      | 
| `CHECK_RESULT_ID` | The UUID where the result will be saved.    | only available on scheduled runs.    |
| `CHECK_RUN_ID`    | The UUID of the check run execution.        | only available on scheduled runs.    |
| `CHECK_TYPE`      | The type of the check, e.g. `BROWSER`.      |                                      |
| `REGION`          | The current region, e.g. `us-west-1`.       |                                      |
| `RUNTIME_VERSION` | The version of the runtime, e.g, `2023.09`. |                                      |
