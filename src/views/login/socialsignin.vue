<template>
  <div class="social-signup-container">
    <div
      class="sign-btn"
      @click="handleClick('wechat')"
    >
      <span class="wx-svg-container">
        <svg-icon
          icon-class="wechat"
          class="icon"
      /></span> 微信
    </div>
    <div
      class="sign-btn"
      @click="handleClick('QQ')"
    >
      <span class="qq-svg-container">
        <svg-icon
          icon-class="qq"
          class="icon"
      /></span> QQ
    </div>

    <div
      class="sign-btn"
      @click="handleClick('Github')"
    >
      <span class="github-svg-container">
        <svg-icon
          icon-class="github"
          class="icon"
      /></span> Github
    </div>
    <div
      class="sign-btn"
      @click="handleClick('IdentityServer4')"
    >
      <span class="github-svg-container">
        <svg-icon
          icon-class="github"
          class="icon"
      /></span> 授权中心
    </div>
  </div>
</template>

<script>
import openWindow from 'src/utils/openWindow'
// import store from 'src/store'

export default {
  name: 'SocialSignin',
  methods: {
    handleClick(thirdpart) {
      const redirect_uri = encodeURIComponent('/auth-redirect')
      const url =
        'api/Account/Challenge?provider=' +
        thirdpart +
        '&returnUrl=' +
        redirect_uri
      openWindow(url, thirdpart, 540, 540)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .github-svg-container,
  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .github-svg-container {
    background-color: #000;
    margin-left: 50px;
  }
  .wx-svg-container {
    background-color: #8ada53;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
