<template>
  <div class="functionNav">
    <select id="lang" v-model="$i18n.locale" @change="setLang($event)">
      <option value="tw">繁體中文</option>
      <option value="en">English</option>
    </select>
    <div>
      <a href="#">{{ $t('GENERAL.HELP') }}</a>
      <a href="#">{{ $t('GENERAL.PRIVACY') }}</a>
      <a href="#">{{ $t('GENERAL.TERMS') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunctionNav',
  methods:{
    setActiveLanguage(lang) {
      localStorage.setItem('language', lang)
    },
    setLang(evt) {
      let lang = evt.target.value
      this.setActiveLanguage(lang)
      return history.go(0)
    },  
  }
}
</script>

<style lang="scss" scoped>
  .functionNav{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 0.8rem;
    a{
      color: #999;
      +a{
        margin-left: 20px;
      }
    }
  }
</style>>