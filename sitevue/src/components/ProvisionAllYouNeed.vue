<template>
  <div class="py-5" id="provision-all">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">Provision all you need in just seconds</h2>
          <p class="text-center">Managing your checks, groups, alert channels and other monitoring resources should never be the bottleneck for shipping more code or increasing visibility into the state of your systems.</p>
        </div>
      </div>
      <div class="row justify-content-center no-wrap gap-1 gap-md-3">
<!--        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content; max-width: 250px;">First checks</button>-->
<!--        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content;">Grouped checks</button>-->
<!--        <button type="button" class="btn btn-primary d-inline-block" style="flex-basis: content;">Alerting groups</button>-->
        <ul class="nav nav-pills mb-3" id="examples-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="first-check-tab" data-bs-toggle="pill" data-bs-target="#first-check-example" type="button" role="tab" aria-controls="first-check-example" aria-selected="true">First checks</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="grouped-checks-tab" data-bs-toggle="pill" data-bs-target="#grouped-checks-example" type="button" role="tab" aria-controls="grouped-checks-example" aria-selected="false">Grouped checks</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="alerting-groups-tab" data-bs-toggle="pill" data-bs-target="#alerting-groups-example" type="button" role="tab" aria-controls="alerting-groups-example" aria-selected="false">Alerting groups</button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="first-check-example" role="tabpanel" aria-labelledby="first-check-tab">
            <picture>
              <source media="(min-width:768px)" srcset="../assets/firstcheckmd.png">
              <source media="(min-width:992px)" srcset="../assets/firstchecklg.png">
              <img class="img-fluid mt-1 mt-md-4" src="../assets/firstchecksm.png" alt="">
            </picture>
          </div>
          <div class="tab-pane fade" id="grouped-checks-example" role="tabpanel" aria-labelledby="grouped-checks-tab">
            <picture>
              <source media="(min-width:768px)" srcset="../assets/firstcheckmd.png">
              <source media="(min-width:992px)" srcset="../assets/firstchecklg.png">
              <img class="img-fluid mt-1 mt-md-4" src="../assets/firstchecksm.png" alt="">
            </picture>
          </div>
          <div class="tab-pane fade" id="alerting-groups-example" role="tabpanel" aria-labelledby="alerting-groups-tab">
            <picture>
              <source media="(min-width:768px)" srcset="../assets/firstcheckmd.png">
              <source media="(min-width:992px)" srcset="../assets/firstchecklg.png">
              <img class="img-fluid mt-1 mt-md-4" src="../assets/firstchecksm.png" alt="">
            </picture>
          </div>
        </div>
      </div>
<!--      <div class="row">-->
<!--        -->
<!--      </div>-->
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