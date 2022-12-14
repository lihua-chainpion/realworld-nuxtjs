const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  // 当前登录用户的登录状态
  user: null,
})

export const getters = {}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req, route, redirect }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {}
    }
    commit('setUser', user)
  },
}

// 13838557452
