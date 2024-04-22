<template>
  <div>
    <md-table v-model="accounts" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Naam">{{ item.firstname }}</md-table-cell>
        <md-table-cell md-label="Achternaam">{{ item.lastname }}</md-table-cell>
        <md-table-cell md-label="Leeftijd">{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Aangemeld sinds">{{ item.date }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      accounts: [
        {
          firstname: "Coming Soon!",
          lastname: "Coming Soon!",
          age: "Coming Soon!",
          date: "Coming Soon!",
        },
      ],
    };
  },
};
</script>
