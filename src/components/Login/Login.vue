<template>
  <div class="login-page">
    <Header :go-back="true">
    </Header>
    <h6 class="login-message">{{errorMessage}}</h6>
    <h2>账号登录</h2>
    <form>
      <label class="input-wrap">
        <input type="text" placeholder="用户名/手机号/Email" v-model="user.username">
      </label>
      <label class="input-wrap">
        <input type="password" placeholder="请输入您的密码" v-model="user.password">
      </label>
      <section class="button-wrap">
        <button class="login-btn" @click.prevent="login">登录</button>
      </section>
    </form>
  </div>
</template>

<script>
import Header from '../Header/Header'
import { login } from 'root/getData' 
import { mapMutations, mapState} from 'vuex'
import { setStorage } from 'lib/utils'
export default {
  components: {
    Header
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      showMes: false,
      errorMessage: '首次登陆会注册'
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['LOGIN_STATE', 'GET_USERINFO']),
    async login() {
      if (this.checkUserChar()) {
        let res = await login(this.user)
        if (res.data.status == 1) {
          setStorage('user_id', res.data.user_id)
          this['LOGIN_STATE'](true)
          this.$router.push({name: 'home'})
          return 
        }else {
          this.errorMessage = '用户名或密码不正确'
        }
      }else { 
        this.errorMessage = '密码或用户名格式不正确'
      }
      this.showMes = true
      this['LOGIN_STATE'](false)
    },
    checkUserChar() {
      let userReg = /[a-zA-Z0-9_-]{6,12}/
      for(let key in this.user) {
        let value = this.user[key]
        if (!userReg.test(value)) {
          return false
        }
      }
      return true 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isLogin){
        next(from.path)
      }else {
        next()
      }
    })
  },
}
</script>

<style lang="scss">
  .login-page{
    .login-message{
      text-align: center;
      padding: 1rem 0;
      background-color: #FFF6E0;
      color: #D78900;
      font-size: .7rem;
    }
    h2{
      padding: 0.2rem 0;
      text-align: center;
      font-size: 1rem;
      background-color: #fff;
      border-bottom: 2px solid darkorange;
    }
    .input-wrap {
      display: block;
      margin: 1px 0;
      padding: .8rem;
      background-color: #fff;
    }
    #user_input, #pwd_input{
      display: block;
      width: 100%;
      border: 0;
    }
    .button-wrap{
      display: block;
      margin-top: 20px;
      padding: 0 10px;
      text-align: center;
    }
    .login-btn{
      width: 100%;
      height: 40px;
      background: #06c1ae;
      border-radius: 5px;
      font-size: 0.8rem;
    }
  }
</style>
