<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Accounts</h4>
            <p class="category">Overzicht van alle accounts</p>
          </md-card-header>
          <md-card-content>
            <AccountsTabel table-header-color="red"></AccountsTabel>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountsTabel } from "@/components";

export default {
  components: {
    AccountsTabel,
  },
};
</script>
