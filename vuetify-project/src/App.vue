<template lang="pug">
v-app
  router-view
</template>

<script setup>
import { useUserStore } from '@/stores/user'
useUserStore().getUser()
</script>
