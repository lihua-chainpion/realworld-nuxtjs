<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="msg in messages" :key="field + msg">
                {{ field }} {{ msg }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authMixin from '@/assets/js/auth-mixin'
import pick from 'lodash.pick'
const Cookies = process.client ? require('js-cookie') : undefined
import { login } from '@/api/user'

export default {
  nmae: 'LoginPage',
  mixins: [authMixin],
  methods: {
    onSubmit() {
      login(this.$request, { user: pick(this, ['email', 'password']) })
        .then((res) => {
          this.errors = {}
          // 保存用户的登录状态
          this.$store.commit('setUser', res.user)
          // 为防止刷新页面数据丢失，把数据持久化
          // 提交表单一定是在客户端做的，所以 Cookie 一定有值
          Cookies.set('user', JSON.stringify(res.user))
          this.$router.push('/')
        })
        .catch((err) => {
          this.errors = err.errors
          console.error('login err:', err)
        })
    },
  },
}
</script>
