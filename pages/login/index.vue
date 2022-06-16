<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{isLogin?'Sign up':'Sign in'}}</h1>
                    <p class="text-xs-center">
                        <!-- <a href="">Have an account?</a> -->
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <li>That email is already taken</li>
                    </ul>
                        <!-- @submit.prevent :阻止表单的默认提交行为,由我们自己发起异步行为提交表单  -->
                    <form @submit.prevent="onSubmit">
                        <fieldset v-if="!isLogin" class="form-group">
                            <input class="form-control form-control-lg" 
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
                            required>
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{isLogin?'Sign up':'Sign in'}}
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
import {login} from '@/api/user'

// // 仅在客户端加载 js-cookie 包
// const Cookie = process.client ? require('js-cookie') : undefined

export default {
//   middleware: 'notAuthenticated',
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
        // username: '',
        email: '',
        password: ''
      },
    //   errors: {} // 错误信息
    }
  },

  methods: {
    async onSubmit () {
        console.log('onSubmit:')
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
        const { data }=await login({
            user: this.user
        })
        console.log('data:',data)
        // todo：保存用户的登录状态

        // 跳转到首页
        this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
