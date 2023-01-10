import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'
import router from '@/plugins/router'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(0)

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === 1
  })

  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${account.value}?colors=fd6084,045071,fe9b91,fec49b,fcd8af`
  })
  const login = async (form) => {
    try {
      const { data } = await api.post('/users/login', form)
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登入成功'
      })
      router.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      account.value = ''
      role.value = 0
      cart.value = 0
      router.push('/')
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登出成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getUser = async () => {
    if (token.value.length === 0) return
    try {
      // 呼叫請求
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
    } catch (error) {
      logout()
    }
  }

  return {
    token, account, email, cart, role, login, logout, getUser, isLogin, isAdmin, avatar
  }
}, {
  persist: {
    key: '20230103',
    paths: ['token']
  }
})
