<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">Provision all you need in just seconds</h2>
          <p class="text-center">Managing your checks, groups, alert channels and other monitoring resources should never be the bottleneck for shipping more code or increasing visibility into the state of your systems.</p>
        </div>
      </div>
      <div class="row justify-content-center no-wrap gap-1 gap-md-3">
        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content; max-width: 250px;">First checks</button>
        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content;">Grouped checks</button>
        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content;">Alerting groups</button>
      </div>
      <div class="row">
        <picture>
          <source media="(min-width:768px)" srcset="../assets/firstcheckmd.png">
          <source media="(min-width:992px)" srcset="../assets/firstchecklg.png">
          <img class="img-fluid mt-1 mt-md-4" src="../assets/firstchecksm.png" alt="">
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProvisionAllYouNeed"
}
</script>

<style scoped>

</style>