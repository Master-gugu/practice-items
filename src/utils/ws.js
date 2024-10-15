import { config } from '@/api/config/settings.js'
import { dateStr } from '@/utils/util'
class WSUtil {
    constructor () {
        this.isConnet = false;
        this.timeout = 2000;
        this.timeoutObj = null;
        this.ws = null;
        this.rec = null;
    }

    createWs() {
        console.log('测试', config.ws_url)
        try {
            const userId = localStorage.getItem('userId');
            this.ws = new WebSocket(`${config.ws_url}/socket/ws?userId=` + userId);
            this.initWs();
            console.log('开启连接')
        } catch {
            console.log('重连失败')
            // 开始重连
            // this.reConnect()
        }
    }

    initWs() {
        this.isConnet = true;
        this.ws.onopen = this.wsOnopen;
        this.ws.onmessage = this.wsOnmessage;
        this.ws.onerror = this.wsOnerror;
        this.ws.onclose = this.wsOnclose;
    }

    wsOnopen(event) {
        console.log('连接成功', event);
        this.timeoutObj = setTimeout(() => {
            if(this.isConnet) this.ws.send(JSON.stringify({ type: 'ping' }))
        }, this.timeout);
    }

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
        }
    }

    wsOnerror(event) {
        console.log('连接错误', event);
        this.isConnet = false;
        // 开始重连
        this.reConnect()
    }

    wsOnclose(event) {
        console.log('连接关闭', event);
        this.isConnet = false;
    }

    // 断线重连
    reConnect() {
        if(this.isConnet) return;
        this.rec&&clearTimeout(this.rec);
        // 延迟重连，避免多次频繁请求
        this.rec = setTimeout(() => {
            console.log('开始重连');
            this.createWs();
        }, 2000);
    }
}

export default new WSUtil();