<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <!-- <a href="">Have an account?</a> -->
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                    </p>
                    <!-- 遍历外层对象：1.额外添加父节点 2.template -->
                    <ul class="error-messages">
                        <template v-for="(messages,field) in errors">
                            <li  v-for="(message,index) in messages" :key="index">{{field}}{{message}}</li>
                        </template>
                        
                    </ul>
                        <!-- @submit.prevent :阻止表单的默认提交行为,由我们自己发起异步行为提交表单  -->
                    <form @submit.prevent="onSubmit">
                        <fieldset v-if="!isLogin" class="form-group">
                            <input v-model="user.username"
                            class="form-control form-control-lg" 
                            type="text" 
                            placeholder="Your Name" 
                            required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email"
                            class="form-control form-control-lg" 
                            type="email" 
                            placeholder="Email"
                            required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input  v-model="user.password"
                            class="form-control form-control-lg" 
                            type="password" 
                            placeholder="Password"
                            required
                min-length="8">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{isLogin?'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import { login, register } from '@/api/user'
// import request from '@/utils/request'
import {login,register} from '@/api/user'

/**
 * 用了一个叫js-cookie的第三方包，专门用来操作浏览器中cookie的第三方包，不是用来操作服务端的
 * process.client:nuxt中特殊提供的判断 环境为 客户端/服务端 
 */
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    // 登录后不能再访问登录、注册页
    middleware: 'notAuthenticated',
    name: 'LoginIndex',
    // 为了登录注册用同一个组件
    computed: {
        isLogin () {
        // 用name不用path的原因：path可能会携带query参数等，不严谨
        return this.$route.name === 'login'
        }
    },
    data () {
        return {
        user: {
            username: '',
            email: '',
            password: ''
        },
        errors: {
            // email:['q','b'],
            // password:['q','b']
        } // 错误信息
        }
    },

    methods: {
        async onSubmit () {
            console.log('onSubmit')
            /**
             * 11.登录注册-封装请求方法
             * 不建议在项目中直接写请求代码，一旦接口改动需要在项目中各个地方找请求的地方。
             * 对它进行统一的组织，管理。方便维护、重用。
             * 
             * 建议把请求封装成一个方法（见api文件夹）
             */
            // 提交表单请求登录
            // const { data }=await request({
            //     method:'POST',
            //     url:'/api/users/login',
            //     data:{
            //         user: this.user
            //     }
            // })
            try{
                const { data }=this.isLogin
                ? await login({
                    user: this.user
                })
                : await register({
                    user: this.user
                })
                console.log('data:',data)
                // todo：保存用户的登录状态
                this.$store.commit('setUser', data.user)
                
                // 为了防止刷新页面数据丢失，我们需要把数据持久化
                /**
                 * 登录注册-登录状态持久化:
                 * 不能本地存储化，因为只有客户端能拿到，服务端拿不到
                 * 我们需要这个数据客户端、服务端都能拿到，可以放cookie里
                 */
                Cookie.set('user', data.user)

                // 跳转到首页
                this.$router.push('/')
            }catch(err) {
                console.log('请求失败:',err)
                console.dir(err)
                this.errors=err.response.data.errors;
            }
            
        }
    }
}
</script>

<style>

</style>
