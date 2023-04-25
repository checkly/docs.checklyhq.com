---
title: Command line triggers
weight: 7
menu:
  integrations:
    parent: "Terraform provider"
---

[Command line triggers](https://www.checklyhq.com/docs/cicd/triggers/) enable you to call a check from a CI/CD pipeline, a bash shell or programmatically in your code.

You can specify command line triggers as standalone resources at check or group level:

```terraform
resource "checkly_trigger_check" "test-trigger-check" {
   check_id = "c1ff95c5-d7f6-4a90-9ce2-1e605f117592"    // The id of the check to be triggered
}

output "test-trigger-check-url" {
  value = checkly_trigger_check.test-trigger-check.url  // This will output the trigger url
}

resource "checkly_trigger_group" "test-trigger-group" { // The id of the group to be triggered
   group_id = "215"
}

output "test-trigger-group-url" {
  value = checkly_trigger_group.test-trigger-group.url  // This will output the trigger url
}
```

You can see all the configuration options for [group triggers](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_trigger_group), as well as more examples [check triggers](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_trigger_check), on the official Terraform registry documentation page.
