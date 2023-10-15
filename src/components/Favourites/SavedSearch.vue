<template>
  <v-container fluid>
    <v-row class="flex" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          label="Введите название фильма"
          v-model="keyWord"
          clearable
          @keydown.enter="filterSavedFilms()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn icon @click="filterSavedFilms()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <FilterSettings />
      </v-col>
    </v-row>
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
      filterSavedFilms: "filterSavedFilms",
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
