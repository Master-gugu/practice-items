import { config } from '@/api/config/settings.js'
class WSUtil {
    constructor () {
        this.isConnet = false;
        this.forbidReconnect = false;
        this.timeout = 2000;
        this.ws = null;
        this.rec = null;
        this.list = [];
    }
    initHeartBeat() {
        let that = this;
        this.heartCheck = {
            timeout: 1000 * 2,
            timeoutObj: null,
            serverTimeoutObj: null,
            heartreset: () => {
                clearTimeout(this.timeoutObj)
                clearTimeout(this.serverTimeoutObj)
            },
            reset: function() {
                this.heartreset()
                this.start()
            },
            start: () => {
                this.timeoutObj = setTimeout(() => {
                    that.ws.send(JSON.stringify({ type: 'ping' }))
                    this.serverTimeoutObj = setTimeout(() => {
                        that.ws.close()
                    }, this.timeout)
                }, this.timeout)
            }
        }
    }
    createWs() {
        console.log('测试', config.ws_url)
        try {
            const userId = localStorage.getItem('userId');
            this.ws = new WebSocket(`${config.ws_url}/socket/ws?userId=` + userId);
            this.initWs();
            this.initHeartBeat()
            console.log('开启连接')
        } catch {
            console.log('重连失败')
            // 开始重连
            this.reConnect()
        }
    }
    initWs() {
        let that = this;
        this.ws.onopen = (event) => {
            console.log('连接成功', event, that.heartCheck);
            that.heartCheck.heartreset();
            that.heartCheck.start();
        };
        this.ws.onmessage = (event) => {
            console.log('接收到消息', JSON.parse(event.data));
            let msg = JSON.parse(event.data);
            that.tig(msg);
        };
        this.ws.onerror = (event) => {
            console.log('连接错误', event);
        };
        this.ws.onclose = (event) => {
            console.log('连接关闭', event);
            that.heartCheck.heartreset();
            // 开始重连
            that.reConnect();
        };
    }
    // 请求响应
    subscribe (callFun) {
        this.list.push(callFun);
    }
    // 订阅响应
    tig(msg) {
        this.list.forEach(function (callFun) {
            if(callFun) callFun(msg);
        });
    }
    // 断线重连
    reConnect() {
        if(this.isConnet || this.forbidReconnect) return;
        this.isConnet = true;
        this.rec&&clearTimeout(this.rec);
        // 延迟重连，避免多次频繁请求
        this.rec = setTimeout(() => {
            console.log('开始重连');
            this.createWs();
            this.isConnet = false;
        }, 2000);
    }
    // 发送消息
    sendMsg(msg) {
        if( !this.ws ) return;
        console.log('发送消息',this.ws, this.ws?.readyState);
        let msgObj = {
            time: new Date().getTime(),
            msg: msg
        };
        this.ws?.send(JSON.stringify(msgObj));
    }
    // 关闭连接
    closeWs() {
        this.forbidReconnect = true;
        this.heartCheck.heartreset();
        this.ws?.close();
        this.ws = null;
    }
}

export default new WSUtil();