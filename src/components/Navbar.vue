<template>
  <!-- Компонент навигации -->
  <v-container fluid>
    <v-app-bar app color="primary" dense hide-on-scroll>
      <!-- На xs и sm устройствах кнопка изменения акцента будет слева от заголовка сайта-->
      <v-sheet class="pa-0 ma-0" color="primary" v-if="!adaptiveSizing">
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Switch on theme'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-brush</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Indigo'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Peach'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </v-sheet>
      <!-- Заголовок сайта -->
      <v-toolbar-title
        :class="`flex text-center ${
          adaptiveSizing ? 'pl-4 ml-16' : 'pl-0 ml-0 mr-3'
        }`"
      >
        <h2 class="white--text">POISK KINO</h2>
      </v-toolbar-title>
      <!-- Кнопка изменения акцента сайта. Цвета описаны в plugins/vuetify.js, логика работы в store/themeModule -->
      <v-sheet class="pa-0 ma-0" color="primary" v-if="adaptiveSizing">
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Switch on theme'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-brush</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Indigo'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accentList[currAccent] === 'Peach'"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </v-sheet>
      <!-- Кнопка переключения темы сайта -->
      <v-sheet class="pa-0 ma-0" color="primary">
        <v-btn icon v-if="!isDark" @click="toggleTheme()" class="white--text">
          <v-icon>mdi-lightbulb-on</v-icon>
        </v-btn>
        <v-btn icon v-else @click="toggleTheme()" class="white--text">
          <v-icon>mdi-lightbulb-outline</v-icon>
        </v-btn>
      </v-sheet>
      <!-- Табы навигации по сайту -->
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows centered active-class="surface">
          <v-tab class="white--text" to="/"> Главная </v-tab>
          <v-tab class="white--text" to="/saved"> Избранное </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("themes", {
      isDark: "isDark",
      currAccent: "currAccent",
      accentList: "accentList",
    }),
    //Проверка размеров устройства
    adaptiveSizing() {  
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
  },
  //Перед закрытием сохраняются настройки темы и акцента сайта в localStorage
  beforeUnmount() {   
    this.setLocalStoredTheme();
  },
  //Установка темы при загрузке сайта (данные из localStorage уже загружены во Vuex)
  beforeMount() {     
    this.$vuetify.theme.dark = this.isDark;
  },
  methods: {
    //Смена темы сайта
    toggleTheme() { 
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.toggleStoreTheme(!this.isDark);
      this.setLocalStoredTheme();
    },
    //Смена акцента сайта
    switchAccent() {  
      this.toggleAccent((this.currAccent + 1) % this.accentList.length);
      this.setLocalStoredTheme();
    },
    ...mapMutations("themes", {
      toggleStoreTheme: "toggleStoreTheme",
      toggleAccent: "toggleAccent",
      setLocalStoredTheme: "setLocalStoredTheme",
    }),
  },
};
</script>
