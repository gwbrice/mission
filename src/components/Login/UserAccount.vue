<template>
  <form class="account" @submit.prevent="submitAccount">
    <div class="wrapper__body">
      <div class="input-placeholder">
        <div class="input--wrap">
          <input
            type="text"
            name
            id="account"
            v-model.trim="$v.account.$model"
            :class="{whithValue : account.length, error : submitted && validationStatus($v.account)}"
          />
          <label for="account">{{ $t('SIGN.ACCOUNT_HOLDER') }}</label>
        </div>
        <div
          v-if="submitted && !$v.account.required"
          class="hint hint-warn"
        >{{ $t('SIGN.ACCOUNT_WARN_REQUIRE') }}</div>
        <div
          v-if="submitted && !$v.account.mailAndPhone"
          class="hint hint-warn"
        >{{ $t('SIGN.ACCOUNT_WARN_INVALID') }}</div>
        <div
          v-if="submitted && !isAccountValidated"
          class="hint hint-warn"
        >{{ $t('SIGN.ACCOUNT_WARN_NOTFOUND') }}</div>
      </div>
      <button class="btn btn-text">{{ $t('SIGN.FORGOT') }}</button>
      <div class="notice">
        {{ $t('SIGN.NOTICE') }}
        <a href="#">{{ $t('SIGN.NOTICE_MORE') }}</a>
      </div>
    </div>
    <div class="wrapper__footer">
      <router-link class="btn btn-text" to="/signin">{{ $t('SIGN.CREATE') }}</router-link>
      <input type="submit" class="btn btn-primary" :value="$t('BTN.NEXT')" />
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { required, helpers } from "vuelidate/lib/validators";
const mailAndPhone = helpers.regex(
  "mailAndPhone",
  /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
);
const url = "http://localhost:3000/users";

export default {
  name: "UserLogin",
  data() {
    return {
      account: "",
      submitted: false,
      isAccountValidated: true
    };
  },
  validations: {
    account: { required, mailAndPhone }
  },
  methods: {
    submitAccount() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        axios.get(url + "?mail=" + this.account).then(res => {
          if (res.data.length) {
            this.$emit("loadingHandler", true);
            setTimeout(() => {
              this.$router.push({ path: "password" });
              this.$emit("accountHandler", this.account);
              this.$emit("loadingHandler", false);
            }, 2000);
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

<style>
</style>