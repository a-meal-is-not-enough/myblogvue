<template>
  <div class="blogheader">
    <h3>{{user.username}}的泡泡塘</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
    </div>
    <div class="meue">
      <el-link type="primary">泡泡塘</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link type="success" href="/blog/add">冒个泡泡</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link v-show="!isLogin" type="info" href="/login">LOGIN</el-link>
      <el-link v-show="isLogin" type="info" @click="logout">EXIT</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      isLogin:false,
      user:{
        username:'weishenme',
        avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
    }
  },
  methods:{
    //退出
    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res =>{
        _this.$store.commit("REMOVE_INFO")//清空信息
        _this.$router.push("/login")
      })
    }
  },
  created() {
    if (this.$store.getters.getUser.username){
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
.meue{
  margin:10px;
}
.blogheader{
  margin: 0 auto;
  text-align: center;
  /*background-color: azure;*/
}
</style>
