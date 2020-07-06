import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuelidate from 'vuelidate'
import i18n from '../common/plugins/vue-i18n'
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye,faEyeSlash,faExclamationTriangle,faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faEyeSlash, faExclamationTriangle, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
