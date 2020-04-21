import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify);

const opts = {}

export default new Vuetify(opts)

export default new Vuetify({
    primary: '#SFD188',
});

