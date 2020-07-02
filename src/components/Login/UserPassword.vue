<template>
  <form class="password">
    <div class="wrapper__body">
      <div class="input-placeholder" >
        <div class="input--wrap">
          <input type="text" name="" id="password" v-model.trim="password" :class="{whithValue : password.length}">
          <label for="password">輸入您的密碼</label>
        </div>
        <div v-if="submitted && !$v.password.required" class="hint hint-warn">請輸入電子郵件地址或電話號碼</div>
      </div>
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
  data(){
    return{
      account: '',
      password: '',
      submitted: false,
      isAccountValidated: false,
    }
  },
  validations:{
    password: {required}
  },
  methods:{
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

<style>

</style>