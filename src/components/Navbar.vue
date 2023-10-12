<template>
  <v-container fluid>
    <v-app-bar app color="primary" dark dense hide-on-scroll>
      <v-toolbar-title class="flex text-center">
        <h2>POISK KINO</h2>
      </v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-lightbulb-outline</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows class="mr-16">
          <v-tab to="/"> Главная </v-tab>
          <v-tab to="/saved"> Избранное </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
};
</script>