import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import UserAccount from '../components/Login/UserAccount'
import UserPassword from '../components/Login/UserPassword'

Vue.use(VueRouter)

  const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login,
    children:[
      {
        path: 'account',
        component: UserAccount
      },
      {
        path: 'password',
        component: UserPassword
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
