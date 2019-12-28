<template>
  <nuxt />
</template>
<script>
if (process.client) {
  require("prismjs/themes/prism-tomorrow.css")
  import("prismjs").then(Prism => {
    Prism.highlightAll()
  })
}
</script>
<style lang="scss"></style>
