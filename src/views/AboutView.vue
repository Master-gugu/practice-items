<template>
  <div class="index">
      <ul>
          <li :class="{'rightText': userId == item.id}" v-for="(item, index) in message" :key="index">
              {{ item.msg }} - {{ item.times }}
          </li>
      </ul>
      页面二
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="info" round v-if="!ws" @click="createWs">开启{{ isConnet }}</el-button>
      <el-button type="warning" round v-else @click="closeWs">离开</el-button>
      <el-button type="info" round @click="sendMsg">信息按钮2</el-button>
      <el-button type="warning" round @click="openMap">跳转地图</el-button>
      <el-button type="warning" round @click="openThree('/threeIndex')">跳转three1</el-button>
      <el-button type="warning" round @click="openThree('/threeTeo')">跳转three2</el-button>

      <chatCom></chatCom>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { dateStr } from '@/utils/util'
import * as USER from '@/store/mutation/mutation-user';

export default {
  name: 'indexPage',
  data () {
      return {
          input: '',
          message: [],
          rightTextShow: false,
          userId: '',
          worldMsg: [],
          messageInfo: '',
          ws: null,
          isConnet: false,
          timeout: 2000,
          timeoutObj: null,
      }
  },
  created () {
      this.reqInfo();
      this.reqWorldMsg();
      this.userId = localStorage.getItem('userId');
      // 开启ws
      // this.createWs();
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
      // 创建连接
      createWs() {
          try {
              const userId = localStorage.getItem('userId');
              this.ws = new WebSocket('ws://192.168.2.33:9090/socket/ws?userId=' + userId);
              this.initWs();
              this.$notify({
                  title: '开启连接',
              });
          } catch {
              this.$notify({
                  title: '重连失败',
              });
              // 开始重连
              this.reConnect()
          }
      },
      initWs() {
          this.isConnet = true;
          this.ws.onopen = this.wsOnopen;
          this.ws.onmessage = this.wsOnmessage;
          this.ws.onerror = this.wsOnerror;
          this.ws.onclose = this.wsOnclose;
      },
      wsOnopen(event) {
          console.log('连接成功', event);
          this.timeoutObj = setTimeout(() => {
              if(this.isConnet) this.ws.send(JSON.stringify({ type: 'ping' }))
          }, this.timeout);
          this.$message({
              showClose: true,
              message: '连接成功',
              type: 'success'
          });
      },
      wsOnmessage(event) {
          console.log('接收到消息', JSON.parse(event.data));
          if(JSON.parse(event.data).type == 'pong') {
              clearTimeout(this.timeoutObj);
              this.timeoutObj = setTimeout(() => {
                  if(this.isConnet) this.ws.send(JSON.stringify({ type: 'ping' }))
              }, this.timeout);
          } else {
              let msg = JSON.parse(event.data);
              msg.times = dateStr(msg.time);
              this.message.push(msg);
              console.log('收到消息', this.message);
              this.$message({
                  showClose: true,
                  message: '收到消息',
                  type: 'success'
              });
          }
      },
      wsOnerror(event) {
          console.log('连接错误', event);
          this.$message({
              showClose: true,
              message: '连接错误',
              type: 'error'
          });
          this.isConnet = false;
          // 开始重连
          this.reConnect()
      },
      wsOnclose(event) {
          console.log('连接关闭', event);
          this.$message({
              showClose: true,
              message: '连接关闭',
              type: 'warning'
          });
          this.isConnet = false;
      },
      // 断线重连
      reConnect() {
          if(this.isConnet) return;
          this.rec&&clearTimeout(this.rec);
          // 延迟重连，避免多次频繁请求
          this.rec = setTimeout(() => {
              console.log('开始重连');
              this.createWs();
          }, 2000);
      },
      sendMsg() {
          if( !this.ws ) return;
          console.log('发送消息',this.ws, this.ws?.readyState)
          this.messageInfo = this.input;
          let msgObj = {
              time: new Date().getTime(),
              msg: this.input
          }
          if(this.ws?.readyState == WebSocket.OPEN) {
              this.ws?.send(JSON.stringify(msgObj));
          }else{
              this.isConnet = false;
              // 开始重连
              this.reConnect()
          }
      },
      closeWs() {
          this.ws?.close();
          this.ws = null;
          this.timeoutObj = null;
          this.isConnet = false;
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