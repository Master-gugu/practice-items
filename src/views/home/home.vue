<template>
    <div class="home">
        <div>
            <div>新增</div>
            <!-- <el-input v-model="user.name" placeholder="请输入name" clearable></el-input>
            <el-input v-model="user.password" placeholder="请输入password" clearable show-password></el-input>
            <el-button type="primary" round @click="addUser">主要按钮</el-button> -->
        
            <el-form :model="user" :rules="rules" label-width="100px" ref="ruleForm">
                <el-form-item label="name" prop="name">
                    <el-input v-model="user.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="user.password" clearable show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="addUser('ruleForm')">主要按钮</el-button>
                </el-form-item>
            </el-form>

            <el-form :model="user1" :rules="rules" label-width="100px" ref="ruleForm1">
                <el-form-item label="name" prop="name">
                    <el-input v-model="user1.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="user1.password" clearable show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" round @click="userLogin('ruleForm1')">主要按钮</el-button>
                </el-form-item>
            </el-form>
        
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as USER from '@/store/mutation/mutation-user';
export default {
    name: 'homePage',
    data () {
        return {
            user: {
                name: '',
                password: ''
            },
            user1: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入name', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入password', trigger: 'blur' }
                ],
            }
        }
    },
    created () {
        
    },
    methods: {
        ...mapActions([USER.USERLIST, USER.USERADD, USER.USERLOGIN]),
        // 新增user
        addUser(formName) {
            this.$refs[formName].validate(async valid => {
                console.log('新增信息1', valid)
                if (valid) {
                    console.log('新增信息2', this.user)
                    let data = this.user;
                    const res = await this[USER.USERADD](data);
                    if(res.code == 200) {
                        console.log('新增信息', res)
                    }
                } else {
                    return false;
                }
            })
        },
        // user进入
        userLogin(formName) {
            this.$refs[formName].validate(async valid => {
                if(valid) {
                    let data = this.user1;
                    const res = await this[USER.USERLOGIN](data);
                    if(res.code == 200) {
                        console.log('进入信息', res)
                        let token = res.data.token;
                        let userId = res.data.userId;
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', userId);

                        this.$router.push('/index');
                    }
                }
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
.home {

}
</style>