<template>
  <div class="index">
      <ul>
          <li :class="{'rightText': userId == item.id}" v-for="(item, index) in message" :key="index">
              {{ item.msg }} - {{ item.times }}
          </li>
      </ul>
      页面二
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="info" round v-if="!wsOpen" @click="initWs">开启{{ wsOpen }}</el-button>
      <el-button type="warning" round v-else @click="closeWs">离开</el-button>
      <el-button type="info" round @click="sendMsg">信息按钮2</el-button>

      <chatCom></chatCom>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { dateStr } from '@/utils/util'
import * as USER from '@/store/mutation/mutation-user';
import wsUtil from '@/utils/ws';

export default {
  name: 'indexPage',
  data () {
      return {
          input: '',
          message: [],
          rightTextShow: false,
          userId: '',
          worldMsg: [],
          wsOpen: false,
      }
  },
  created () {
      this.reqInfo();
      this.reqWorldMsg();
      this.userId = localStorage.getItem('userId');
  },
  destroyed () {
      this.closeWs();
  },
  methods: {
      ...mapActions([USER.USERLIST, USER.WORLDMSG]),
      // 跳转地图
      openMap() {
          this.$router.push({
              path: '/MapContainer'
          })
      },
      openThree(url) {
          this.$router.push({
              path: url
          })
      },
      // 获取世界消息
      async reqWorldMsg() {
          const res = await this[USER.WORLDMSG]();
          if(res.code == 200) {
              console.log('msginfo', res)
              // events.sort((a, b) => b.timestamp - a.timestamp);
              let arrMsg = []
              res.data.forEach((item, index) => {
                  item.msgList.forEach((msg, index) => {
                      arrMsg.push({
                          id: item.userId,
                          msg: msg.msg,
                          times: msg.time
                      })
                  })
              })
              arrMsg.sort((a, b) => a.times - b.times).map(item => {
                  return item.times = dateStr(item.times);
              });
              this.message = arrMsg;
              console.log('处理信息', arrMsg)
          }
      },
      // 获取信息
      async reqInfo() {
          // axios.get('http://192.168.2.33:9090/api/user/userList').then((res) => {
          //     console.log('请求1', res.data);
          //     console.log('status',res.status);
          //     console.log('statusText',res.statusText);
          //     console.log('headers',res.headers);
          //     console.log('config',res.config);
          // }).catch((err) => {
          //     console.log(err);
          // }).finally(() => {
          //     console.log('finally');
          // })
          
          // axios({
          //     url: '/api/user/userList',
          //     method: 'get'
          // }).then((res) => {
          //     console.log('请求2', res);
          // })

          // const res = await axios({url:'/api/user/userList', method: 'get'});
          // console.log('请求3', res, res.code);

          const res = await this[USER.USERLIST]();
          console.log('请求4', res);
          if(res.code == 200) {
              console.log('请求成功', res);
          }else if(res.code == 401) {
              this.$router.push({name: 'home'});
          }
      },
      // 初始化ws
      initWs() {
        console.log('wsUtil', wsUtil)
        wsUtil.createWs()
        this.initWsMsg()
        this.wsOpen = !this.wsOpen
      },
      sendMsg() {
        wsUtil.sendMsg(this.input)
        this.$notify({
            title: '成功',
            message: '发送成功',
            type: 'success'
        });
      },
      //订阅
      initWsMsg() {
        wsUtil.subscribe(
            msg => {
                if(msg.type == 'pong') {
                    wsUtil.heartCheck.reset()
                } else {
                    msg.times = dateStr(msg.time);
                    console.log('收到消息', msg);
                    this.message.push(msg);
                }
            }
        )
      },
      // 关闭连接
      closeWs() {
        wsUtil.closeWs()
        this.wsOpen = false
        this.$notify({
            title: '成功',
            message: '退出成功',
            type: 'success'
        });
      }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .rightText {
      text-align: center;
  }
}
</style>