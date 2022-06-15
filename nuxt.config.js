/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // linkActiveClass: 'active',
    // 第一次加配置文件必须重启才能生效
    // 自定义路由表规则
    extendRoutes(routes,resolve){
      // console.log(routes)
      // 利用代码技巧 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      // 添加自己的路由对象
      routes.push(...[
        {
          path:'/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path:'',// 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
          ],
        }
      ])
    }
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: 3000
  // },

  // // 注册插件
  // plugins: [
  // ]
}
