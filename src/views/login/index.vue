<template>
  <div class="login">
      <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏 -->

    <!-- 表单 -->
    <van-cell-group>
      <van-field
       v-model="user.mobile"
       label="手机号"
       placeholder="请输入手机号"
      />

      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        @finish="isCountDownShow = false"
      >
      <van-count-down
        v-if="isCountDownShow"
        :time="1000 * 60"
        slot="button"
        format="ss s"
      />
      <van-button
        v-else
        slot="button"
        size="small"
        type="primary"
        @click="onSendSmsCode"
      >发送验证码</van-button>

     </van-field>
    </van-cell-group>
    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click='onLogin'>登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>
// import request from '@/utils/request'
import { login, getSmsCode } from '@/api/user'
// import { log } from 'util'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      isCountDownShow: false // 倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {

    async onLogin () {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    // 获取短信验证码
    async onSendSmsCode () {
      // 1. 获取手机号
      const { mobile } = this.user
      // 2. 校验手机号是否有效
      // 3. 发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        } else if (err.response.status === 404) {
          this.$toast('手机号不正确')
          return
        }
        this.$toast('发送失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
.login-btn-box {
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background: #6db4fb;
  }
}
</style>
