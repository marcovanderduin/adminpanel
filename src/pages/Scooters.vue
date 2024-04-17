<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Scooter Informatie</h4>
            <p class="category">ID // Plaats // Batterij in % // Bijzonderheden</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="scooterLocations" :table-header-color="tableHeaderColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Scooter">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Longitude">{{ item.lonLat[0] }}</md-table-cell>
                  <md-table-cell md-label="Latitude">{{ item.lonLat[1] }}</md-table-cell>
                  <md-table-cell md-label="Plaatsnaam">{{ item.locationName }}</md-table-cell>
                  <md-table-cell md-label="Batterij in %">{{ item.battery }}</md-table-cell>
                  <md-table-cell md-label="Bijzonderheden">
                    <md-select v-model="item.status" @change="updateStatus(item)" multiple>
                      <md-option value="Actief">Actief</md-option>
                      <md-option value="Reparatie vereist">Reparatie vereist</md-option>
                      <md-option value="Onderhoud vereist">Onderhoud vereist</md-option>
                    </md-select>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
// ScooterLocationsTableScript.js
import store from './store'; // Importeer de store
import axios from 'axios'; // Importeer axios

export default {
  name: "ScooterLocationsTable",
  props: {
    tableHeaderColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      scooterLocations: [],
    };
  },
  async mounted() {
    // Haal scooterLocations array uit de store en zet deze in de data
    this.scooterLocations = store.state.scooterLocations.map(location => ({
      ...location,
      status: location.status || "Actief", // Stel standaardstatus in op "Actief" als er geen status is opgeslagen
    }));
    
    // Loop door de scooterlocaties en haal de plaatsnaam op voor elke locatie
    for (let i = 0; i < this.scooterLocations.length; i++) {
      try {
        const location = this.scooterLocations[i];
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            format: 'json',
            lat: location.lonLat[1],
            lon: location.lonLat[0],
          },
        });
        
        const locationName = response.data.display_name;
        // Voeg de plaatsnaam toe aan het locatie-object
        location.locationName = locationName;
      } catch (error) {
        console.error('Error fetching location name:', error);
      }
    }
  },
  methods: {
    updateStatus(location) {
      // Update de status van de scooter in de store
      store.commit('updateScooterStatus', { id: location.id, status: location.status });
    }
  },
  watch: {
    // Luister naar wijzigingen in scooterLocations en update de store bij elke wijziging
    scooterLocations: {
      handler(newValue) {
        store.commit('updateScooterLocations', newValue);
      },
      deep: true,
    },
  },
};
</script>
