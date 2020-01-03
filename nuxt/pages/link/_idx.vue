<template>
  <div class="link-container">
    <div class="link-wrapper">
      <a :href="`/link/${idx + 1}`">a标签，不使用vue-router进行页面跳转</a>
    </div>
    <div class="link-wrapper">
      <nuxt-link :to="`/link/${idx + 1}`">
        router-link 使用vue-router push进行页面跳转
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Link",
  asyncData(ctx) {
    const { idx = 0 } = ctx.params
    if (process.server) {
      console.log(
        "asyncData is called in server side vue-router!!! t=" + Date.now()
      )
    }
    if (process.client) {
      console.log(
        "asyncData is called in client side vue-router!!! t=" + Date.now()
      )
    }
    return { idx: +idx }
  }
}
</script>

<style lang="scss" scoped>
.link-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2d2d2d;
  .link-wrapper {
    margin: 50px;
    font-size: 2vw;
    > a {
      color: #7ec699;
    }
  }
}
</style>
