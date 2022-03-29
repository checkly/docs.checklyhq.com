<template>
  <div style="background: #F9FAFC;" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">
            Your app’s code lives in source control. <br>
            Your monitoring should, too.
          </h2>
        </div>
      </div>
      <div class="row align-items-center py-2">
        <div class="col-12 col-lg-8 order-1 order-lg-2">
          <img src="../assets/features1.png" class="img-fluid" alt="">
        </div>
        <div class="col col-lg-4 order-2 order-lg-1">
          <div class="feature-item d-flex">
            <img src="../assets/icon1.png" class="d-none d-md-inline-block me-4" style="width: 32px; height: 32px;" alt="">
            <div>
              <h4 class="fs-5">Compatible with your workflow</h4>
              <p class="fw-light">Already using Terraform for IaC? Great. Not using Terraform yet? Easily plug it into your existing pipeline.</p>
            </div>
          </div>
          <div class="feature-item d-flex">
            <img src="../assets/icon2.png" class="d-none d-md-inline-block me-4" style="width: 32px; height: 32px;" alt="">
            <div>
              <h4 class="fs-5">Increased transparency</h4>
              <p class="fw-light">Declaring your checks as code aligns your monitoring with your releases and rollbacks, while also serving as documentation.</p>
            </div>
          </div>
          <div class="feature-item d-flex">
            <img src="../assets/icon3.png" class="d-none d-md-inline-block me-4" style="width: 32px; height: 32px;" alt="">
            <div>
              <h4 class="fs-5">One setup for local and cloud</h4>
              <p class="fw-light">Seamlessly develop and test your checks locally, push to source control and apply automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeLives"
}
</script>

<style scoped>

</style>