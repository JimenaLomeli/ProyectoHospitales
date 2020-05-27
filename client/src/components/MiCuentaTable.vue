<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-card-title
                        label="Nombre">{{this.name}}</v-card-title>
                    <v-card-title
                        label="Email Address">{{this.email}}</v-card-title>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>


<script>

  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        name: '',
        email: ''
      }
    },
    methods: {

    },
    created: function() {
      const user = JSON.parse(localStorage.user)
      console.log(user)
      this.name = user.uid
      this.email = user.email
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: black;
  align-self: center;
  margin: 10px;
}

.v-card {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
}
</style>
