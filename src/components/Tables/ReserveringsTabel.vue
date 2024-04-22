<template>
  <div>
    <md-table v-model="ReserveringsTabel" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Naam">{{ item.firstname }}</md-table-cell>
        <md-table-cell md-label="Achternaam">{{ item.lastname }}</md-table-cell>
        <md-table-cell md-label="Tijd">{{ item.time }}</md-table-cell>
        <md-table-cell md-label="ScooterID">{{ item.scooterID }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ReserveringsTabel",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      ReserveringsTabel: [
        {
          firstname: "Coming Soon!",
          lastname: "Coming Soon!",
          time: "Coming Soon!",
          scooterID: "Coming Soon!",
        },
      ],
    };
  },
};
</script>
