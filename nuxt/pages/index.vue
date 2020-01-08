<template>
  <section>
    Vue SSR Guide and Practice
    <nuxt-link to="/1">
      Start
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: "Index",
  asyncData() {
    if (process.server) {
      console.log(require("../api/modules/resolve"))
    }
  }
}
</script>

<style></style>
