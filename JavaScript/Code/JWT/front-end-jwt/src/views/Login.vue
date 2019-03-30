<template>
  <div>
    <h2>login</h2>
    用户名 <input type="text" v-model="user.username"/>
    密码 <input type="text" v-model="user.password"/>
    <button @click="login">提交</button>
  </div>
</template>

<script>
import axios from './axios';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: 'mark',
        password: '123456',
      },
    };
  },
  methods: {
    login() {
      axios.post('/login', this.user).then(res => {
        console.log(res);
        sessionStorage.setItem('token', res.data.token);
        this.$router.push('/order');
      });
    },
  },
};
</script>

<style scoped>

</style>
