<template>
  <div class="input-placeholder">
    <input type="text" v-model="value">
  </div>
</template>

<script>
export default {
  props:{
    value:{
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>