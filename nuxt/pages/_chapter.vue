<template>
  <section class="doc-container">
    <div v-html="source" />
    <pager :current-page="sourceIndex + 1" :total="sourceLength" />
  </section>
</template>

<script>
import "prismjs/themes/prism-tomorrow.css"
import Prism from "prismjs"
import Pager from "@/components/Pager"
import serviceDataSource from "@/dataSource/doc"
const defalutSource = {
  sourceIndex: 0,
  source: serviceDataSource[0]
}
export default {
  name: "Chapter",
  components: {
    Pager
  },
  asyncData(context) {
    const { chapter } = context.route.params
    const num = parseInt(chapter)
    if (!num || isNaN(num) || num > serviceDataSource.length) {
      context.error({ statusCode: 404, message: "Page not Found" })
      return defalutSource
    }
    return {
      sourceIndex: num - 1,
      sourceLength: serviceDataSource.length,
      source: serviceDataSource[num - 1]
    }
  },
  mounted() {
    Prism.highlightAll()
  }
}
</script>
<style lang="scss" scoped>
.doc-container {
  padding-bottom: 50px;
}
</style>
