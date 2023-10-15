<template>
  <v-container fluid>
    <v-toolbar dark color="blue darken-1" class="mb-1">
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-text-field
          v-model="filterByCountry"
          @change="setFilter()"
          @keydown.enter="setFilter()"
          flat
          solo-inverted
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          label="Введите страну"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="filterByGenre"
          @change="setFilter()"
          @keydown.enter="setFilter()"
          flat
          solo-inverted
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          label="Введите жанр"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          @keydown.enter="setFilter()"
          @change="setFilter()"
          flat
          solo-inverted
          hide-details
          :items="sortKeys"
          prepend-inner-icon="mdi-magnify"
          label="Sort by"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn-toggle
          v-model="sortDesc"
          mandatory
          @change="setFilter()"
          @keydown.enter="setFilter()"
        >
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
    sortBy: "Рейтингу Кинопоиска",
    sortKeys: ["Названию", "Году", "Рейтингу Кинопоиска", "Хронометражу"],
    sortDesc: false,
  }),
  methods: {
    ...mapMutations("films", {
      setFilterSettings: "setFilterSettings",
    }),
    ...mapActions("films", {
      searchSavedFilms: "searchSavedFilms",
    }),
    setFilter() {
      let filter = {
        filterByCountry: this.filterByCountry,
        filterByGenre: this.filterByGenre,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };
      this.setFilterSettings(filter);
      this.searchSavedFilms();
    },
  },
  computed: {
    ...mapState("films", {}),
  },
};
</script>
