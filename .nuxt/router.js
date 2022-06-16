import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0fe862ac = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _361654e1 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _e626e0b2 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _45a3db32 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _59d44b25 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _041988ef = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _780f5498 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
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

export function createRouter () {
  return new Router(routerOptions)
}
