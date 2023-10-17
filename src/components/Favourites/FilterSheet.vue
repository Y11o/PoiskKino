<template>
  <v-container fluid>
    <v-toolbar dark color="secondary" class="mb-1">
      <template>
        <v-row align="center" justify="center">
          <v-col cols="6" md="4">
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
          </v-col>
          <v-col cols="6" md="3">
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
          </v-col>
          <v-col md="3" v-if="countSize">
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
          </v-col>
          <v-col md="2" v-if="countSize">
            <v-btn-toggle
              v-model="sortDesc"
              @change="setFilter()"
              @keydown.enter="setFilter()"
            >
              <v-btn large depressed color="surface" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="surface" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <v-toolbar dark color="secondary" class="mb-1" v-if="!countSize">
      <template>
        <v-row class=".flex-sm-wrap" align="center" justify="center">
          <v-col cols="6" md="4">
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
          </v-col>
          <v-col cols="6" md="3">
            <v-btn-toggle
              v-model="sortDesc"
              @change="setFilter()"
              @keydown.enter="setFilter()"
            >
              <v-btn depressed color="surface" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn depressed color="surface" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

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
  computed: {
    countSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return false;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
  },
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
};
</script>
