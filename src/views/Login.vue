<template>
  <div>
    <el-container>
      <el-header height="220px">
        <img class="blogo" src="../assets/img/bloglogo.png"></img>
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginlabel">
          <el-form-item label="username" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">LOGIN</el-button>
            <el-button @click="resetForm('ruleForm')">RESET</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'weishenme',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/login', this.ruleForm).then(res => {
            // console.log(res.data)
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            _this.$router.push("/blogs")

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  },
  mounted() {
    this.$notify({
      title: '爆米花：',
      message: '欢迎来到秘密基地!',
      duration: 1500
    });
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  /*background-color:aliceblue;*/
  background-color: azure;
  color: #333;
  text-align: center;
  line-height: 100px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 1060px;
  margin-top: 50px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 460px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 420px;
}
.blogo{
  height: 200px;
  margin-top: 10px;
}
.loginlabel{
  max-width: 650px;
  margin: 0 auto;
}
</style>
