<template>
  <form class="password">
    <div class="wrapper__body">
      <div class="input-placeholder">
        <div class="input--wrap">
          <input :type="showPassword ? 'text' : 'password'" name="" id="password" v-model.trim="$v.password.$model" :class="{whithValue : password.length}">
          <label for="password">輸入您的密碼</label>
          <div class="btn btn-password" @click="passwordVisible">
            <font-awesome-icon v-if="!showPassword" icon="eye" />
            <font-awesome-icon v-if="showPassword" icon="eye-slash" />
          </div>
        </div>
      </div>
      <div v-if="submitted && !$v.password.required" class="hint hint-warn">請輸入電子郵件地址或電話號碼</div>
      </div>
    <div class="wrapper__footer">
      <button class="btn btn-text">忘記密碼?</button>
      <button class="btn btn-primary" @click.prevent="verifyHandler">繼續</button>
    </div>
  </form>   
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'UserPassword',
  props:['account'],
  data(){
    return{
      password: '',
      submitted: false,
      showPassword: false,
      isAccountValidated: false,
    }
  },
  validations:{
    password: {required}
  },
  methods:{
    passwordVisible(){
      this.showPassword = !this.showPassword
    },
    verifyHandler(){
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) { 
        alert('成功登入')
      }
    }
  }
}
</script>

<style lang="scss">
  .accountSelect{
    text-align: center;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
  }
  .password{
    .wrapper__footer{
      margin-top: 1.5rem;
    }
  .btn-password{
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
  }
</style>>

