<template>
  <div class="controls">
    <nuxt-link v-if="currentPage > 1" :to="`/${currentPage - 1}`">
      <button class="btn prev" :disabled="currentPage < 2">
        上一页
      </button>
    </nuxt-link>
    <button v-else class="btn prev" :disabled="currentPage < 2">
      上一页
    </button>
    <nuxt-link v-if="currentPage < total" :to="`/${currentPage + 1}`">
      <button class="btn next" :disabled="currentPage >= total">
        下一页
      </button>
    </nuxt-link>
    <button v-else class="btn next" :disabled="currentPage >= total">
      下一页
    </button>
  </div>
</template>
<script>
export default {
  name: "Pager",
  props: {
    total: {
      type: Number,
      default: null
    },
    currentPage: {
      type: Number,
      default: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.controls {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: gray;
  opacity: 0.8;
  .btn {
    height: 48px;
    &.prev {
      width: 38%;
    }
    &.next {
      width: 61%;
    }
  }
}
</style>
