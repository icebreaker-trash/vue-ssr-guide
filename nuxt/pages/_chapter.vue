<template>
  <section>
    <div>{{ sourceIndex }}</div>
    <div>{{ source }}</div>
  </section>
</template>

<script>
import serviceDataSource from "@/dataSource/doc"
const defalutSource = {
  sourceIndex: 0,
  source: serviceDataSource[0]
}
export default {
  name: "Chapter",
  asyncData(context) {
    const { chapter } = context.route.params
    const num = parseInt(chapter)
    if (!num || isNaN(num) || num > serviceDataSource.length) {
      context.error({ statusCode: 404, message: "Page not Found" })
      return defalutSource
    }
    return { sourceIndex: num - 1, source: serviceDataSource[num - 1] }
  }
}
</script>

<style lang="scss" scoped></style>
