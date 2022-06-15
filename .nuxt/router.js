import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0fe862ac = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _361654e1 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _e626e0b2 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _45a3db32 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _59d44b25 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _041988ef = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _780f5498 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0fe862ac,
    children: [{
      path: "",
      component: _361654e1,
      name: "home"
    }, {
      path: "/login",
      component: _e626e0b2,
      name: "login"
    }, {
      path: "/register",
      component: _e626e0b2,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _45a3db32,
      name: "profile"
    }, {
      path: "/settings",
      component: _59d44b25,
      name: "settings"
    }, {
      path: "/editor",
      component: _041988ef,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _780f5498,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
