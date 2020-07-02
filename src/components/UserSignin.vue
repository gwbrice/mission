<template>
  <div class="userSignin">
    <div class="wrapper flex-align-center">
      <form action="">
        <div class="wrapper__header">
          <img src="@/assets/img/logo.svg" alt="">
          <h1>建立您的 Google 帳戶</h1>
        </div>
        <div class="wrapper__body">
          <div class="row">
            <div class="input-placeholder ">
              <input type="text" name="" id="lastname" v-model.trim="lastname" @blur="blurHandler">
              <label for="lastname">姓氏</label>
              <div class="hint hint-warn">
                <img src="@/assets/img/icon-warn.svg" alt="">
                請輸入姓氏
              </div>
            </div>
            <div class="input-placeholder ">
              <input type="text" name="" id="firstname" v-model="firstname">
              <label for="firstname">名字</label>
              <div class="hint hint-warn">請輸入名字</div>
            </div>            
          </div>
          <div class="row">
            <div class="input-placeholder input-mail">
              <input type="text" name="" id="user" v-model="user">
              <label for="user">使用者名稱</label>
              <span>@gmail.com</span>
              <div class="hint">您可以使用英文字母、數字和半形句號</div>
            </div>
          </div>
          <button class="btn btn-text">改為使用我目前的電子郵件地址</button>
          <div class="row">
            <div class="input-placeholder">
              <input :type="showPassword ? 'text' : 'password'" name="" id="password" v-model="password">
              <label for="password">密碼</label>
              <div class="hint hint-warn">請輸入密碼</div>
            </div>
            <div class="input-placeholder">
              <input :type="showPassword ? 'text' : 'password'" name="" id="confirm" v-model="confirm">
              <label for="confirm">確認</label>
              <div class="hint hint-warn"></div>
            </div>
            <div class="btn" @click="passwordVisible">O</div>   
          </div>
        </div>
        <div class="wrapper__footer">
          <button class="btn btn-text">請改為登入帳戶</button>
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
export default {
  name: 'UserSignin',
  data(){
    return{
      lastname:'',
      lastnameErr: false,
      firstname:'',
      user:'',
      password:'',
      confirm: '',
      showPassword: false
    }
  },
  methods:{
    blurHandler(e){
      console.log('blur', e.target.value)
      console.log(this)
    },
    verifyHandler(){
      
    },
    passwordVisible(){
      this.showPassword = !this.showPassword
    },
    verifyLastname(){
      if(!this.lastname.length){
        this.lastnameErr = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .userSignin{
    width: 780px;
    margin-left: auto;
    margin-right: auto;
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
  }
</style>>
