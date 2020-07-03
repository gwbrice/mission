<template>
  <div class="wrapper admin">
    <div class="admin__header">
      <h1>後台管理</h1>
      <div class="btn btn-primary">
        功能切換
      </div>
    </div>
    <div class="admin__body">
      <div class="admin__list">
        <div class="input-placeholder">
          <div class="input--wrap">
            <input type="text" id="lastname" v-model.trim="search" >
            <label for="lastname">使用者搜尋</label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>使用者名稱</th>
              <th>信箱</th>
              <th>權限</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search:''
    }
  }
}
</script>

<style lang="scss" scoped>
  .admin{
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5rem;
    &__header{
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #ccc;
    }
    &__list{
      .input-placeholder{
        margin-bottom: 1rem;
      }
      table{
        overflow: hidden;
        width: 100%;
        th,td{
          border: 1px solid #ccc;
          padding: 13px 15px;
        }
      }
    }
  }
</style>>
