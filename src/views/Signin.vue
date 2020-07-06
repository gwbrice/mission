<template>
  <div class="userSignin container">
    <div class="wrapper">
      <div class="wrapper__loading" v-show="isLoading"></div>
      <form @submit.prevent="submitHandler">
        <div class="wrapper__header">
          <img src="@/assets/img/logo.svg" alt="">
          <h1>{{ $t('CREATE.TITLE') }}</h1>
        </div>
        <div class="wrapper__body">
          <div class="row">
            <div class="input-placeholder">
              <div class="input--wrap">
                <input type="text" name="" id="lastname" v-model.trim="$v.lastname.$model" :class="{whithValue : lastname.length, error : validationStatus($v.lastname)}">
                <label for="lastname">
                  {{ $t('CREATE.LASTNAME_HOLDER') }}
                </label>
              </div>
              <div v-if="submitted && !$v.lastname.required" class="hint hint-warn">
                {{ $t('CREATE.LASTNAME_WARN_REQUIRE') }}
              </div>
            </div>
            <div class="input-placeholder">
              <div class="input--wrap">
                <input type="text" name="" id="firstname" v-model.trim="$v.firstname.$model" :class="{whithValue : firstname.length, error : validationStatus($v.firstname)}">
                <label for="firstname">
                  {{ $t('CREATE.FIRSTNAME_HOLDER') }}
                </label>
              </div>
              <div v-if="submitted && !$v.firstname.required" class="hint hint-warn">
                {{ $t('CREATE.FIRSTNAME_WARN_REQUIRE') }}
              </div>
            </div>            
          </div>
          <div class="row">
            <div class="input-placeholder input-mail">
              <div class="input--wrap">
                <input type="text" name="" id="user" v-model.trim="$v.user.$model" :class="{whithValue : user.length, error : validationStatus($v.user) && submitted}">
                <label for="user">
                  {{ $t('CREATE.USER_HOLDER') }}
                </label>
                <span>@gmail.com</span>
              </div>
              <div v-if="submitted && !$v.user.required" class="hint hint-warn">
                {{ $t('CREATE.USER_WARN_REQUIRE') }}
              </div>
              <div v-if="submitted && $v.user.required && !$v.user.ruleUser" class="hint hint-warn">
                {{ $t('CREATE.USER_WARN_INVALID') }}
              </div>   
              <div v-if="submitted && userExist" class="hint hint-warn">
                {{ $t('CREATE.USER_WRAN_EXIST') }}
              </div>                           
              <div v-if="!submitted" class="hint">
                {{ $t('CREATE.PASSWORD_HINT') }}
              </div>
            </div>
          </div>
          <button class="btn btn-text">
            {{ $t('CREATE.CURRENT_EMAIL') }}
          </button>
          <div class="row no-wrap">
            <div class="passwordWrap">
              <div class="input-placeholder">
                <div class="input--wrap">
                <input :type="showPassword ? 'text' : 'password'" name="" id="password" v-model.trim="$v.password.$model" :class="{whithValue : password.length, error : validationStatus($v.password) && submitted}">
                  <label for="password">
                    {{ $t('CREATE.PASSWORD_HOLDER') }}
                  </label>
                </div>
                <div v-if="submitted && !$v.password.required" class="hint hint-warn">
                  {{ $t('CREATE.PASSWORD_WARN_REQUIRE') }}
                </div>
                <div v-if="submitted && !$v.password.rulePassword && $v.password.required" class="hint hint-warn">
                  包含非法字元或字數不正確
                </div>
              </div>
              <div class="input-placeholder">
                <div class="input--wrap">
                  <input :type="showPassword ? 'text' : 'password'" name="" id="repeatPassword" v-model.trim="$v.repeatPassword.$model" :class="{whithValue : repeatPassword.length, error : validationStatus($v.repeatPassword)}">
                  <label for="repeatPassword">
                    {{ $t('CREATE.PASSWORDREPEAT_HOLDER') }}
                  </label>
                </div>
                <div class="hint hint-warn" v-if="submitted && !$v.repeatPassword.sameAsPassword">
                  {{ $t('CREATE.PASSWORDREPEAT_WARN_INVALID') }}
                </div>
              </div>
            </div>
            <div class="btn btn-password" @click="passwordVisible">
              <font-awesome-icon v-if="!showPassword" icon="eye" />
              <font-awesome-icon v-if="showPassword" icon="eye-slash" />
            </div>   
          </div>
        </div>
        <div class="wrapper__footer">
          <router-link class="btn btn-text" to="/login">{{ $t('CREATE.SIGN') }}</router-link>
          <button class="btn btn-primary" @click.prevent="verifyHandler">{{ $t('BTN.NEXT') }}</button>
        </div>        
      </form>
      <figure class="intro">
        <img src="@/assets/img/account.svg" alt="">
        <figcaption>{{ $t('CREATE.DESCRIPTION') }}</figcaption>
      </figure>
    </div>
    <FunctionNav />
  </div>
</template>

<script>

import axios from 'axios'
import { required, sameAs, helpers} from 'vuelidate/lib/validators'
import FunctionNav from '@/components/FunctionNav'

const rulePassword = helpers.regex('password',/^(?=.*[a-zA-Z0-9!@#$%^&*()_+|~\-=`{}[\]:”;'<>?,./,]).{8,20}$/)
const ruleUser = helpers.regex('ruleUser', /^(?=.*[a-zA-Z0-9!@#$%^&*()_+|~\-=`{}[\]:”;'<>?,./,]).{5,20}$/)

const url="http://localhost:3000/users"

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
      submitted: false,
      userExist: false,
      isLoading: false
    }
  },
  components:{
    FunctionNav
  },
  validations:{
    lastname: {required},
    firstname:{required},
    user:{required,ruleUser},
    password:{required,rulePassword},
    repeatPassword:{required,sameAsPassword: sameAs('password')}
  },
  methods:{
    verifyHandler(){
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) { 
        this.createUser()
      }
    },
    passwordVisible(){
      this.showPassword = !this.showPassword
    },
    validationStatus(validation){
      return typeof validation != "undefined" ? validation.$error : false
    },
    createUser(){
      this.userExist = false;
      axios.get(url+'?userName='+this.user).then((res)=>{
        if(res.data.length){
          this.userExist = true;
          return;
        }else{
          axios.post(url,
            {
              userName: this.user,
              firstName: this.firstname,
              lastName: this.lastname,
              password: this.password
            }
          ).then(()=>{
            this.isLoading = true
            setTimeout(()=>{
              this.isLoading = false
              alert('註冊成功')
              this.$router.push({ path: '/' })
            },2000)
          })
        }
      }).catch(function (error) {
        alert(error);
      })

    },
  }
}
</script>

<style lang="scss" scoped>
  @import "@/scss/_breakpoint.scss";

  .userSignin{
    width: 780px;
    @include breakpoint-down(tl){
      width: 90%;
      .intro{
        display: none;
      }
    }
    @include breakpoint-down(pl){
      margin-top: 0px;
      width: 100%;
    }
    form{
      padding-right: 40px;
      width: 100%;
      @include breakpoint-down(tl){
        padding-right: 0px;
      }
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
      @include breakpoint-down(pl){
        flex: 0 1 100%;
        +*{
          margin-left: 0px;
        }        
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
    .passwordWrap{
      width: 100%;
      @include breakpoint-up(pl){
        display: flex;
      }
    }
    .btn-text{
      padding: 5px 0px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .btn-password{
      margin-top: 10px;
      margin-left: 10px;
    } 
    .wrapper{
      display: flex;
      align-items: center;

    }

  }
</style>>
