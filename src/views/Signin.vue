<template>
  <div class="userSignin">
    <div class="wrapper flex-align-center">
      <form @submit.prevent="submitHandler">
        <div class="wrapper__header">
          <img src="@/assets/img/logo.svg" alt="">
          <h1>建立您的 Google 帳戶</h1>
        </div>
        <div class="wrapper__body">
          <div class="row">
            <div class="input-placeholder">
              <div class="input--wrap">
                <input type="text" name="" id="lastname" v-model.trim="$v.lastname.$model" :class="{whithValue : lastname.length, error : validationStatus($v.lastname)}">
                <label for="lastname">姓氏</label>
              </div>
              <div v-if="submitted && !$v.lastname.required" class="hint hint-warn">請輸入姓氏</div>
            </div>
            <div class="input-placeholder">
              <div class="input--wrap">
                <input type="text" name="" id="firstname" v-model.trim="$v.firstname.$model" :class="{whithValue : firstname.length, error : validationStatus($v.firstname)}">
                <label for="firstname">名字</label>
              </div>
              <div v-if="submitted && !$v.firstname.required" class="hint hint-warn">請輸入名字</div>
            </div>            
          </div>
          <div class="row">
            <div class="input-placeholder input-mail">
              <div class="input--wrap">
                <input type="text" name="" id="user" v-model.trim="$v.user.$model" :class="{whithValue : user.length, error : validationStatus($v.user)}">
                <label for="user">使用者名稱</label>
                <span>@gmail.com</span>
              </div>
              <div v-if="submitted && !$v.firstname.required" class="hint hint-warn">請輸入使用者名稱</div>
              <div class="hint">您可以使用英文字母、數字和半形句號</div>
            </div>
          </div>
          <button class="btn btn-text">改為使用我目前的電子郵件地址</button>
          <div class="row">
            <div class="input-placeholder">
              <div class="input--wrap">
               <input :type="showPassword ? 'text' : 'password'" name="" id="password" v-model.trim="$v.password.$model" :class="{whithValue : password.length, error : validationStatus($v.password)}">
                <label for="password">密碼</label>
              </div>
              <div v-if="submitted && !$v.firstname.required" class="hint hint-warn">請輸入密碼</div>
              <div v-if="submitted && !$v.firstname.minLength && $v.firstname.required" class="hint hint-warn">請輸入八個字元以上的密碼</div>
            </div>
            <div class="input-placeholder">
              <div class="input--wrap">
                <input :type="showPassword ? 'text' : 'password'" name="" id="repeatPassword" v-model.trim="$v.repeatPassword.$model" :class="{whithValue : repeatPassword.length, error : validationStatus($v.repeatPassword)}">
                <label for="repeatPassword">確認</label>
              </div>
              <div class="hint hint-warn" v-if="submitted && !$v.repeatPassword.sameAsPassword">這些密碼不相符，請再試一次</div>
            </div>
            <div class="btn btn-password" @click="passwordVisible">
              <font-awesome-icon v-if="!showPassword" icon="eye" />
              <font-awesome-icon v-if="showPassword" icon="eye-slash" />
            </div>   
          </div>
        </div>
        <div class="wrapper__footer">
          <router-link class="btn btn-text" to="/login">請改為登入帳戶</router-link>
          <button class="btn btn-primary" @click.prevent="verifyHandler">繼續</button>
        </div>        
      </form>
      <figure class="intro">
        <img src="@/assets/img/account.svg" alt="">
        <figcaption>只要擁有一個帳戶，就能使用所有 Google 服務。</figcaption>
      </figure>
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

import { required, sameAs, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'UserSignin',
  data(){
    return{
      lastname:'',
      firstname:'',
      user:'',
      password:'',
      repeatPassword: '',
      showPassword: false,
      submitted: false
    }
  },
  validations:{
    lastname: {required},
    firstname:{required},
    user:{required},
    password:{required, minLength:minLength(8)},
    repeatPassword:{required,sameAsPassword: sameAs('password')}
  },
  methods:{
    verifyHandler(){
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) { 
        alert('成功註冊')
      }
    },
    passwordVisible(){
      this.showPassword = !this.showPassword
    },
    validationStatus(validation){
      return typeof validation != "undefined" ? validation.$error : false
    }
  }
}
</script>

<style lang="scss" scoped>
  .userSignin{
    width: 780px;
    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;
    form{
      padding-right: 40px;
    }
    .intro{
      text-align: center;
      img{
        max-width: 244px;
      }
    }
    .input-placeholder{
      flex: 1 ;
      +*{
        margin-left: 15px;
      }
    }
    .input-mail{
      input{
        padding-right: 100px;
      }
      span{
        position: absolute;
        right: 10px;
        transform: translateY(50%);
      }
    }
    .btn-text{
      padding: 5px 0px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .btn-password{
      margin-top: 10px;
    }
  }
</style>>
