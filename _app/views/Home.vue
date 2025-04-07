<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const readmeContent = ref('')

const getBaseUrl = () => {
  return import.meta.env.PROD ? '/OER_site_generate/' : '/'
}

onMounted(async () => {
  // Load README.md
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}content/README.md`, { cache: 'no-store' })
    if (response.ok) {
      readmeContent.value = await response.text()
    }
  } catch (error) {
    console.error('Error loading README:', error)
  }
})
</script>

<template>
  <div class="mt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="prose prose-lg max-w-none">
      <div v-html="marked.parse(readmeContent)"></div>
    </div>
  </div>
</template>

<style>
.prose h1 {
  @apply text-3xl font-bold mb-6 text-gray-900;
}
.prose h2 {
  @apply text-2xl font-semibold mb-4 mt-8 text-gray-800;
}
.prose p {
  @apply text-gray-700 mb-4 leading-relaxed;
}
.prose ul {
  @apply mb-4 list-disc list-inside;
}
.prose li {
  @apply text-gray-700 mb-2;
}
</style> 