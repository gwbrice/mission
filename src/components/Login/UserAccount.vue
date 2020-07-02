<template>
  <form class="account" @submit.prevent="submitAccount">
    <div class="wrapper__body">
      <div class="input-placeholder" :class="{}">
        <div class="input--wrap">
          <input type="text" name="" id="account" v-model.trim="$v.account.$model" :class="{whithValue : account.length, error : validationStatus($v.account)}">
          <label for="account">電子郵件地址或電話號碼</label>
        </div>
        <div v-if="submitted && !$v.account.required" class="hint hint-warn">
          請輸入電子郵件地址或電話號碼
          </div>
      </div>
      <button class="btn btn-text">忘記電子郵件地址?</button>
      <div class="notice">如果這不是你的電腦，請使用訪客模式以私密方式登入。<a href="#">瞭解詳情</a></div>
    </div>
    <div class="wrapper__footer">
      <button class="btn btn-text">建立帳戶</button>
      <input type="submit" class="btn btn-primary" value="繼續">
    </div>
  </form>   
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'UserLogin',
  data(){
    return{
      account: '',
      submitted: false,
      isAccountValidated: false,
    }
  },
  validations:{
    account: {required}
  },
  methods:{
    submitAccount(){
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) { 
        this.isAccountValidated = true
        this.$router.push({ path: 'password' })
      }
    },
    validationStatus(validation){
      return typeof validation != "undefined" ? validation.$error : false
    }
  }
}
</script>

<style>

</style>