<template>
  <div>
    <Header></Header>
    <el-divider></el-divider>
    <div class="blog-detail">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import 'github-markdown-css/github-markdown.css'
export default {
  name: "BlogDetail",
  components: {Header},
  data(){
    return{
      blog:{
        userId:null,
        title:"",
        description:"",
        conten:""
      },
      ownBlog:false
    }
  },
  methods:{
    getBlog() {
      const blogId = this.$route.params.blogId
      const _this = this
      this.$axios.get('/blog/' + blogId).then((res) => {
        console.log(res)
        console.log(res.data.data)
        _this.blog = res.data.data
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        var result = md.render(_this.blog.content);
        _this.blog.content = result
        // 判断是否是自己的paopao，能否编辑
        _this.ownBlog =  (_this.blog.userId === _this.$store.getters.getUser.id)
      });
    }
  },
  created() {
    this.getBlog()
  }
}
</script>

<style scoped>
.blog-detail{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  padding: 20px 15px;
}
</style>
