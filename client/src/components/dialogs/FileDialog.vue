<template>
<div>
  <v-icon  @click.stop="dialog = true">mdi-file</v-icon>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent height="1000px"
      max-width="500px"
    >
      <v-card>
        <v-img :src="base64File" aspect-ratio="1"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>

<script>
  export default {
    props: ['base64File'],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      showFile() {

      }
    }
  }
</script>

<style scoped>
.v-icon {
    background-color: transparent;
}
</style>