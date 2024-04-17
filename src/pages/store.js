// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scooterLocations: [
      { id: 1, lonLat: [6.5615, 53.2305], battery: 80 },
      { id: 2, lonLat: [6.5785, 53.2135], battery: 60 },
      { id: 3, lonLat: [6.5725, 53.2325], battery: 75 },
      { id: 4, lonLat: [6.5805, 53.2150], battery: 90 },
      { id: 5, lonLat: [6.5905, 53.2205], battery: 65 },
      { id: 6, lonLat: [6.5705, 53.2185], battery: 85 },
      { id: 7, lonLat: [6.5905, 53.2355], battery: 70 },
      { id: 8, lonLat: [6.6005, 53.2405], battery: 55 },
      { id: 9, lonLat: [6.5705, 53.2325], battery: 80 },
      { id: 10, lonLat: [6.5855, 53.2265], battery: 75 },
      { id: 11, lonLat: [6.5755, 53.2365], battery: 90 },
      { id: 12, lonLat: [6.5905, 53.2265], battery: 65 },
      { id: 13, lonLat: [6.5855, 53.2405], battery: 85 },
      { id: 14, lonLat: [6.5955, 53.2405], battery: 70 },
      { id: 15, lonLat: [6.5655, 53.2215], battery: 60 },
      { id: 16, lonLat: [6.5855, 53.2265], battery: 75 },
      { id: 17, lonLat: [6.5805, 53.2175], battery: 80 },
      { id: 18, lonLat: [6.5705, 53.2265], battery: 65 },
      { id: 19, lonLat: [6.5755, 53.2205], battery: 85 },
      { id: 20, lonLat: [6.5605, 53.2225], battery: 70 },
      { id: 21, lonLat: [6.5655, 53.2185], battery: 90 },
      { id: 22, lonLat: [6.5755, 53.2325], battery: 75 },
      { id: 23, lonLat: [6.5855, 53.2335], battery: 80 },
      { id: 24, lonLat: [6.5905, 53.2325], battery: 65 },
      { id: 25, lonLat: [6.5725, 53.2385], battery: 85 },
      { id: 26, lonLat: [6.5805, 53.2235], battery: 70 },
      { id: 27, lonLat: [6.5805, 53.2185], battery: 90 },
      { id: 28, lonLat: [6.5755, 53.2405], battery: 75 },
      { id: 29, lonLat: [6.5705, 53.2215], battery: 80 },
      { id: 30, lonLat: [6.5655, 53.2165], battery: 65 },
      { id: 31, lonLat: [6.5615, 53.2305], battery: 80 },
      { id: 32, lonLat: [6.5785, 53.2135], battery: 60 },
      { id: 33, lonLat: [6.5505, 53.2285], battery: 75 },
      { id: 34, lonLat: [6.5585, 53.2205], battery: 90 },
      { id: 35, lonLat: [6.5555, 53.2345], battery: 65 },
      { id: 36, lonLat: [6.5405, 53.2185], battery: 85 },
      { id: 37, lonLat: [6.5435, 53.2335], battery: 70 },
      { id: 38, lonLat: [6.5525, 53.2405], battery: 55 },
      { id: 39, lonLat: [6.5555, 53.2265], battery: 80 },
      { id: 40, lonLat: [6.5605, 53.2285], battery: 75 }
    ],
  },
  mutations: {
    addScooterLocation(state, location) {
      state.scooterLocations.push(location);
    },
  },

mutations: {
  updateScooterLocations(state, updatedLocations) {
    state.scooterLocations = updatedLocations;
  },
},


  actions: {
    async fetchAndAddScooterLocation({ commit }, { LATITUDE, LONGITUDE, BATTERY_LEVEL }) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            format: 'json',
            lat: LATITUDE,
            lon: LONGITUDE,
          },
        });

        const locationName = response.data.display_name;
        const scooterLocation = {
          id: Math.random().toString(36).substr(2, 9), // Generate unique ID
          lonLat: [LONGITUDE, LATITUDE],
          battery: BATTERY_LEVEL,
          locationName: locationName,
        };

        commit('addScooterLocation', scooterLocation);
      } catch (error) {
        console.error('Error fetching and adding scooter location:', error);
      }
    },
  },
});
