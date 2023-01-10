<template lang="pug">
v-card.card-product
  v-img(:src="image" cover height="200px")
  v-card-title {{ name }}
  v-card-subtitle ${{ price }}
  v-card-text {{ description }}
  v-card-actions
    v-btn(color="primary" prepend-icon="mdi-cart") 加入購物車
</template>

<script setup>
defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: ''
  },
  /* eslint-enable */
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
})
</script>
