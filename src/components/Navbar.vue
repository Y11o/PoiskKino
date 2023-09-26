<template>
  <v-container fluid>
    <v-app-bar app color="primary" dark dense hide-on-scroll>
      <v-toolbar-title class="flex text-center">
        <h2>POISK KINO</h2>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows>
          <v-tab to="/"> Главная </v-tab>
          <v-tab> #TODO рандомный фильм </v-tab>
          <v-tab to="/saved"> Избранное </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {};
</script>