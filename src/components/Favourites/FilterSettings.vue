<template>
  <v-btn icon @click="setShowFilterSettings(!showFilterSettings)">
    <v-icon> mdi-tune-variant </v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
    methods: {
    ...mapMutations("films", {
      setShowFilterSettings: "setShowFilterSettings",
    }),
  },
  computed: {
    ...mapState("films", {
      showFilterSettings: (state) => state.showFilterSettings,
    }),
  },
};
</script>
