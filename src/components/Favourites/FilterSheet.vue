<template>
  <v-container fluid>
    <v-toolbar dark color="blue darken-3" class="mb-1">
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="filterByCountry"
          @change="setFilter()"
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Введите страну"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="filterByGenre"
          @change="setFilter()"
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Введите жанр"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          flat
          solo-inverted
          hide-details
          @change="setFilter()"
          :items="sortKeys"
          prepend-inner-icon="mdi-magnify"
          label="Sort by"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="sortDesc" mandatory @change="setFilter()">
          <v-btn large depressed color="blue" :value="false">
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn large depressed color="blue" :value="true">
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  created() {
    let filter = {
      filterByCountry: this.filterByCountry,
      filterByGenre: this.filterByGenre,
      sortBy: this.sortBy,
      sortDesc: this.sortDesc,
    };
    this.setFilterSettings(filter);
  },
  data: () => ({
    filterByCountry: "",
    filterByGenre: "",
    sortBy: "Рейтингу",
    sortKeys: ["Названию", "Году", "Рейтингу", "Хронометражу"],
    sortDesc: false,
  }),
  methods: {
    ...mapMutations("films", {
      setFilterSettings: "setFilterSettings",
    }),
    setFilter() {
      let filter = {
        filterByCountry: this.filterByCountry,
        filterByGenre: this.filterByGenre,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      this.setFilterSettings(filter);
    },
  },
  computed: {
    ...mapState("films", {
      showFilterSettings: (state) => state.showFilterSettings,
    }),
  },
};
</script>
