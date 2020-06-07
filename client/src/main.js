// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("dotenv").config();
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueTextareaAutosize from 'vue-textarea-autosize'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/lib/util/colors'

import * as VueGoogleMaps from 'vue2-google-maps'

var apiKey = {
  VUE_APP_MY_VARIABLE: process.env.VUE_APP_MY_VARIABLE
}

Vue.use(VueGoogleMaps, {
  load: {
    key: apiKey["VUE_APP_MY_VARIABLE"],
  },
  installComponents: false
})

Vue.component('google-map', VueGoogleMaps.Map);
// Vue.component('GmapMarker', VueGoogleMaps.GmapMarker);

Vue.use(VueTextareaAutosize)

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi',
  },
})

/* eslint-disable no-new */
new Vue({
  vuetify: new Vuetify(),
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(Vuetify, {
  iconfont: 'md'
})
