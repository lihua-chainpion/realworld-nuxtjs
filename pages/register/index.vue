<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login">Have an account?</nuxt-link>
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
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
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
              Sign up
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
import { register } from '@/api/user'

export default {
  nmae: 'RegisterPage',
  mixins: [authMixin],
  data() {
    return {
      username: '',
    }
  },
  methods: {
    onSubmit() {
      register(this.$request, {
        user: pick(this, ['username', 'email', 'password']),
      })
        .then(() => {
          this.errors = {}
          // 保存用户的登录状态
          this.$router.push('/')
        })
        .catch((err) => {
          this.errors = err.errors
          console.error('register err:', err)
        })
    },
  },
}
</script>
