/**
 * 接口存放地址
 */
class APIUSER {
    // user列表
    userList = {
        url: '/api/user/userList',
        method: 'get'
    };
    // 新增user
    userAdd = {
        url: '/api/user/userAdd',
        method: 'post'
    };
    // user进入
    userLogin = {
        url: '/api/user/userLogin',
        method: 'post'
    };
    // 世界消息
    worldMsg = {
        url: '/api/msg/worldMsg',
        method: 'get'
    }
}

export default new APIUSER();