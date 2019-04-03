<template>
  <div>
    <h2>Order</h2>
    <h3>{{username}}</h3>
  </div>
</template>

<script>
  import axios from './axios';
  export default {
    name: 'Order',
    data() {
      return {
        username: ''
      }
    },
    mounted () {
      axios.get('/order').then(res => {
        this.username = res.data.user.username;
      }).catch(e => {
        this.$router.push('/login');
      })
    }
  };
</script>

<style scoped>

</style>
