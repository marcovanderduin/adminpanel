<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Home</p>
      </sidebar-link>
      <sidebar-link to="/scooters">
        <md-icon>delivery_dining</md-icon>
        <p>Scooters informatie</p>
      </sidebar-link>
      <sidebar-link to="/accounts">
        <md-icon>manage_accounts</md-icon>
        <p>Accounts</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Overzicht scooters // Map</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
  },
  data() {
    return {
      sidebarBackground: "red",
      sidebarBackgroundImage: require("@/assets/img/groningen.jpg"),
    };
  },
};
</script>
