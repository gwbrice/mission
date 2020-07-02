<template>
  <div class="userLogin">
    <div class="wrapper">
      <div class="wrapper__header">
        <img src="@/assets/img/logo.svg" alt="">
        <h1>{{ title }}</h1>
        <p v-if="loginStatus == 0">使用您的Google帳戶</p>
        <div class="accountSelect" v-if="loginStatus == 1">
          {{ account }}
        </div>
      </div>
      <transition
        name="fade"
         mode="out-in"
      >
        <router-view @accountHandler="accountHandler" :account="account"/>
      </transition>
    </div>
    <div class="functionNav">
      <select name="" id="lang">
        <option value="ch">繁體中文</option>
        <option value="en">English</option>
      </select>
      <div>
        <a href="#">說明</a>
        <a href="#">隱私權</a>
        <a href="#">條款</a>
      </div>
    </div>
  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
  name: 'UserLogin',
  data(){
    return{
      account: '',
      password: '',
      submitted: false,
      isAccountValidated: false,
      loginStatus: 0
    }
  },
  props: {
    msg: String
  },
  validations:{
    account: {required}
  },
  computed:{
    title(){
      switch(this.loginStatus){
        case 0:
          return '登入'
        case 1:
          return '歡迎使用' 
        default:
          return ''
      }
    },
    currentRoute(){
      return this.$route.path;
    }    
  },
  methods:{
    submitAccount(){
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) { 
        this.isAccountValidated = true
        // router push
      }
    },
    validationStatus(validation){
      return typeof validation != "undefined" ? validation.$error : false
    },
    accountHandler(account){
      this.account = account;
      this.loginStatus = 1;
    }
  },
  watch:{
    currentRoute(newVal){
      switch(newVal){
        case '/login/account':
          this.loginStatus = 0
          break;
        case '/login/password':
          this.loginStatus = 1
          break; 
        default:
          break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  

  .userLogin{
    width: 480px;
    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;
    .wrapper__header{
      text-align: center;
    }
    
  }

  .fade{
    &-enter-active{
       transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &-leave-active{
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &-enter{
      transform: translateX(100%);
      opacity: 1;
    }
    &-leave-to{
      transform: translateX(-100%);
      opacity: 0;
    }
  }
 
</style>
