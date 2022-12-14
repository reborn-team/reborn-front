import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router"
import VueApexCharts from "vue3-apexcharts";
import VueDaumPostcode from 'vue-daum-postcode'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'

createApp(App).use(VueDaumPostcode).use(VueApexCharts).use(router).mount('#app')
