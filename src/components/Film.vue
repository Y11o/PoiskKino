<template>
  <v-container> {{film.id + film.title}} </v-container>
</template>

<script>
export default {
    props:{
        film: {
            type: Object,
            required: true,
        },
    },
};
</script>