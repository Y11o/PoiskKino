<template>
  <v-col cols="4">
    <v-card>
        <v-card-title>{{film.title}}</v-card-title>
        <v-card-text>
            <v-img
                width="200"
                height="400"
                :src="film.url"
            />
        </v-card-text>
    </v-card>
  </v-col>
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