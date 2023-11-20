<template>
  <scroll-view scroll-y="true" class="list-box">
    
  </scroll-view>
</template>

<script setup>
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits } from "vue";

let emits = defineEmits(['like', 'contentInfo', 'userInfo']);
let prpos = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})


</script>