<template>
  <div class="wrapper admin">
    <div class="wrapper__loading" v-show="isLoading"></div>
    <div class="admin__header">
      <h1>後台管理</h1>
      <div class="btn btn-primary" @click="isFunctionList = !isFunctionList">
        功能切換
      </div>
    </div>
    <div class="admin__body" v-if="isFunctionList">
      <div class="admin__list">
        <div class="input-placeholder">
          <div class="input--wrap">
            <input type="text" id="lastname" v-model.trim="search" />
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
            <tr v-for="user in userList" :key="user.id">
              <td data-label="使用者名稱">
                <input
                  type="text"
                  v-model="user.userName"
                  @change="userEditHandler(user.id)"
                />
              </td>
              <td data-label="信箱" v-once>{{ user.mail }}</td>
              <td data-label="權限">
                <select v-model="user.auth" @change="userEditHandler(user.id)">
                  <option v-for="auth in authList" :key="auth" :value="auth">{{
                    auth
                  }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="admin__body" v-if="!isFunctionList">
      <select
        class="admin__userSelect"
        v-model="selectId"
        @change="userSelectHandler"
      >
        <option value selected disabled>請選擇使用者</option>
        <option :value="user.id" v-for="user in users" :key="user.id" v-once>{{
          user.userName
        }}</option>
      </select>
      <div class="admin__list">
        <table>
          <thead>
            <tr>
              <th>使用者名稱</th>
              <th>信箱</th>
              <th>權限</th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="Object.keys(userSelected).length">
              <td data-label="使用者名稱">
                <input
                  type="text"
                  v-model="userSelected.userName"
                  @change="userEditHandler(userSelected.id)"
                />
              </td>
              <td data-label="信箱">{{ userSelected.mail }}</td>
              <td data-label="權限">
                <select
                  v-model="userSelected.auth"
                  @change="userEditHandler(userSelected.id)"
                >
                  <option v-for="auth in authList" :key="auth" :value="auth">{{
                    auth
                  }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn btn-primary btn-auto" @click="usersUpdateHandler">
      更改使用者資料
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/users";

export default {
  data() {
    return {
      users: [],
      authList: ["admin", "user"],
      search: "",
      isLoading: true,
      selectId: "",
      userSelected: {},
      isFunctionList: true,
    };
  },
  created() {
    axios.get(url).then((res) => {
      this.users = res.data;
      this.isLoading = false;
    });
  },
  computed: {
    userList() {
      if (!this.search) return this.users;

      return this.users.filter(
        (user) => user.userName.indexOf(this.search) != -1
      );
    },
  },
  methods: {
    userEditHandler(id) {
      const userSelected = this.users.find((user) => user.id == id);
      userSelected.isEdit = true;
    },
    userSelectHandler() {
      this.userSelected = this.users.find((user) => user.id === this.selectId);
    },
    usersUpdateHandler() {
      const usersEditList = this.users.filter((user) => user.isEdit == true);
      if (!usersEditList.length) return;
      this.isLoading = true;

      axios
        .all(
          usersEditList.map((user) => {
            axios.patch(url + "/" + user.id, {
              userName: user.userName,
              auth: user.auth,
              mail: user.userName + "@gmail.com",
            });
          })
        )
        .then(() => {
          this.isLoading = false;
          alert("成功更新使用者資料");
          this.$router.go();
        });
    },
    usersReadHandler() {
      axios.get(url).then((res) => {
        this.users = res.data;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_breakpoint.scss";

.admin {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  @include breakpoint-down(tl) {
    margin-top: 0px;
  }
  &__header {
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ccc;
  }
  &__list {
    margin-bottom: 1.5rem;
    .input-placeholder {
      margin-bottom: 1rem;
    }
    table {
      overflow: hidden;
      width: 100%;
      th,
      td {
        border: 1px solid #ccc;
        padding: 13px 15px;
      }
      input {
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ccc;
      }
      select {
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ccc;
      }
      @include breakpoint-down(tl) {
        thead {
          display: none;
        }
        tr,
        td {
          display: block;
        }
        tr {
          margin-top: 1rem;
          border: 2px solid #ccc;
        }
        td {
          border: none;
          &:before {
            content: attr(data-label);
            display: block;
            margin-bottom: 5px;
            white-space: nowrap;
            font-weight: bold;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
  &__userSelect {
    border: 1px solid #ccc;
    padding: 10px 15px;
    margin-bottom: 1rem;
  }
}</style
>>
