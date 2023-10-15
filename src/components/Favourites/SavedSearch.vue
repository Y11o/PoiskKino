<template>
  <v-container fluid>
    <v-toolbar dark color="blue darken-3" class="mb-1">
      <v-row class="flex" align="center">
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-text-field
            flat
            solo-inverted
            hide-details
            label="Введите название фильма"
            v-model="keyWord"
            clearable
            @keydown.enter="searchSavedFilms()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn icon @click="searchSavedFilms()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <FilterSettings />
        </v-col>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import FilterSettings from "@/components/Favourites/FilterSettings.vue";
export default {
  components: {
    FilterSettings,
  },
  methods: {
    ...mapActions("films", {
      searchSavedFilms: "searchSavedFilms",
    }),
    ...mapMutations("films", {
      changeSavedKeyword: "changeSavedKeyword",
    }),
  },
  computed: {
    ...mapState("films", {
      savedKeyword: (state) => state.savedKeyword,
    }),
    keyWord: {
      get() {
        return this.savedKeyword;
      },
      set(newValue) {
        this.changeSavedKeyword(newValue);
      },
    },
  },
};
</script>
