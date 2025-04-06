<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="text-gray-600 whitespace-pre-wrap font-mono text-sm">
    {{ content }}
  </div>
</template> 