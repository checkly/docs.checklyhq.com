<template>
  <div id="app">
    <main-navbar/>
    <checkly-header/>
    <code-lives/>
    <provision-all-you-need/>
    <scale-across/>
    <hear-about/>
    <get-started/>
    <landing-footer/>
  </div>
</template>

<script>

import MainNavbar from "./components/MainNavbar"
import ChecklyHeader from "./components/Header"
import CodeLives from "@/components/CodeLives";
import ProvisionAllYouNeed from "@/components/ProvisionAllYouNeed";
import ScaleAcross from "@/components/ScaleAcross";
import HearAbout from "@/components/HearAbout";
import GetStarted from "@/components/GetStarted";
import LandingFooter from "@/components/Footer";

export default {
  name: 'App',
  components: {
    LandingFooter,
    GetStarted,
    HearAbout,
    ScaleAcross,
    MainNavbar,
    ChecklyHeader,
    CodeLives,
    ProvisionAllYouNeed
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
}
</style>
