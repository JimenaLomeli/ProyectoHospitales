<template>
    <v-toolbar dense fixed>
        <v-toolbar-side-icon>
            <router-link to="/">
                <v-img :src="require('../assets/cirrus-logo.png')" height="50px"
                     width="50%" contain></v-img>
            </router-link>
        </v-toolbar-side-icon>   
      <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
