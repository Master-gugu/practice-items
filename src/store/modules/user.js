import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils/request';
import * as USER from '@/store/mutation/mutation-user';
import api from '@/api';

Vue.use(Vuex)

export default {
    state: {
        title: ''
    },
    mutations: {
        
    },
    actions: {
        // 获取user列表
        [USER.USERLIST]: (store, data) => {
            return axios({
                url: `${api.userList.url}`,
                method: `${api.userList.method}`
            })
        },
        // 新增user
        [USER.USERADD]: (store, data) => {
            return axios({
                url: `${api.userAdd.url}`,
                method: `${api.userAdd.method}`,
                data
            })
        },
        // user进入
        [USER.USERLOGIN]: (store, data) => {
            return axios({
                url: `${api.userLogin.url}`,
                method: `${api.userLogin.method}`,
                data
            })
        },
        // 世界消息
        [USER.WORLDMSG]: (store, data) => {
            return axios({
                url: `${api.worldMsg.url}`,
                method: `${api.worldMsg.method}`
            })
        }
    }
}