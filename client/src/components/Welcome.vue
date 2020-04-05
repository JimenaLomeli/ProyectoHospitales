<template>
  <div>
    <h1>Bienvenido a Cirrus</h1>
    <div class="b-div">
          <v-btn x-large to="/login">Iniciar sesion</v-btn>
    </div>
    <div class="b-div" >
          <v-btn x-large to="/register">Registrate</v-btn>
    </div>
    <img class = "ola" src="@/assets/ola.png" />
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: white;
  margin-top: 25px;
}

.b-div {
  padding: 10px;
  width: 100%;
  align-content: center;
}

.v-btn {
  width: 50%;
  padding: 15%;
}

.ola {
  height: 20%;
  width: 20%;
  margin-top: 50px;
  margin-right: -70%;
}

</style>
