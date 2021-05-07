<template>
    <div class='app'>
    <el-form label-width="60px" style="width: 300px;">
        <h2 style='text-align: center;'>活动管理后台</h2>
        <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model='form.username'></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input placeholder="请输入密码" show-password v-model='form.password'></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
            <el-button type='primary' @click="login">提交</el-button>
            <el-button type='primary'>创建账号</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style>
    body {
        background-image: url('../../static/images/bg.jpeg');
        background-repeat: no-repeat;
    }

    .app {
        background-color: rgb(226, 239, 243);
        position: absolute;
        top: 20%;
        left: 35%;
        width: 350px;
        height: 270px;
        padding: 40px;
        border: 1px black solid;
        border-radius: 10px;
    }
</style>
<script>
    import login from '@/api/login.js'
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                var data = this.form;
                const url = 'http://elm.4399sy.com/login';
                var that = this;
                login(data)
                    .then(res => {
                        if(res.data.status==0){
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            // localStorage.setItem('token','123')
                            // console.log(res.data)
                            this.$store.dispatch('getUserToken',res.data);
                            setTimeout(()=>{
                                this.$store.commit('increment');
                                this.$router.push({ path: '/admin' })
                            },2000)
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            console.log(this.$store)
            console.log(1234)
        }
    }
</script>