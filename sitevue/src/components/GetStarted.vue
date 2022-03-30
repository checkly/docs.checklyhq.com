<template>
  <div class="py-5" id="get-started">
    <div class="container">
      <h2 class="d-none d-md-block text-center mb-4">Get Started</h2>
      <div class="row my-4">
        <div class="col-12 col-lg-5 d-flex flex-column flex-md-row mb-4">
          <div class="d-flex flex-column align-items-center pe-md-4">
            <div class="d-flex justify-content-center align-items-center fs-3 number mb-3">1</div>
          </div>
          <div class="content">
            <div class="text">
              <h3 class="text-center text-md-start">Get the installation code</h3>
              <p class="text-center text-md-start">Copy the installation code and save it in your terraform file.</p>
            </div>
            <div class="options d-flex flex-column flex-md-row flex-lg-column gap-3 align-items-center align-items-lg-start justify-content-center justify-content-md-start">
              <button type="button" class="btn btn-primary d-inline-block" style="max-width: 300px;">Copy the installation code</button>
              <span class="or">OR</span>
              <button type="button" class="btn btn-light d-inline-block" style="max-width: 300px;">Clone sample repo</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-7">
          <img src="../assets/steps1.png" class="img-fluid" alt="">
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12 col-lg-5 d-flex flex-column flex-md-row">
          <div class="d-flex flex-column align-items-center pe-md-4">
            <div class="d-flex justify-content-center align-items-center fs-3 number mb-3">2</div>
          </div>
          <div class="content mb-3">
            <div class="text">
              <h3 class="text-center text-md-start">Export your credentials</h3>
              <p class="text-center text-md-start">Find your API key and account ID in your user settings, then export them as environment variables.</p>
            </div>
            <div class="options d-flex flex-column flex-md-row flex-lg-column gap-3 align-items-center align-items-lg-start justify-content-center justify-content-md-start">
              <button type="button" class="btn btn-link d-inline-block" style="max-width: 300px;">Get your account ID</button>
              <span class="d-none d-md-block">AND</span>
              <button type="button" class="btn btn-link d-inline-block" style="max-width: 300px;">Create API key</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-7">
          <img src="../assets/steps2.png" class="img-fluid" alt="">
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12 col-lg-5 d-flex flex-column flex-md-row">
          <div class="d-flex flex-column align-items-center pe-md-4">
            <div class="d-flex justify-content-center align-items-center fs-3 number mb-3">3</div>
          </div>
          <div class="content">
            <div class="text">
              <h3 class="text-center text-md-start">Run it</h3>
              <p class="text-center text-md-start">Initialize and apply your Terraform config.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-7">
          <img src="../assets/steps3.png" class="img-fluid" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetStarted"
}
</script>

<style scoped>

</style>