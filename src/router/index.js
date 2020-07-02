import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import UserAccount from '../components/Login/UserAccount'
import UserPassword from '../components/Login/UserPassword'

import Signin from '../views/Signin'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect: '/login/account'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    redirect: '/login/account',
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
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  }
]

const router = new VueRouter({
  routes
})

export default router
