<template>
  <nuxt />
</template>
<script>
if (process.client) {
  require("prismjs/themes/prism-tomorrow.css")
  const Prism = require("prismjs")
  Prism.highlightAll()
  // import("prismjs").then(Prism => {
  //   Prism.highlightAll()
  // })
}
</script>
<style lang="scss"></style>
