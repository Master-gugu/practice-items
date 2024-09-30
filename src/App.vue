<template>
  <div id="app">
    <router-view/>

    <div>
      <input type="text" v-model="title">
      <button type="button" @click="submit">提交</button>
      <button type="default" @click="getProjects">获取</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // 引入axios
export default {  
  name: 'App',
  data() {
    return {
      title: '',
    }
  },
  // 挂载的时候获取新闻列表
  mounted() {
    // axios.get('/mock/news').then(res => {
    //   console.log('请求数据', res.data)
    // })
  },
  methods: {
    // 提交
    submit() {
      // axios.post('/mock/addProject', { // 添加接口数据，数据为一个对象，有个title属性
      //   title: this.title
      // })
    },
    getProjects() {
      // axios.get('/mock/projects').then(res => {
      //   console.log('获取提交数据', res)
      // })
    }
  }
}
</script>