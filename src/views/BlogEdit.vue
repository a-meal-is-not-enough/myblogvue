<template>
  <div>
    <Header></Header>
    <div class="editbox">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="泡泡脑袋" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="泡泡围脖" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="泡泡肚子" prop="content">
          <mavon-editor v-model="editForm.content"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">吐个泡泡</el-button>
          <el-button>退退退！</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      editForm: {
        id: null,
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入泡泡脑袋', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入泡泡围脖', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    if (blogId){
      this.$axios.get("/blog/"+blogId).then((res) =>{
        const  blog =res.data.data
        _this.editForm.id = blog.id
        _this.editForm.title = blog.title
        _this.editForm.description = blog.description
        _this.editForm.content = blog.content
      });
    }
  },
  methods:{
    submitForm() {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/blog/edit', this.editForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then((res) => {
            // _this.$alert('泡泡吹好了', '悄悄告诉你：', {
            //   confirmButtonText: 'GREAT',
            //   callback: action => {
            //     _this.$router.push("/blogs")
            //   }
            // });
            _this.$notify({
              title: '悄悄告诉你：',
              message: '泡泡吹好了',
              type: 'success',
              onClose(){
                _this.$router.push("/blogs")
              },
              onClick(){
                _this.$router.push("/blogs")
              },
              duration: 0

            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
.editbox{
  margin: 0 auto;
  text-align: center;
}
</style>
