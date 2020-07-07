<template>
  <form class="password">
    <div class="wrapper__body">
      <div class="input-placeholder">
        <div class="input--wrap">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="$v.password.$model"
            :class="{whithValue : password.length, error : validationStatus($v.password)}"
          />

          <label for="password">{{ $t('SIGN.PASSWORD_HOLDER') }}</label>
          <div class="btn btn-password" @click="passwordVisible">
            <font-awesome-icon v-if="!showPassword" icon="eye" />
            <font-awesome-icon v-if="showPassword" icon="eye-slash" />
          </div>
        </div>
        <div
          v-if="submitted && !$v.password.required"
          class="hint hint-warn"
        >{{ $t('SIGN.PASSWORD_WARN_REQUIRE') }}</div>
        <div
          v-if="submitted && !isAccountValidated && $v.password.required"
          class="hint hint-warn"
        >{{ $t('SIGN.PASSWORD_WARN_INVALID') }}</div>
      </div>
    </div>
    <div class="wrapper__footer">
      <button class="btn btn-text">{{ $t('SIGN.PASSWORD_FORGOT') }}</button>
      <button class="btn btn-primary" @click.prevent="verifyHandler">{{ $t('BTN.NEXT') }}</button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";

const url = "http://localhost:3000/users";

export default {
  name: "UserPassword",
  props: ["account"],
  data() {
    return {
      password: "",
      submitted: false,
      showPassword: false,
      isAccountValidated: true
    };
  },
  validations: {
    password: { required }
  },
  methods: {
    passwordVisible() {
      this.showPassword = !this.showPassword;
    },
    verifyHandler() {
      this.submitted = true;
      this.$v.$touch();
      const user = this.account.substr(0, this.account.indexOf("@"));
      if (!this.$v.$invalid) {
        axios.get(url + "?userName=" + user).then(res => {
          if (res.data[0].password === this.password) {
            (this.isAccountValidated = true), alert("成功登入");
            this.$router.push("/administrator");
          } else {
            this.isAccountValidated = false;
          }
        });
      }
    },
    validationStatus(validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    }
  }
};
</script>

<style lang="scss">
.accountSelect {
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
}
.password {
  .wrapper__footer {
    margin-top: 1.5rem;
  }
  .btn-password {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
}
</style>>

